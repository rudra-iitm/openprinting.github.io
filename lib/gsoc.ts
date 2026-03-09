import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { StaticSearchIndex } from "@/lib/search/types";
import { extractHashtags, parseTagsFromUnknown, uniqueTags } from "@/lib/tags";

const GSOC_DIR = path.join(process.cwd(), "contents", "gsoc");
const SEARCH_INDEX_FILE = path.join(
  process.cwd(),
  "public",
  "search",
  "static-index.json",
);

export interface GsocYearSummary {
  year: string;
  projectCount: number;
}

export interface GsocProjectSummary {
  year: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export interface GsocProject extends GsocProjectSummary {
  content: string;
}

export interface GsocYearOverview {
  year: string;
  title: string;
  content: string;
}

export interface GsocRelatedPost {
  title: string;
  url: string;
  snippet: string;
  tags: string[];
}

function isYearDirectory(name: string) {
  return /^\d{4}$/.test(name);
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[`*_>#]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isHtmlFragmentLine(value: string): boolean {
  const line = value.trim();
  if (!line) return false;

  // Legacy migrated GSoC files may contain raw HTML/comment fragments like
  // "<p", "<div>", "<!-- ... -->", or closing tags as standalone lines.
  return (
    line.startsWith("<") ||
    line.endsWith(">") ||
    line.startsWith("--") ||
    line.includes("<!--") ||
    line.includes("-->")
  );
}

function getExcerpt(markdownContent: string, title: string): string {
  const normalizedTitle = normalizeText(title);

  const lines = markdownContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"))
    .filter((line) => !isHtmlFragmentLine(line))
    .map(stripInlineMarkdown)
    .filter((line) => line !== "")
    .filter((line) => !/^(AI\/ML-related project|Security-related project|Security- and AI-related project)$/i.test(line))
    .filter((line) => normalizeText(line) !== normalizedTitle);

  if (lines.length === 0) {
    return "Read the full project description.";
  }

  const firstLine = lines[0];
  if (firstLine.length <= 180) {
    return firstLine;
  }

  return `${firstLine.slice(0, 177).trimEnd()}...`;
}

function getTitle(frontmatter: Record<string, unknown>, slug: string): string {
  if (typeof frontmatter.title === "string" && frontmatter.title.trim() !== "") {
    return frontmatter.title.trim();
  }

  const readable = slug
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .trim();

  return readable.length > 0 ? readable : slug;
}

function getGsocProjectTags(
  frontmatter: Record<string, unknown>,
  content: string,
  title: string,
  year: string,
): string[] {
  const frontmatterTags = parseTagsFromUnknown(frontmatter.tags);
  const inferred: string[] = ["gsoc", year, `gsoc-${year}`];
  const normalizedContent = content.toLowerCase();
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedContent.includes("ai/ml-related project") ||
    normalizedContent.includes("ai- and security-related project") ||
    normalizedContent.includes("security- and ai-related project")
  ) {
    inferred.push("ai-ml");
  }

  if (
    normalizedContent.includes("security-related project") ||
    normalizedContent.includes("ai- and security-related project") ||
    normalizedContent.includes("security- and ai-related project")
  ) {
    inferred.push("security");
  }

  if (normalizedTitle.includes("fuzz")) inferred.push("fuzzing");
  if (normalizedTitle.includes("print")) inferred.push("printing");
  if (normalizedTitle.includes("scan")) inferred.push("scanning");
  if (normalizedTitle.includes("cups")) inferred.push("cups");
  if (normalizedTitle.includes("cpdb")) inferred.push("cpdb");
  if (normalizedTitle.includes("pdf")) inferred.push("pdf");
  if (normalizedTitle.includes("desktop")) inferred.push("desktop");
  if (normalizedTitle.includes("zephyr")) inferred.push("zephyr");

  return uniqueTags([...frontmatterTags, ...inferred, ...extractHashtags(content)]);
}

function getGsocRelatedPostTags(
  indexTags: string[],
  title: string,
  snippet: string,
  content: string,
  year: string,
): string[] {
  return uniqueTags([
    ...indexTags,
    "gsoc",
    year,
    `gsoc-${year}`,
    ...extractHashtags(`${title}\n${snippet}\n${content}`),
  ]);
}

export async function getGsocYears(): Promise<string[]> {
  const entries = await fs.readdir(GSOC_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && isYearDirectory(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => Number(b) - Number(a));
}

export async function getGsocYearSummaries(): Promise<GsocYearSummary[]> {
  const years = await getGsocYears();

  const summaries = await Promise.all(
    years.map(async (year) => {
      const yearDir = path.join(GSOC_DIR, year);
      const files = await fs.readdir(yearDir);
      const projectCount = files.filter((file) => file.endsWith(".md")).length;

      return { year, projectCount };
    }),
  );

  return summaries;
}

export async function getGsocProjectsByYear(year: string): Promise<GsocProjectSummary[]> {
  const yearDir = path.join(GSOC_DIR, year);
  const files = await fs.readdir(yearDir);

  const projects = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const filePath = path.join(yearDir, fileName);
        const raw = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(raw);

        return {
          year,
          slug,
          title: getTitle(data as Record<string, unknown>, slug),
          excerpt: getExcerpt(content, getTitle(data as Record<string, unknown>, slug)),
          tags: getGsocProjectTags(
            data as Record<string, unknown>,
            content,
            getTitle(data as Record<string, unknown>, slug),
            year,
          ),
        };
      }),
  );

  return projects.sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }));
}

export async function getGsocYearOverview(year: string): Promise<GsocYearOverview> {
  const filePath = path.join(GSOC_DIR, `gsoc${year}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      year,
      title: getTitle(data as Record<string, unknown>, `gsoc${year}`),
      content: content.trim(),
    };
  } catch {
    return {
      year,
      title: `GSoC ${year} Projects`,
      content: "",
    };
  }
}

