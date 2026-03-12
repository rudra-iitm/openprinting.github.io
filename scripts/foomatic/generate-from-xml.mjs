import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { XMLParser } from "fast-xml-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FOOMATIC_DB_REPO = "https://github.com/OpenPrinting/foomatic-db.git";
// Place the cloned repo alongside the project root (not inside the Next.js project)
const FOOMATIC_DB_PATH = path.join(__dirname, "..", "..", "..", "foomatic-db");

const OUTPUT_DIR = path.join(__dirname, "..", "..", "public", "foomatic-db");
const PRINTER_OUTPUT_DIR = path.join(OUTPUT_DIR, "printer");
const DRIVER_OUTPUT_DIR = path.join(OUTPUT_DIR, "driver");

const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: "@_",
	allowBooleanAttributes: true,
	parseTagValue: true,
	parseAttributeValue: true,
	trimValues: true,
	cdataPropName: "__cdata",
});

async function cloneOrUpdateRepo() {
	if (existsSync(FOOMATIC_DB_PATH)) {
		console.log("Foomatic-db repo found, pulling latest changes...");
		try {
			execSync("git pull", { cwd: FOOMATIC_DB_PATH, stdio: "inherit" });
		} catch (err) {
			console.warn(
				"git pull failed, continuing with existing data:",
				err.message,
			);
		}
	} else {
		console.log(
			"Cloning foomatic-db repository (this may take a few minutes)...",
		);
		execSync(`git clone --depth=1 ${FOOMATIC_DB_REPO} "${FOOMATIC_DB_PATH}"`, {
			stdio: "inherit",
		});
		console.log("Repository cloned successfully");
	}
}

function extractTextContent(value) {
	if (value === undefined || value === null) return "";
	if (typeof value === "string") return value.trim();
	if (typeof value === "number" || typeof value === "boolean")
		return String(value);
	if (value.__cdata) return String(value.__cdata).trim();
	if (value["#text"]) return String(value["#text"]).trim();
	return "";
}

function getMechanismType(mechanism) {
	if (!mechanism) return "unknown";
	if (mechanism.laser !== undefined) return "laser";
	if (mechanism.inkjet !== undefined) return "inkjet";
	if (mechanism.dotmatrix !== undefined) return "dotmatrix";
	if (mechanism.led !== undefined) return "led";
	return "unknown";
}

function parsePrinterXml(xml, printerFile) {
	try {
		const parsed = parser.parse(xml);
		const printer = parsed?.printer;

		if (!printer) return null;

		const id = path.basename(printerFile, ".xml");
		const make = extractTextContent(printer.make);
		const model = extractTextContent(printer.model);

		if (!make || !model) return null;

		// Drivers are direct <driver> children (not wrapped in <drivers>)
		const drivers = [];
		if (printer.driver) {
			const driverList = Array.isArray(printer.driver)
				? printer.driver
				: [printer.driver];
			for (const d of driverList) {
				const driverId = typeof d === "string" ? d : extractTextContent(d);
				if (driverId) drivers.push({ id: driverId });
			}
		}

		const comments = printer.comments;
		const notesText = comments
			? extractTextContent(comments.en || comments)
			: "";

		return {
			id,
			manufacturer: make,
			model,
			type: getMechanismType(printer.mechanism),
			functionality: extractTextContent(printer.functionality) || "?",
			notes: notesText,
			drivers,
		};
	} catch (err) {
		console.warn(`Failed to parse printer XML ${printerFile}:`, err.message);
		return null;
	}
}

function parseDriverXml(xml, driverFile) {
	try {
		const parsed = parser.parse(xml);
		const driver = parsed?.driver;

		if (!driver) return null;

		const id = path.basename(driverFile, ".xml");
		const name = extractTextContent(driver.name);

		if (!name) return null;

		const comments = driver.comments;
		const commentsText = comments
			? extractTextContent(comments.en || comments)
			: "";

		return {
			id,
			name,
			functionality: extractTextContent(driver.functionality) || "?",
			comments: commentsText,
			ppd: extractTextContent(driver.ppd) || null,
			supportLevel: extractTextContent(driver.supportlevel) || null,
			color: driver.color !== undefined ? true : null,
		};
	} catch (err) {
		console.warn(`Failed to parse driver XML ${driverFile}:`, err.message);
		return null;
	}
}

async function processXmlDirectory(sourceDir, outputDir, parseFunc, label) {
	await fs.mkdir(outputDir, { recursive: true });

	let files;
	try {
		files = await fs.readdir(sourceDir);
	} catch {
		console.warn(`Source directory not found: ${sourceDir}`);
		return 0;
	}

	const xmlFiles = files.filter((f) => f.endsWith(".xml"));
	console.log(`Processing ${xmlFiles.length} ${label} XML files...`);

	let successCount = 0;
	const batchSize = 200;

	for (let i = 0; i < xmlFiles.length; i += batchSize) {
		const batch = xmlFiles.slice(i, i + batchSize);

		await Promise.all(
			batch.map(async (file) => {
				try {
					const xml = await fs.readFile(path.join(sourceDir, file), "utf-8");
					const data = parseFunc(xml, file);
					if (data) {
						await fs.writeFile(
							path.join(outputDir, `${path.basename(file, ".xml")}.json`),
							JSON.stringify(data, null, 2),
						);
						successCount++;
					}
				} catch (err) {
					console.warn(`Error processing ${file}:`, err.message);
				}
			}),
		);

		if (i + batchSize < xmlFiles.length) {
			process.stdout.write(
				`  ${Math.min(i + batchSize, xmlFiles.length)}/${xmlFiles.length}\r`,
			);
		}
	}

	console.log(
		`  Converted ${successCount}/${xmlFiles.length} ${label} files successfully`,
	);
	return successCount;
}

async function generateFromXml() {
	console.log("=== Foomatic Database XML Generator ===\n");

	await cloneOrUpdateRepo();

	await fs.mkdir(OUTPUT_DIR, { recursive: true });

	const printerSourceDir = path.join(
		FOOMATIC_DB_PATH,
		"db",
		"source",
		"printer",
	);
	const driverSourceDir = path.join(FOOMATIC_DB_PATH, "db", "source", "driver");

	const printerCount = await processXmlDirectory(
		printerSourceDir,
		PRINTER_OUTPUT_DIR,
		parsePrinterXml,
		"printer",
	);

	const driverCount = await processXmlDirectory(
		driverSourceDir,
		DRIVER_OUTPUT_DIR,
		parseDriverXml,
		"driver",
	);

	console.log("\n=== Generation Complete ===");
	console.log(`Printers: ${printerCount} JSON files → ${PRINTER_OUTPUT_DIR}`);
	console.log(`Drivers:  ${driverCount} JSON files → ${DRIVER_OUTPUT_DIR}`);
}

generateFromXml();
