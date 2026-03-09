"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import type { PrinterSummary } from "@/lib/foomatic/types";
import PrinterSearch from "@/components/PrinterSearch";
import Printers from "@/components/Printers";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PrinterIcon,
  Database,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { calculateAccurateStatus } from "@/lib/foomatic/utils";

const basePath =
  process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100, 200, -1] as const;
const STORAGE_KEYS = {
  SEARCH: "printer_search",
  MANUFACTURER: "printer_manufacturer",
  DRIVER_TYPE: "printer_driver_type",
  MECHANISM_TYPE: "printer_mechanism_type",
  SUPPORT_LEVEL: "printer_support_level",
  COLOR_CAPABILITY: "printer_color_capability",
  PAGE: "printer_page",
  ITEMS_PER_PAGE: "printer_items_per_page",
} as const;

function PaginationControls({
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  startIndex,
  endIndex,
  filteredLength,
}: {
  itemsPerPage: number;
  setItemsPerPage: (n: number) => void;
  setCurrentPage: (n: number) => void;
  startIndex: number;
  endIndex: number;
  filteredLength: number;
  totalPages: number;
}) {
  const displayStart = filteredLength === 0 ? 0 : startIndex + 1;
  const displayEnd = filteredLength === 0 ? 0 : endIndex;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
          className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50"
        >
          {ITEMS_PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === -1 ? "Show All" : option}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-neutral-500">
        Showing {displayStart}-{displayEnd} of {filteredLength} printers
      </div>
    </div>
  );
}

