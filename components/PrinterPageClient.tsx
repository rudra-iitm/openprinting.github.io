"use client";

import { useEffect, useState } from "react";
import type { Printer } from "@/lib/foomatic/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  PrinterIcon,
  ExternalLink,
  Code,
  Info,
  Loader2,
} from "lucide-react";
import { calculateAccurateStatus } from "@/lib/foomatic/utils";

const basePath =
  process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

interface PrinterPageClientProps {
  printerId: string;
}

export default function PrinterPageClient({
  printerId,
}: PrinterPageClientProps) {
  const [printer, setPrinter] = useState<Printer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        return "bg-muted text-muted-foreground border-border";
    }
  };

  useEffect(() => {
    async function fetchPrinter() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${basePath}/foomatic-db/printers/${printerId}.json`,
        );

        if (!res.ok) {
          throw new Error(`Failed to load printer: ${res.status}`);
        }

        const data = await res.json();
        setPrinter(data);
      } catch (err) {
        console.error("Failed to load printer:", err);
        setError(err instanceof Error ? err.message : "Failed to load printer");
      } finally {
        setLoading(false);
      }
    }

    fetchPrinter();
  }, [printerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 pt-24">
          <div className="flex items-center mb-8">
            <Link href="/foomatic">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground hover:bg-accent h-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
              <PrinterIcon className="h-3.5 w-3.5" />
              <span>OpenPrinting Database</span>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-8">
            <Skeleton className="h-14 w-14 rounded-xl bg-muted" />
            <div className="flex-1">
              <Skeleton className="h-9 w-64 mb-2 bg-muted" />
              <Skeleton className="h-5 w-32 mb-3 bg-muted" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 bg-muted" />
                <Skeleton className="h-5 w-16 bg-muted" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <Skeleton className="h-6 w-48 mb-4 bg-muted" />
              <Skeleton className="h-4 w-24 mb-6 bg-muted" />
              <Skeleton className="h-4 w-12 mb-1 bg-muted" />
              <Skeleton className="h-5 w-20 bg-muted" />
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                <Skeleton className="h-7 w-48 bg-muted" />
              </div>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 mb-5"
                >
                  <Skeleton className="h-6 w-32 mb-4 bg-muted" />
                  <Skeleton className="h-16 w-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !printer) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 text-center pt-24">
          <div className="py-20">
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <PrinterIcon className="h-12 w-12 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Printer not found
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {error ||
                "This printer may have been removed or doesn't exist in the OpenPrinting database."}
            </p>
            <Link href="/foomatic">
              <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full h-10 px-6 text-sm font-medium">
                <ArrowLeft className="h-4 w-4" />
                Back to all printers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link href="/foomatic">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground hover:bg-accent h-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
            <PrinterIcon className="h-3.5 w-3.5" />
            <span>OpenPrinting Database</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start gap-5 mb-10">
          <div className="p-4 rounded-xl bg-muted border border-border">
            <PrinterIcon className="h-8 w-8 text-blue-400" />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1 tracking-tight">
              {printer.model}
            </h1>
            <p className="text-lg text-muted-foreground mb-3">
              {printer.manufacturer}
            </p>

            <div className="flex items-center gap-2">
              {(() => {
                const accurateStatus = calculateAccurateStatus(printer);
                return (
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusStyling(accurateStatus)}`}
                  >
                    {accurateStatus}
                  </Badge>
                );
              })()}
              <Badge
                variant="outline"
                className="text-xs border-border bg-muted text-muted-foreground"
              >
                {printer.type}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Info Card */}
          <div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Info className="h-4 w-4 text-blue-400" />
                <h2 className="text-base font-semibold text-foreground tracking-tight">
                  Printer Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    Manufacturer
                  </p>
                  <p className="text-sm text-foreground">
                    {printer.manufacturer}
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    Type
                  </p>
                  <p className="text-sm text-foreground">{printer.type}</p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    Status
                  </p>
                  {(() => {
                    const accurateStatus = calculateAccurateStatus(printer);
                    return (
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusStyling(accurateStatus)}`}
                      >
                        {accurateStatus}
                      </Badge>
                    );
                  })()}
                </div>

                {printer.notes && (
                  <>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                        Notes
                      </p>
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground [&_a]:text-blue-400 [&_a:hover]:text-blue-300"
                        dangerouslySetInnerHTML={{ __html: printer.notes }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right - Drivers */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Code className="h-4 w-4 text-blue-400" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                Available Drivers
              </h2>
              <span className="text-xs text-muted-foreground ml-1">
                ({(printer.drivers ?? []).length})
              </span>
            </div>

            <div className="space-y-5">
              {(printer.drivers ?? [])
                .sort((a, b) => {
                  if (a.id === printer.recommended_driver) return -1;
                  if (b.id === printer.recommended_driver) return 1;
                  return 0;
                })
                .map((driver) => (
                  <div
                    key={driver.id}
                    className={`rounded-xl border p-6 transition-colors ${
                      driver.id === printer.recommended_driver
                        ? "border-green-500/20 bg-green-500/[0.03]"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-foreground tracking-tight">
                          {driver.name}
                        </h3>
                        {driver.url && (
                          <Link
                            href={driver.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {driver.url}
                          </Link>
                        )}
                      </div>
                      {driver.id === printer.recommended_driver && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-500/15 text-green-400 border-green-500/25 shrink-0 ml-3"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Comments
                        </p>
                        <div
                          className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed [&_a]:text-blue-400 [&_a:hover]:text-blue-300"
                          dangerouslySetInnerHTML={{
                            __html: driver.comments || "No comments available.",
                          }}
                        />
                      </div>

                      {driver.execution && (
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground list-none flex items-center gap-2 transition-colors">
                            <Code className="h-3.5 w-3.5 text-blue-400" />
                            PPD Generation Command
                            <span className="text-xs text-muted-foreground group-open:hidden">
                              (click to expand)
                            </span>
                          </summary>

                          <div className="mt-3 rounded-lg overflow-hidden border border-border">
                            <SyntaxHighlighter
                              language="bash"
                              style={vscDarkPlus}
                              customStyle={{
                                background: "rgba(255,255,255,0.02)",
                                border: "none",
                                padding: "1rem",
                                margin: 0,
                              }}
                            >
                              {driver.execution.prototype}
                            </SyntaxHighlighter>
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
