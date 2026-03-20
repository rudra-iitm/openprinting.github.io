import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { getMarkdownSlug, isMarkdownFile } from "@/lib/content";
import { getTeaserImage } from "@/lib/get-latest-posts";

export interface RawPost {
  slug: string;
  frontmatter: Record<string, unknown>;
  teaserImage?: string,
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

export async function extractPosts(): Promise<RawPost[]> {
  const files = await fs.readdir(POSTS_DIR);

  const markdownFiles = files.filter(isMarkdownFile);

  const posts: RawPost[] = [];

  for (const file of markdownFiles) {
    const slug = getMarkdownSlug(file);
    const fullPath = path.join(POSTS_DIR, file);

    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const teaserImage = getTeaserImage(data, content);

    posts.push({
      slug,
      frontmatter: data as Record<string, unknown>,
      teaserImage,
      content: content ?? "",
    });
  }

  return posts;
}
