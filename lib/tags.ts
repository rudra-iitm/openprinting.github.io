export function normalizeTag(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^#/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseTagsFromUnknown(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map(normalizeTag)
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map(normalizeTag)
      .filter(Boolean);
  }

  return [];
}

export function extractHashtags(value: string): string[] {
  const tags = new Set<string>();
  const regex = /#([A-Za-z][A-Za-z0-9_-]{1,49})/g;
  let match: RegExpExecArray | null = regex.exec(value);

  while (match) {
    const normalized = normalizeTag(match[1]);
    if (normalized) tags.add(normalized);
    match = regex.exec(value);
  }

  return Array.from(tags);
}

export function uniqueTags(values: Iterable<string>): string[] {
  const tags = new Set<string>();

  for (const value of values) {
    const normalized = normalizeTag(value);
    if (normalized) tags.add(normalized);
  }

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

