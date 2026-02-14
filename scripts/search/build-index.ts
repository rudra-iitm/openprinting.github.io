import fs from "fs/promises";
import path from "path";
import { extractPosts } from "./extract-posts";
import { normalizeMarkdown } from "./normalize-markdown";
import { type SearchDocument, type StaticSearchIndex } from "@/lib/search/types";

const OUTPUT_DIR = path.join(process.cwd(), "public", "search");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "static-index.json");

function safeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function buildIndex() {
  console.log("Building static search index...");

  const rawPosts = await extractPosts();

  const documents: SearchDocument[] = rawPosts.map((post) => {
    const title =
      safeString(post.frontmatter.title) || "Untitled Article";

    const excerpt = safeString(post.frontmatter.excerpt);

    const { headings, text, snippet } = normalizeMarkdown(post.content);

    return {
      id: `post:${post.slug}`,
      source: "static",
      type: "post",

      title,
      url: `/${post.slug}`,

      headings,
      tags: [],

      snippet: excerpt || snippet,
      content: text,
    };
  });

  const index: StaticSearchIndex = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    documents,
    metadata: {
      documentCount: documents.length,
      contentTypes: ["post"],
    },
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(index, null, 2),
    "utf8"
  );

  console.log(`Search index generated with ${documents.length} documents`);
}

buildIndex().catch((err) => {
  console.error("Failed to build search index:", err);
  process.exit(1);
});