export async function getGsocProject(year: string, slug: string): Promise<GsocProject> {
  const filePath = path.join(GSOC_DIR, year, `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    year,
    slug,
    title: getTitle(data as Record<string, unknown>, slug),
    excerpt: getExcerpt(content, getTitle(data as Record<string, unknown>, slug)),
    content,
    tags: getGsocProjectTags(
      data as Record<string, unknown>,
      content,
      getTitle(data as Record<string, unknown>, slug),
      year,
    ),
  };
}

function extractYear(value: string): string | null {
  const match = value.match(/\b(20\d{2})\b/);
  return match ? match[1] : null;
}

export async function getGsocPostsByYear(): Promise<Record<string, GsocRelatedPost[]>> {
  let rawIndex: string;

  try {
    rawIndex = await fs.readFile(SEARCH_INDEX_FILE, "utf8");
  } catch {
    return {};
  }

  const index = JSON.parse(rawIndex) as StaticSearchIndex;
  const grouped: Record<string, GsocRelatedPost[]> = {};

  for (const document of index.documents) {
    if (document.type !== "post") continue;

    const title = document.title.toLowerCase();
    const tags = document.tags ?? [];
    const hasGsocTag = tags.some((tag) => tag.toLowerCase() === "gsoc");
    const isGsocPostByTitle =
      title.includes("google summer of code") || /\bgsoc\b/.test(title);
    const isGsocPost = hasGsocTag || isGsocPostByTitle;

    if (!isGsocPost) continue;

    const year = extractYear(document.title) ?? extractYear(document.url);
    if (!year) continue;

    if (!grouped[year]) grouped[year] = [];
    grouped[year].push({
      title: document.title.trim(),
      url: document.url.trim(),
      snippet: document.snippet.trim(),
      tags: getGsocRelatedPostTags(
        document.tags ?? [],
        document.title,
        document.snippet,
        document.content,
        year,
      ),
    });
  }

  for (const year of Object.keys(grouped)) {
    grouped[year].sort((a, b) => a.title.localeCompare(b.title));
  }

  return grouped;
}
