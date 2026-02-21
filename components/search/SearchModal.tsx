"use client";

import { useEffect, useState } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { searchRuntime } from "@/lib/search/runtime-search";
import type { SearchRuntimeResult } from "@/lib/search/runtime-search";
import { Button } from "@/components/ui/button"
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

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 px-4">
            <div className="w-full max-w-2xl bg-zinc-900 rounded-xl shadow-lg p-6 relative">
                <Button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                    <X size={20} />
                </Button>

                <div className="flex items-center gap-2 mb-4">
                    <SearchIcon size={20} className="text-gray-400" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search OpenPrinting..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-white placeholder-gray-500"
                    />
                </div>

                <div className="max-h-96 overflow-y-auto space-y-3">
                    {loading && (
                        <div className="text-gray-500 text-sm">
                            Loading search index...
                        </div>
                    )}
                    {results.map((result) => (
                        <Link
                            key={result.id}
                            href={result.url}
                            onClick={onClose}
                            className="block p-3 rounded-md hover:bg-zinc-800 transition"
                        >
                            <div className="text-white font-semibold">
                                {result.title}
                            </div>
                            <div className="text-sm text-gray-400">
                                {result.snippet}
                            </div>
                        </Link>
                    ))}

                    {!loading && query && results.length === 0 && (
                        <div className="text-gray-500 text-sm">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
