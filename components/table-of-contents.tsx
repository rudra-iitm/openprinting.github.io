"use client";

import React, { useMemo, MouseEvent } from "react";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Node } from "unist";

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

    const yOffset = 80;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top - yOffset;

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });
  };

  const containerClasses = `w-full bg-gray-900 p-4 rounded-lg ${isSticky ? "sticky top-4 self-start" : ""}`;

  return (
    <nav className={containerClasses}>
      <h2 className="text-lg font-semibold mb-2 text-white">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((entry, index) => (
          <li
            key={index}
            className={`${entry.depth > 2 ? "ml-4" : ""} text-sm hover:text-blue-400 transition-colors`}
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
