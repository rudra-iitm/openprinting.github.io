export type Frontmatter = Record<string, unknown>;

export function isMarkdownFile(fileName: string): boolean {
  return fileName.endsWith(".md");
}

export function getMarkdownSlug(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}

export function getOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function getTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function getSanitizedText(value: unknown): string {
  return getTrimmedString(value).replace(/\\/g, "");
}

export function getStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function formatUsDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
