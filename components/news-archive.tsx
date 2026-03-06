"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, X } from "lucide-react";
import type { PostSummary } from "@/lib/posts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import authors from "@/data/authors";
import { basePath } from "@/lib/utils";

interface NewsArchiveProps {
  posts: PostSummary[];
}

function getPublisherProfile(authorKey: string) {
  const author = authors.find((item) => item.key === authorKey);
  const rawImage =
    author?.image && author.image !== "NA"
      ? author.image
      : "/authors/placeholder.jpg";
  const imagePath = rawImage.startsWith("/")
    ? `${basePath}${rawImage}`
    : `${basePath}/${rawImage}`;

  return {
    name: author?.name || authorKey || "OpenPrinting",
    imagePath,
  };
}

function toDateInputValue(timestamp: number): string {
  if (timestamp <= 0) {
    return "";
  }

  return new Date(timestamp).toISOString().slice(0, 10);
}

function formatDateLabel(dateValue: string): string {
  if (!dateValue) {
    return "";
  }

  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCardDate(dateValue: string) {
  if (!dateValue) {
    return "";
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function NewsArchive({ posts }: NewsArchiveProps) {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const datedPosts = useMemo(
    () => posts.filter((post) => post.timestamp > 0),
    [posts],
  );
  const minDate = useMemo(() => {
    if (datedPosts.length === 0) {
      return "";
    }
    return toDateInputValue(datedPosts[datedPosts.length - 1].timestamp);
  }, [datedPosts]);
  const maxDate = useMemo(() => {
    if (datedPosts.length === 0) {
      return "";
    }
    return toDateInputValue(datedPosts[0].timestamp);
  }, [datedPosts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const fromTimestamp = fromDate
      ? Date.parse(fromDate)
      : Number.NEGATIVE_INFINITY;
    const toTimestamp = toDate
      ? Date.parse(toDate) + 24 * 60 * 60 * 1000 - 1
      : Number.POSITIVE_INFINITY;

    return posts.filter((post) => {
      const matchesQuery =
        normalizedQuery === "" ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery);

      if (!matchesQuery) {
        return false;
      }

      if (!fromDate && !toDate) {
        return true;
      }

      if (post.timestamp <= 0) {
        return false;
      }

      return post.timestamp >= fromTimestamp && post.timestamp <= toTimestamp;
    });
  }, [posts, query, fromDate, toDate]);

  const activeDateFilters = useMemo(() => {
    const chips: Array<{ key: "from" | "to"; label: string }> = [];

    if (fromDate) {
      chips.push({ key: "from", label: `From: ${formatDateLabel(fromDate)}` });
    }
    if (toDate) {
      chips.push({ key: "to", label: `To: ${formatDateLabel(toDate)}` });
    }

    return chips;
  }, [fromDate, toDate]);

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-gray-800 bg-gray-950 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label
              htmlFor="news-search"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Search
            </label>
            <Input
              id="news-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, excerpt, author"
              className="border-gray-700 bg-black text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFiltersOpen((open) => !open)}
              className="border-gray-700 bg-black text-gray-200 hover:bg-gray-900 hover:text-white"
              aria-label="Toggle filters"
            >
              <Filter className="h-4 w-4" />
            </Button>

            {query.trim() !== "" && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuery("")}
                className="border-gray-700 bg-black text-gray-200 hover:bg-gray-900 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {activeDateFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeDateFilters.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-black px-3 py-1 text-xs text-gray-200 hover:bg-gray-900"
                onClick={() => {
                  if (chip.key === "from") {
                    setFromDate("");
                  } else {
                    setToDate("");
                  }
                }}
                aria-label={`Remove ${chip.label} filter`}
              >
                <span>{chip.label}</span>
                <X className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        )}

        {filtersOpen && (
          <div className="mt-4 rounded-md border border-gray-800 bg-black/50 p-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="news-from-date"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400"
                >
                  From Date
                </label>
                <Input
                  id="news-from-date"
                  type="date"
                  value={fromDate}
                  min={minDate || undefined}
                  max={toDate || maxDate || undefined}
                  onChange={(event) => {
                    const nextFrom = event.target.value;
                    setFromDate(nextFrom);
                    if (
                      toDate &&
                      nextFrom &&
                      Date.parse(nextFrom) > Date.parse(toDate)
                    ) {
                      setToDate(nextFrom);
                    }
                  }}
                  className="border-gray-700 bg-black text-white [color-scheme:dark]"
                />
              </div>

              <div>
                <label
                  htmlFor="news-to-date"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400"
                >
                  To Date
                </label>
                <Input
                  id="news-to-date"
                  type="date"
                  value={toDate}
                  min={fromDate || minDate || undefined}
                  max={maxDate || undefined}
                  onChange={(event) => {
                    const nextTo = event.target.value;
                    setToDate(nextTo);
                    if (
                      fromDate &&
                      nextTo &&
                      Date.parse(nextTo) < Date.parse(fromDate)
                    ) {
                      setFromDate(nextTo);
                    }
                  }}
                  className="border-gray-700 bg-black text-white [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="text-sm text-gray-400">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const href = `/${encodeURIComponent(post.slug)}`;
          const publisher = getPublisherProfile(post.author);
          return (
            <Link
              key={post.slug}
              href={href}
              className="block rounded-md border border-gray-800 bg-gray-950 p-5 transition-colors hover:border-gray-700 hover:bg-gray-900/70"
            >
              <article>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold leading-snug text-white">
                    {post.title}
                  </h2>
                  {post.date && (
                    <span className="mt-0.5 shrink-0 rounded-full border border-gray-700 px-2 py-0.5 text-[11px] text-gray-400">
                      {formatCardDate(post.date)}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Image
                    src={publisher.imagePath}
                    alt={publisher.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full border border-gray-700 object-cover"
                  />
                  <span className="text-sm text-gray-300">
                    {publisher.name}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-300">{post.excerpt}</p>
              </article>
            </Link>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="rounded-md border border-gray-800 bg-gray-950 p-8 text-center text-sm text-gray-400">
          No posts match your search/filter criteria.
        </div>
      )}
    </div>
  );
}
