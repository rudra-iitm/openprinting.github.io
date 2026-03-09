"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchRuntime } from "@/lib/search/runtime-search";
import type { SearchRuntimeResult } from "@/lib/search/runtime-search";
import Link from "next/link";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchRuntimeResult[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [results]);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }

        const runSearch = async () => {
            setLoading(true);
            const res = await searchRuntime(debouncedQuery);
            setResults(res);
            setLoading(false);
        };

        runSearch();
    }, [debouncedQuery]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < results.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            } else if (e.key === "Enter" && results.length > 0) {
                e.preventDefault();
                const selectedResult = results[selectedIndex];
                if (selectedResult) {
                    window.location.href = selectedResult.url;
                    onClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, results, selectedIndex]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <div className="absolute inset-0 bg-black/20" onClick={onClose} />

            <div className="relative w-full max-w-[42rem] bg-[#1e1e1e]/80 backdrop-blur-[60px] rounded-[24px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-3 gap-3 relative">
                    <SearchIcon size={24} className="text-white/60 ml-2" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="OpenPrinting Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent outline-none text-lg sm:text-[26px] tracking-tight text-white placeholder-white/30 caret-blue-500 selection:bg-blue-500/50 selection:text-white pr-20"
                        spellCheck={false}
                    />
                    <div className="absolute right-4 flex items-center gap-1.5 text-xs text-white/40 font-medium">
                        <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/10">ESC</kbd>
                    </div>
                </div>

                {(results.length > 0 || loading || (query && results.length === 0)) && (
                    <div className="h-px w-full bg-white/10" />
                )}

                {(results.length > 0 || loading || (query && results.length === 0)) && (
                    <div className="p-2 max-h-[60vh] overflow-y-auto overflow-x-hidden relative flex flex-col gap-1">
                        {loading && (
                            <div className="px-4 py-3 text-white/50 text-sm">
                                Searching...
                            </div>
                        )}

                        {!loading && query && results.length === 0 && (
                            <div className="px-4 py-8 text-center text-white/50 text-sm">
                                No results found for &quot;{query}&quot;
                            </div>
                        )}

                        {results.map((result, index) => {
                            const isSelected = index === selectedIndex;
                            return (
                                <Link
                                    key={result.id}
                                    href={result.url}
                                    onClick={onClose}
                                    className={`group flex items-center gap-3 p-2 rounded-xl transition-colors duration-100 ${
                                        isSelected ? "bg-blue-500" : "hover:bg-blue-500/50"
                                    }`}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                                        <span className="text-white font-bold text-lg">
                                            {result.title.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-0 flex-1">
                                        <div
                                            className={`font-medium text-[15px] truncate ${
                                                isSelected
                                                    ? "text-white"
                                                    : "text-white/90 group-hover:text-white"
                                            }`}
                                        >
                                            {result.title}
                                        </div>
                                        <div
                                            className={`text-[13px] truncate ${
                                                isSelected
                                                    ? "text-white/80"
                                                    : "text-white/50 group-hover:text-white/70"
                                            }`}
                                        >
                                            {result.snippet || result.url}
                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center text-xs px-2 ${
                                            isSelected
                                                ? "text-white/90"
                                                : "hidden group-hover:flex text-white/50"
                                        }`}
                                    >
                                        <span className="bg-black/20 px-1.5 py-0.5 rounded">
                                            ↵
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
