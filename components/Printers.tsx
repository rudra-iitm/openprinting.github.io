import type { PrinterSummary } from "@/lib/foomatic/types";
import PrinterCard from "./PrinterCard";

interface PrintersProps {
  printers: PrinterSummary[];
}

export default function Printers({ printers }: PrintersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {printers.map((printer) => (
        <PrinterCard key={printer.id} printer={printer} />
      ))}
    </div>
  );
}
