import fs from "fs";
import path from "path";

const INPUT_FILE = "public/foomatic-db/printers.json";
const OUTPUT_DIR = "public/foomatic-db/printers";
const MAP_FILE = "public/foomatic-db/printersMap.json";

async function splitPrinters() {
  console.log("Reading combined printers data...");
  const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));
  const printers = data.printers;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Splitting ${printers.length} printers into individual files...`);

  const printersArray = [];
  const manufacturers = new Set();
  const types = new Set();
  const statuses = new Set();
  const connectivityTypes = new Set();

  for (const printer of printers) {
    const fileName = `${printer.id}.json`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, JSON.stringify(printer, null, 2));

    printersArray.push({
      id: printer.id,
      manufacturer: printer.manufacturer,
      model: printer.model,
      type: printer.type || "unknown",
      status: printer.status || "Unknown",
      functionality: printer.functionality || "?",
      connectivity: printer.connectivity,
      driverCount: printer.drivers ? printer.drivers.length : 0,
    });

    if (printer.manufacturer) manufacturers.add(printer.manufacturer);
    if (printer.type) types.add(printer.type);
    if (printer.status) statuses.add(printer.status);
    if (printer.connectivity) {
      printer.connectivity.forEach((c) => connectivityTypes.add(c));
    }
  }

  const mapData = {
    totalPrinters: printers.length,
    manufacturers: Array.from(manufacturers).sort(),
    types: Array.from(types).sort(),
    statuses: Array.from(statuses).sort(),
    connectivityTypes: Array.from(connectivityTypes).sort(),
    printers: printersArray,
  };

  fs.writeFileSync(MAP_FILE, JSON.stringify(mapData, null, 2));
  console.log(`Printers map written to ${MAP_FILE}`);
  console.log(`  Total printers: ${printers.length}`);
  console.log(`  Manufacturers: ${manufacturers.size}`);
  console.log(`  Types: ${types.size}`);
  console.log(`  Statuses: ${statuses.size}`);

  // Cleanup: remove the large combined file
  fs.unlinkSync(INPUT_FILE);
  console.log(`Removed combined file ${INPUT_FILE}`);
}

splitPrinters().catch((error) => {
  console.error("Error splitting printers:", error);
  process.exit(1);
});
