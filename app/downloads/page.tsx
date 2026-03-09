"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  Printer,
  FileText,
  Filter,
  FolderOpen,
  Code,
  ExternalLink,
  ArrowRight,
  Database,
} from "lucide-react";

interface DownloadItem {
  title: string;
  description: string;
  details: string[];
  icon: ComponentType<{ className?: string }>;
  href: string;
  featured?: boolean;
  external?: boolean;
}

const downloadItems: DownloadItem[] = [
  {
    title: "PPD Files",
    description:
      "PostScript Printer Description files organized by manufacturer for use with CUPS.",
    details: [
      "Brother, Canon, Dell, Epson, HP",
      "Kyocera, Lexmark, Oki, Ricoh",
      "Samsung, Sharp, Toshiba, Xerox & more",
    ],
    icon: FileText,
    href: "https://www.openprinting.org/download/PPD/",
    external: true,
  },
  {
    title: "CUPS Filters",
    description:
      "Source tarballs for cups-filters, the OpenPrinting filter and backend package for CUPS.",
    details: [
      "Latest: cups-filters-1.28.x",
      "Legacy versions from 1.0 onwards",
      "Available as .tar.gz, .tar.bz2, .tar.xz",
    ],
    icon: Filter,
    href: "https://www.openprinting.org/download/cups-filters/",
    external: true,
  },
  {
    title: "Foomatic",
    description:
      "Browse the Foomatic printer database - search across 6,600+ printers with driver compatibility info.",
    details: [
      "Search & filter printers",
      "Driver compatibility details",
      "Print quality & feature ratings",
    ],
    icon: Printer,
    href: "/foomatic",
    featured: true,
  },
  {
    title: "All Downloads",
    description:
      "Full download directory with all OpenPrinting resources and archives.",
    details: [
      "PPD files, CUPS filters, Foomatic DB",
      "IJS drivers, test files, legacy tools",
      "Meeting notes & documentation",
    ],
    icon: FolderOpen,
    href: "https://www.openprinting.org/download/",
    external: true,
  },
  {
    title: "IJS Drivers",
    description:
      "Printer drivers compatible with the IJS (Inkjet Server) raster protocol.",
    details: [
      "HPIJS v1.0+",
      "Gutenprint (Gimp-Print 4.2.1+)",
      "Epson EPL5x00L v0.2.2+",
    ],
    icon: Code,
    href: "https://www.openprinting.org/download/ijs/",
    external: true,
  },
];

function DownloadLink({
  item,
  children,
}: {
  item: DownloadItem;
  children: ReactNode;
}) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link href={item.href}>{children}</Link>;
}

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent" />
        <div className="hero-glow" />
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[540px] w-[720px] rounded-full bg-blue-500/[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
              <Database className="h-4 w-4 text-blue-400" />
              Resources & Tools
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gradient md:text-6xl">
              Downloads
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-400 sm:text-xl">
              Printer drivers, filters, PPD files, and tools from the
              OpenPrinting project.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {downloadItems
          .filter((item) => item.featured)
          .map((item) => {
            const Icon = item.icon;
            return (
              <DownloadLink key={item.title} item={item}>
                <div className="group relative mb-8 block overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 via-neutral-900/80 to-neutral-900/80 p-8 transition-all duration-300 hover:border-blue-300/60 sm:p-10">
                  <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/10 blur-[80px]" />
                  <div className="relative flex flex-col items-start gap-6 sm:flex-row">
                    <div className="shrink-0 rounded-2xl border border-blue-300/30 bg-blue-500/15 p-4 transition-colors group-hover:border-blue-300/50">
                      <Icon className="h-10 w-10 text-blue-300" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <h2 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-blue-300 sm:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mb-4 max-w-2xl text-base text-neutral-400 sm:text-lg">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {item.details.map((detail) => (
                          <span
                            key={detail}
                            className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden shrink-0 self-center sm:block">
                      <div className="rounded-xl border border-blue-300/30 bg-blue-500/10 p-3 transition-all group-hover:border-blue-300/50 group-hover:bg-blue-500/20">
                        <ArrowRight className="h-6 w-6 text-blue-300 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </DownloadLink>
            );
          })}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {downloadItems
            .filter((item) => !item.featured)
            .map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.04] p-3">
                      <Icon className="h-6 w-6 text-neutral-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2.5">
                        <h3 className="text-lg font-semibold text-neutral-300">
                          {item.title}
                        </h3>
                        {item.external ? (
                          <ExternalLink className="h-3.5 w-3.5 text-neutral-600" />
                        ) : null}
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5 space-y-1.5">
                    {item.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-2 text-sm text-neutral-500"
                      >
                        <div className="h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                        {detail}
                      </div>
                    ))}
                  </div>
                  <DownloadLink item={item}>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-blue-300/30 bg-blue-500/10 px-3.5 py-1.5 text-sm font-medium text-blue-300 transition-colors hover:border-blue-300/50 hover:bg-blue-500/20">
                      Browse
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </DownloadLink>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}
