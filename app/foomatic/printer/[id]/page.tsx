import fs from "fs/promises"
import path from "path"
import type { PrinterSummary } from "@/lib/foomatic/types"
import PrinterPageClient from "@/components/foomatic/PrinterPageClient"

async function getPrinterSummaries(): Promise<PrinterSummary[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "foomatic-db", "printersMap.json")
    const data = await fs.readFile(filePath, "utf-8")
    const json = JSON.parse(data)
    return json.printers
  } catch {
    // Return empty array when data file hasn't been generated yet
    return []
  }
}

export async function generateStaticParams() {
  const printers = await getPrinterSummaries()
  if (printers.length === 0) {
    // Return a no-op placeholder so output:export doesn't fail when data
    // hasn't been generated yet (run `npm run build:foomatic-data` first).
    return [{ id: "__no_data__" }]
  }
  return printers.map((printer) => ({
    id: printer.id,
  }))
}

interface PrinterPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PrinterPage({ params }: PrinterPageProps) {
  const { id } = await params

  return <PrinterPageClient printerId={id} />
}
