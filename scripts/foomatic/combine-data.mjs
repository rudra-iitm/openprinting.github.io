import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJsonFiles(dir) {
	const files = await fs.readdir(dir);
	const jsonFiles = files.filter((f) => f.endsWith(".json"));

	const results = [];
	for (const file of jsonFiles) {
		const content = JSON.parse(
			await fs.readFile(path.join(dir, file), "utf-8"),
		);
		results.push({ id: path.basename(file, ".json"), ...content });
	}
	return results;
}

function parseDriverType(driver) {
	const name = (driver.name || "").toLowerCase();
	const comments = (driver.comments || "").toLowerCase();

	if (name.includes("ipp") || comments.includes("ipp")) return "ipp";
	if (name.includes("cups")) return "cups";
	if (name.includes("ghostscript") || name.includes("gs")) return "ghostscript";
	if (name.includes("gutenprint")) return "gutenprint";
	if (name.includes("hpijs") || name.includes("hplip")) return "hplip";
	return "other";
}

function mergeDriversIntoPrinter(printer, driversMap) {
	const printerDrivers = [];

	if (printer.drivers) {
		for (const driverRef of printer.drivers) {
			const driverId = driverRef.id || driverRef;
			const driverData = driversMap.get(driverId);
			if (driverData) {
				printerDrivers.push({
					id: driverId,
					name: driverData.name || driverId,
					type: parseDriverType(driverData),
					functionality: driverData.functionality || "?",
					comments: driverData.comments || "",
					ppd: driverData.ppd || null,
					supportLevel: driverData.supportLevel || null,
					color: driverData.color !== undefined ? driverData.color : null,
				});
			}
		}
	}

	return {
		...printer,
		drivers: printerDrivers,
	};
}

async function combineData() {
	try {
		console.log("Starting data combination process...");

		const printerSourceDir = path.join(
			__dirname,
			"..",
			"..",
			"public",
			"foomatic-db",
			"printer",
		);
		const driverSourceDir = path.join(
			__dirname,
			"..",
			"..",
			"public",
			"foomatic-db",
			"driver",
		);
		const outputDir = path.join(__dirname, "..", "..", "public", "foomatic-db");

		console.log("Reading printer data...");
		const printers = await readJsonFiles(printerSourceDir);
		console.log(`Found ${printers.length} printers`);

		console.log("Reading driver data...");
		const drivers = await readJsonFiles(driverSourceDir);
		console.log(`Found ${drivers.length} drivers`);

		const driversMap = new Map(drivers.map((d) => [d.id, d]));

		console.log("Combining printers with driver details...");
		const combinedPrinters = printers.map((printer) =>
			mergeDriversIntoPrinter(printer, driversMap),
		);

		const output = {
			generatedAt: new Date().toISOString(),
			totalPrinters: combinedPrinters.length,
			totalDrivers: drivers.length,
			printers: combinedPrinters,
		};

		const outputPath = path.join(outputDir, "printers.json");
		await fs.writeFile(outputPath, JSON.stringify(output, null, 2));

		const stats = {
			withDrivers: combinedPrinters.filter((p) => p.drivers.length > 0).length,
			withoutDrivers: combinedPrinters.filter((p) => p.drivers.length === 0)
				.length,
		};

		console.log("Combination complete:");
		console.log(`  Total printers: ${combinedPrinters.length}`);
		console.log(`  Printers with drivers: ${stats.withDrivers}`);
		console.log(`  Printers without drivers: ${stats.withoutDrivers}`);
		console.log(`  Output file: ${outputPath}`);
	} catch (error) {
		console.error("Error combining data:", error);
		process.exit(1);
	}
}

combineData();
