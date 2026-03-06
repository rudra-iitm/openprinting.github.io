import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

export interface PostSummary {
    slug: string;
    title: string;
    author: string;
    excerpt: string;
    date: string;
    timestamp: number;
}

function getStringField(value: unknown, fallback = ""): string {
    return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function getTimestamp(dateValue: string): number {
    const timestamp = Date.parse(dateValue);
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function getAllPosts(): Promise<PostSummary[]> {
    const entries = await fs.readdir(POSTS_DIR);

    const posts = await Promise.all(
        entries
            .filter((name) => name.endsWith(".md"))
            .map(async (name) => {
                const slug = name.replace(/\.md$/, "");
                const filePath = path.join(POSTS_DIR, name);
                const raw = await fs.readFile(filePath, "utf8");
                const { data } = matter(raw);

                const title = getStringField(data.title, slug.replace(/-/g, " "));
                const author = getStringField(data.author, "OpenPrinting");
                const excerpt = getStringField(data.excerpt, "Read the full post for details.");
                const date = getStringField(data.date);

                return {
                    slug,
                    title,
                    author,
                    excerpt,
                    date,
                    timestamp: getTimestamp(date),
                };
            }),
    );

    return posts.sort((a, b) => b.timestamp - a.timestamp || a.title.localeCompare(b.title));
}

export async function getLatestPosts(limit: number): Promise<PostSummary[]> {
    const posts = await getAllPosts();
    return posts.slice(0, limit);
}