"use client";

import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Search, X, SlidersHorizontal } from "lucide-react";

interface PrinterSearchProps {
  manufacturers: string[];
  driverTypes: string[];
  mechanismTypes: string[];
  supportLevels: string[];
  colorCapabilities: string[];
  onSearch: (query: string) => void;
  onFilterManufacturer: (manufacturer: string) => void;
  onFilterDriverType: (driverType: string) => void;
  onFilterMechanismType: (mechanismType: string) => void;
  onFilterSupportLevel: (supportLevel: string) => void;
  onFilterColorCapability: (colorCapability: string) => void;
  selectedManufacturer: string;
  selectedDriverType: string;
  selectedMechanismType: string;
  selectedSupportLevel: string;
  selectedColorCapability: string;
  onReset: () => void;
}

export default function PrinterSearch({
  manufacturers,
  driverTypes,
  mechanismTypes,
  supportLevels,
  colorCapabilities,
  onSearch,
  onFilterManufacturer,
  onFilterDriverType,
  onFilterMechanismType,
  onFilterSupportLevel,
  onFilterColorCapability,
  selectedManufacturer,
  selectedDriverType,
  selectedMechanismType,
  selectedSupportLevel,
  selectedColorCapability,
  onReset,
}: PrinterSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  const hasActiveFilters =
    selectedManufacturer !== "all" ||
    selectedDriverType !== "all" ||
    selectedMechanismType !== "all" ||
    selectedSupportLevel !== "all" ||
    selectedColorCapability !== "all" ||
    searchQuery !== "";

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-blue-400" />
          <h2 className="text-lg font-semibold text-foreground tracking-tight">
            Search & Filter
          </h2>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={() => {
              setSearchQuery("");
              onReset();
            }}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent h-8 text-xs"
          >
            <X className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search by model or make..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-11 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/30 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          <SimpleSelect
            value={selectedManufacturer}
            onValueChange={onFilterManufacturer}
            placeholder="All Manufacturers"
            triggerClassName="h-11 bg-background border-border text-foreground hover:border-border/80 hover:bg-accent transition-colors"
          >
            <SimpleSelectItem value="all">All Manufacturers</SimpleSelectItem>
            {manufacturers.map((manufacturer) => (
              <SimpleSelectItem key={manufacturer} value={manufacturer}>
                {manufacturer}
              </SimpleSelectItem>
            ))}
          </SimpleSelect>

          <SimpleSelect
            value={selectedDriverType}
            onValueChange={onFilterDriverType}
            placeholder="Driver Type"
            triggerClassName="h-11 bg-background border-border text-foreground hover:border-border/80 hover:bg-accent transition-colors"
          >
            <SimpleSelectItem value="all">All Driver Types</SimpleSelectItem>
            {driverTypes.map((type) => (
              <SimpleSelectItem key={type} value={type}>
                {type}
              </SimpleSelectItem>
            ))}
          </SimpleSelect>

          <SimpleSelect
            value={selectedMechanismType}
            onValueChange={onFilterMechanismType}
            placeholder="Mechanism Type"
            triggerClassName="h-11 bg-background border-border text-foreground hover:border-border/80 hover:bg-accent transition-colors"
          >
            <SimpleSelectItem value="all">All Mechanism Types</SimpleSelectItem>
            {mechanismTypes.map((type) => (
              <SimpleSelectItem key={type} value={type}>
                {type}
              </SimpleSelectItem>
            ))}
          </SimpleSelect>

          <SimpleSelect
            value={selectedSupportLevel}
            onValueChange={onFilterSupportLevel}
            placeholder="Support Level"
            triggerClassName="h-11 bg-background border-border text-foreground hover:border-border/80 hover:bg-accent transition-colors"
          >
            <SimpleSelectItem value="all">All Support Levels</SimpleSelectItem>
            {supportLevels.map((level) => (
              <SimpleSelectItem key={level} value={level}>
                {level}
              </SimpleSelectItem>
            ))}
          </SimpleSelect>

          <SimpleSelect
            value={selectedColorCapability}
            onValueChange={onFilterColorCapability}
            placeholder="Color Capability"
            triggerClassName="h-11 bg-background border-border text-foreground hover:border-border/80 hover:bg-accent transition-colors"
          >
            <SimpleSelectItem value="all">
              All Color Capabilities
            </SimpleSelectItem>
            {colorCapabilities.map((capability) => (
              <SimpleSelectItem key={capability} value={capability}>
                {capability}
              </SimpleSelectItem>
            ))}
          </SimpleSelect>
        </div>
      </div>
    </div>
  );
}
