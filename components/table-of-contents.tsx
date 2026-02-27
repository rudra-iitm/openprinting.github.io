"use client";

import React, { useMemo, MouseEvent } from "react";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Node } from "unist";
import { cn } from "@/lib/utils";

interface TocEntry {
  value: string;
  url: string;
  depth: number;
}

interface TableOfContentsProps {
  content: string;
  isSticky?: boolean;
}

export function TableOfContents({ content, isSticky = false }: TableOfContentsProps) {
  const toc = useMemo(() => {
    const slugger = new GithubSlugger();
    const tocEntries: TocEntry[] = [];

    const tree = unified().use(remarkParse).parse(content);

    visit(tree, "heading", (node: Node) => {
      const textContent = toString(node);
      const heading = node as unknown as { depth?: number };

      tocEntries.push({
        value: textContent,
        url: slugger.slug(textContent),
        depth: heading.depth ?? 1,
      });
    });

    return tocEntries;
  }, [content]);

  if (toc.length === 0) return null;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();

    if (typeof document === "undefined") return;

    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(`[id="${url}"]`)
    );

    const target = candidates.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    if (!target) return;

    const yOffset = 96;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top - yOffset;

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={cn(
        "modern-card w-full",
        isSticky ? "sticky top-24 self-start" : ""
      )}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-200">
        Table of Contents
      </h2>
      <ul className="mt-4 space-y-2.5">
        {toc.map((entry, index) => (
          <li
            key={`${entry.url}-${index}`}
            className={cn(
              "text-sm leading-relaxed text-gray-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-200",
              entry.depth > 2 ? "ml-4 text-gray-400 dark:text-slate-400" : ""
            )}
          >
            <a
              href={`#${entry.url}`}
              onClick={(event) => handleClick(event, entry.url)}
            >
              {entry.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