export default function FoomaticPage() {
  const [printers, setPrinters] = useState<PrinterSummary[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedDriverType, setSelectedDriverType] = useState("all");
  const [selectedMechanismType, setSelectedMechanismType] = useState("all");
  const [selectedSupportLevel, setSelectedSupportLevel] = useState("all");
  const [selectedColorCapability, setSelectedColorCapability] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearch = localStorage.getItem(STORAGE_KEYS.SEARCH);
      const savedManufacturer = localStorage.getItem(STORAGE_KEYS.MANUFACTURER);
      const savedDriverType = localStorage.getItem(STORAGE_KEYS.DRIVER_TYPE);
      const savedMechanismType = localStorage.getItem(
        STORAGE_KEYS.MECHANISM_TYPE,
      );
      const savedSupportLevel = localStorage.getItem(
        STORAGE_KEYS.SUPPORT_LEVEL,
      );
      const savedColorCapability = localStorage.getItem(
        STORAGE_KEYS.COLOR_CAPABILITY,
      );
      const savedPage = localStorage.getItem(STORAGE_KEYS.PAGE);
      const savedItemsPerPage = localStorage.getItem(
        STORAGE_KEYS.ITEMS_PER_PAGE,
      );

      if (savedSearch) setSearchQuery(String(savedSearch));
      if (savedManufacturer) setSelectedManufacturer(String(savedManufacturer));
      if (savedDriverType) setSelectedDriverType(String(savedDriverType));
      if (savedMechanismType)
        setSelectedMechanismType(String(savedMechanismType));
      if (savedSupportLevel) setSelectedSupportLevel(String(savedSupportLevel));
      if (savedColorCapability)
        setSelectedColorCapability(String(savedColorCapability));
      if (savedPage) {
        const p = parseInt(savedPage, 10);
        setCurrentPage(Number.isFinite(p) && p > 0 ? p : 1);
      }
      if (savedItemsPerPage) {
        const ip = parseInt(savedItemsPerPage, 10);
        setItemsPerPage(Number.isFinite(ip) ? ip : 20);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${basePath}/foomatic-db/printersMap.json`);

        if (!res.ok) {
          throw new Error(`Failed to load printer data: ${res.status}`);
        }

        const data = await res.json();

        const printersWithStatus: PrinterSummary[] = [];
        const manufacturerSet = new Set<string>();

        for (const p of data.printers) {
          let status = (p.status || calculateAccurateStatus(p)) as string;
          if (
            typeof status === "string" &&
            status.toLowerCase() === "partial"
          ) {
            status = "Mostly";
          }
          const printer = {
            ...p,
            status,
          };
          printersWithStatus.push(printer);
          if (p.manufacturer) {
            manufacturerSet.add(p.manufacturer);
          }
        }

        setPrinters(printersWithStatus);
        setManufacturers(Array.from(manufacturerSet).sort());
      } catch (err) {
        console.error("Failed to load printer data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load printer data",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const driverTypes = useMemo(() => {
    const types = new Set<string>();
    printers.forEach((p) => {
      if (p.driverCount && p.driverCount > 0) {
        types.add("Has Drivers");
      } else {
        types.add("No Drivers");
      }
    });
    return Array.from(types).sort();
  }, [printers]);

  const mechanismTypes = useMemo(() => {
    const types = new Set<string>();
    printers.forEach((p) => {
      if (p.type) {
        types.add(p.type);
      }
    });
    return Array.from(types).sort();
  }, [printers]);

  const supportLevels = useMemo(() => {
    return ["Perfect", "Mostly", "Unsupported", "Unknown"];
  }, []);

  const colorCapabilities = useMemo(() => {
    return ["color", "monochrome", "unknown"];
  }, []);

  const filteredPrinters = useMemo(() => {
    let result = printers;

    if (selectedManufacturer !== "all") {
      result = result.filter((p) => p.manufacturer === selectedManufacturer);
    }

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.model && String(p.model).toLowerCase().includes(queryLower)) ||
          (p.manufacturer &&
            String(p.manufacturer).toLowerCase().includes(queryLower)),
      );
    }

    if (selectedDriverType !== "all") {
      if (selectedDriverType === "Has Drivers") {
        result = result.filter((p) => (p.driverCount ?? 0) > 0);
      } else if (selectedDriverType === "No Drivers") {
        result = result.filter((p) => (p.driverCount ?? 0) === 0);
      }
    }

    if (selectedMechanismType !== "all") {
      result = result.filter((p) => p.type === selectedMechanismType);
    }

    if (selectedSupportLevel !== "all") {
      result = result.filter((p) => p.status === selectedSupportLevel);
    }

    if (selectedColorCapability !== "all") {
      result = result.filter((p) => {
        const type = p.type?.toLowerCase() || "";
        const model = typeof p.model === "string" ? p.model.toLowerCase() : "";
        if (selectedColorCapability === "color") {
          return type.includes("color") || model.includes("color");
        } else if (selectedColorCapability === "monochrome") {
          return (
            type.includes("mono") ||
            type.includes("dot-matrix") ||
            model.includes("mono")
          );
        }
        return true;
      });
    }

    return result;
  }, [
    searchQuery,
    selectedManufacturer,
    selectedDriverType,
    selectedMechanismType,
    selectedSupportLevel,
    selectedColorCapability,
    printers,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPrinters]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEYS.SEARCH, String(searchQuery).trim());
    localStorage.setItem(STORAGE_KEYS.MANUFACTURER, selectedManufacturer);
    localStorage.setItem(STORAGE_KEYS.DRIVER_TYPE, selectedDriverType);
    localStorage.setItem(STORAGE_KEYS.MECHANISM_TYPE, selectedMechanismType);
    localStorage.setItem(STORAGE_KEYS.SUPPORT_LEVEL, selectedSupportLevel);
    localStorage.setItem(
      STORAGE_KEYS.COLOR_CAPABILITY,
      selectedColorCapability,
    );
    localStorage.setItem(STORAGE_KEYS.PAGE, currentPage.toString());
    localStorage.setItem(STORAGE_KEYS.ITEMS_PER_PAGE, itemsPerPage.toString());
  }, [
    searchQuery,
    selectedManufacturer,
    selectedDriverType,
    selectedMechanismType,
    selectedSupportLevel,
    selectedColorCapability,
    currentPage,
    itemsPerPage,
  ]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedManufacturer("all");
    setSelectedDriverType("all");
    setSelectedMechanismType("all");
    setSelectedSupportLevel("all");
    setSelectedColorCapability("all");
    setCurrentPage(1);
    setItemsPerPage(20);

    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }, []);

  const totalPages = useMemo(() => {
    if (itemsPerPage === -1) return 1;
    return Math.ceil(filteredPrinters.length / itemsPerPage);
  }, [filteredPrinters.length, itemsPerPage]);

  const displayedPrinters = useMemo(() => {
    if (itemsPerPage === -1) return filteredPrinters;
    const startIndex = Math.max(0, (currentPage - 1) * itemsPerPage);
    const endIndex = startIndex + itemsPerPage;
    return filteredPrinters.slice(startIndex, endIndex);
  }, [filteredPrinters, currentPage, itemsPerPage]);

  const startIndex = useMemo(
    () =>
      itemsPerPage === -1 ? 0 : Math.max(0, (currentPage - 1) * itemsPerPage),
    [currentPage, itemsPerPage],
  );
  const endIndex = useMemo(
    () =>
      itemsPerPage === -1
        ? filteredPrinters.length
        : Math.min(startIndex + itemsPerPage, filteredPrinters.length),
    [startIndex, itemsPerPage, filteredPrinters.length],
  );

  useEffect(() => {
    if (itemsPerPage === -1) {
      setCurrentPage(1);
      return;
    }
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, itemsPerPage, currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent" />
        <div className="hero-glow" />
        <div className="hero-glow-blue" />
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-500/[0.07] via-transparent to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-neutral-400 font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              OpenPrinting Database
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
            <span className="text-gradient">Foomatic</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Search across 6,600+ printers from the comprehensive Foomatic
            database. Find drivers, specifications, and compatibility
            information for Linux printing.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <Database className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-neutral-300 font-medium">
                Open Source Drivers
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-neutral-300 font-medium">
                Linux Compatible
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-neutral-300 font-medium">
                Community Maintained
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Search & Filters */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <PrinterSearch
            manufacturers={manufacturers}
            driverTypes={driverTypes}
            mechanismTypes={mechanismTypes}
            supportLevels={supportLevels}
            colorCapabilities={colorCapabilities}
            onSearch={setSearchQuery}
            onFilterManufacturer={setSelectedManufacturer}
            onFilterDriverType={setSelectedDriverType}
            onFilterMechanismType={setSelectedMechanismType}
            onFilterSupportLevel={setSelectedSupportLevel}
            onFilterColorCapability={setSelectedColorCapability}
            selectedManufacturer={selectedManufacturer}
            selectedDriverType={selectedDriverType}
            selectedMechanismType={selectedMechanismType}
            selectedSupportLevel={selectedSupportLevel}
            selectedColorCapability={selectedColorCapability}
            onReset={resetFilters}
          />
        </div>

        {/* Content */}
        {error ? (
          <div className="text-center py-24">
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <PrinterIcon className="h-16 w-16 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Failed to load printer data
            </h2>
            <p className="text-neutral-400 text-lg max-w-md mx-auto leading-relaxed">
              {error}
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="h-12 w-12 rounded-xl bg-white/[0.06]" />
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-5 w-3/4 bg-white/[0.06]" />
                    <Skeleton className="h-4 w-1/2 bg-white/[0.06]" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-md bg-white/[0.06]" />
                    <Skeleton className="h-6 w-24 rounded-md bg-white/[0.06]" />
                  </div>
                  <Skeleton className="h-4 w-full bg-white/[0.06]" />
                  <Skeleton className="h-4 w-2/3 bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedPrinters.length > 0 ? (
          <div>
            <PaginationControls
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
              startIndex={startIndex}
              endIndex={endIndex}
              filteredLength={filteredPrinters.length}
              totalPages={totalPages}
            />
            <Printers printers={displayedPrinters} />

            {totalPages > 1 && (
              <div className="mt-12">
                <div className="text-center mb-6 text-sm text-neutral-500">
                  {searchQuery && ` matching "${searchQuery}"`}
                  {selectedManufacturer !== "all" &&
                    ` from ${selectedManufacturer}`}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1.5">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" && goToPage(page)
                        }
                        disabled={page === "..."}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          page === currentPage
                            ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
                            : page === "..."
                              ? "text-neutral-600 cursor-default"
                              : "text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] cursor-pointer"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mt-4 text-xs text-neutral-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <PrinterIcon className="h-16 w-16 text-neutral-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              No Printers Found
            </h2>
            <p className="text-neutral-400 text-lg max-w-md mx-auto leading-relaxed">
              Try adjusting your search terms or filter criteria to find the
              printer you&apos;re looking for.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
