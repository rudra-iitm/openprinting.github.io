import { Printer } from "lucide-react"

interface PrinterIconProps {
  className?: string
}

export default function PrinterIcon({ className }: PrinterIconProps) {
  return <Printer className={className} />
}
