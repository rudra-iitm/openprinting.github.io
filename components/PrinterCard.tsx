import type { PrinterSummary } from "@/lib/foomatic/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PrinterIcon } from "lucide-react";
import { calculateAccurateStatus } from "@/lib/foomatic/utils";

interface PrinterCardProps {
  printer: PrinterSummary;
}

export default function PrinterCard({ printer }: PrinterCardProps) {
  const printerId = printer.id.replace("printer/", "");
  const accurateStatus = calculateAccurateStatus(printer);

  const getStatusStyling = (status: string) => {
    switch (status.toLowerCase()) {
      case "perfect":
        return "bg-green-500/15 text-green-400 border-green-500/25";
      case "partial":
      case "mostly":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/25";
      case "unsupported":
        return "bg-red-500/15 text-red-400 border-red-500/25";
      case "unknown":
      default:
        return "bg-white/[0.04] text-neutral-400 border-white/[0.08]";
    }
  };

  return (
    <Link href={`/foomatic/printer/${printerId}`} className="h-full">
      <div className="group h-full flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] card-glow">
        <div className="p-5 pb-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-blue-400/30 group-hover:bg-blue-500/10 transition-colors">
              <PrinterIcon className="h-5 w-5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 tracking-tight">
                {printer.model}
              </h3>
              <p className="text-sm text-neutral-500 mt-0.5">
                {printer.manufacturer}
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 pb-3 flex-grow">
          <p className="text-sm text-neutral-400 leading-relaxed">
            {printer.driverCount
              ? `${printer.driverCount} driver${printer.driverCount > 1 ? "s" : ""} available`
              : "No drivers available"}
          </p>
        </div>
        <div className="px-5 pb-5 pt-0">
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className="text-xs border-white/[0.08] bg-white/[0.03] text-neutral-500"
            >
              {printer.type}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs ${getStatusStyling(accurateStatus)}`}
            >
              {accurateStatus}
            </Badge>
            {(printer.driverCount ?? 0) > 0 && (
              <Badge
                variant="outline"
                className="text-xs border-blue-400/20 text-blue-400 bg-blue-500/10"
              >
                {printer.driverCount} driver
                {(printer.driverCount ?? 0) > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
