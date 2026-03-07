import fs from "fs/promises";
import path from "path";
import type { PrinterSummary } from "@/lib/foomatic/types";
import PrinterPageClient from "@/components/foomatic/PrinterPageClient";
import Footer from "@/components/footer";

export const dynamicParams = false;

async function getPrinterSummaries(): Promise<PrinterSummary[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "foomatic-db",
    "printersMap.json",
  );
  const data = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(data);
  return json.printers;
}

export async function generateStaticParams() {
  const printers = await getPrinterSummaries();
  return printers.map((printer) => ({
    id: printer.id,
  }));
}

interface PrinterPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PrinterPage({ params }: PrinterPageProps) {
  const { id } = await params;

  return (
    <>
      <PrinterPageClient printerId={id} />
      <Footer />
    </>
  );
}
