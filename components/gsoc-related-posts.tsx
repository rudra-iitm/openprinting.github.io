"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type RelatedPostsByYear = Record<string, GsocRelatedPost[]>;

type GsocYearSummary = {
  year: string;
  projectCount: number;
};

type GsocRelatedPost = {
  title: string;
  url: string;
  snippet: string;
  tags: string[];
};

export function GsocRelatedPosts({
  years,
  postsByYear,
}: {
  years: GsocYearSummary[];
  postsByYear: RelatedPostsByYear;
}) {
  const yearsWithPosts = useMemo(
    () => years.filter((item) => (postsByYear[item.year] ?? []).length > 0),
    [years, postsByYear],
  );

  const latestYear = yearsWithPosts[0]?.year ?? null;
  const [selectedYear, setSelectedYear] = useState<string | null>(latestYear);

  useEffect(() => {
    if (!selectedYear && latestYear) {
      setSelectedYear(latestYear);
    }

    if (
      selectedYear &&
      !yearsWithPosts.some((item) => item.year === selectedYear)
    ) {
      setSelectedYear(latestYear);
    }
  }, [latestYear, selectedYear, yearsWithPosts]);

  if (!selectedYear || yearsWithPosts.length === 0) {
    return null;
  }

  const relatedPosts = postsByYear[selectedYear] ?? [];

  return (
    <section className="mt-10 border-t border-border pt-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Related Posts
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Showing posts for {selectedYear}
          </p>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {relatedPosts.length} posts
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {yearsWithPosts.map((item) => {
          const isSelected = item.year === selectedYear;
          return (
            <button
              key={item.year}
              type="button"
              onClick={() => setSelectedYear(item.year)}
              className={
                isSelected
                  ? "rounded-full border border-blue-400 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-200"
                  : "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              }
            >
              {item.year}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 space-y-3">
        {relatedPosts.map((post) => (
          <li
            key={post.url}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-border hover:shadow-sm"
          >
            <Link
              href={post.url}
              className="text-sm font-medium text-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              {post.title}
            </Link>
            {post.snippet && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {post.snippet}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
