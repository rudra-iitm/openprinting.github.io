"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : ""

interface PrinterEntry {
  id: string
  manufacturer: string
  model: string
  type: string
  functionality: string
  driverCount: number
}

const FUNCTIONALITY_LABELS: Record<string, string> = {
  A: "Works Perfectly",
  B: "Works Mostly",
  C: "Works Somewhat",
  D: "Unknown",
  E: "Paper Feed Issues",
  F: "Broken",
  G: "No Longer Supported",
}

const FUNCTIONALITY_COLORS: Record<string, string> = {
  A: "text-green-600 dark:text-green-400",
  B: "text-blue-600 dark:text-blue-400",
  C: "text-yellow-600 dark:text-yellow-400",
  D: "text-muted-foreground",
  E: "text-orange-600 dark:text-orange-400",
  F: "text-red-600 dark:text-red-400",
  G: "text-muted-foreground",
}

const PAGE_SIZE = 25

export default function PrintersPage() {
  const [printers, setPrinters] = useState<PrinterEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`${basePath}/foomatic-db/printersMap.json`)
      .then((r) => r.json())
      .then((data) => {
        setPrinters(data.printers)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return printers
    const q = query.toLowerCase()
    return printers.filter(
      (p) =>
        p.manufacturer.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q)
    )
  }, [printers, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setPage(1)
  }

  const pageNumbers = useMemo(() => {
    const delta = 2
    const range: (number | "...")[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i)
      } else if (range[range.length - 1] !== "...") {
        range.push("...")
      }
    }
    return range
  }, [totalPages, currentPage])

  return (
    <>
      <div className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('${basePath}/ipp-everywhere.png')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-zinc-900/90" aria-hidden />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Printer Database</h1>
          <p className="text-xl text-white/80">
            Search the Foomatic printer database — {printers.length.toLocaleString()} printers indexed.
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-background text-foreground pt-10 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search row */}
          <div className="flex items-center gap-3 mb-6 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Search by manufacturer or model…"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {loading ? "Loading…" : `${filtered.length.toLocaleString()} result${filtered.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Manufacturer</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Model</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Functionality</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">Drivers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                      Loading printer database…
                    </td>
                  </tr>
                ) : pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                      No printers found matching &ldquo;{query}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((printer) => (
                    <tr key={printer.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-medium">{printer.manufacturer}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://openprinting.org/printer/${printer.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {printer.model}
                        </a>
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">{printer.type}</td>
                      <td className="px-4 py-3">
                        <span className={FUNCTIONALITY_COLORS[printer.functionality] ?? "text-muted-foreground"}>
                          {printer.functionality} — {FUNCTIONALITY_LABELS[printer.functionality] ?? "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{printer.driverCount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {pageNumbers.map((n, i) =>
                n === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1 text-muted-foreground select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`min-w-[2.25rem] px-3 py-1.5 rounded-md border text-sm transition-colors ${
                      n === currentPage
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page info */}
          {!loading && filtered.length > 0 && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Showing {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()} printers
            </p>
          )}
        </div>
      </main>
    </>
  )
}
