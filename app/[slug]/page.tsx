import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import DisqusComments from "@/components/disqus-comment";
import AuthorCard from "@/components/AuthorCard";

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

async function getPost(slug: string) {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
        frontmatter: data as Record<string, unknown>,
        content: content ?? "",
    };
}

export async function generateStaticParams() {
    const entries = await fs.readdir(POSTS_DIR);
    return entries
        .filter((name) => name.endsWith(".md"))
        .map((name) => ({
            slug: name.replace(/\.md$/, ""),
        }));
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { frontmatter, content: markdownContent } = await getPost(slug);

    const rawAuthor =
        typeof frontmatter.author === "string" ? frontmatter.author.trim() : "";
    const authorKey = rawAuthor !== "" ? rawAuthor : undefined;

    const title =
        typeof frontmatter.title === "string" && frontmatter.title.trim() !== ""
            ? frontmatter.title.trim()
            : "Untitled Article";

    const readTime =
        typeof frontmatter.readTime === "string" &&
            frontmatter.readTime.trim() !== ""
            ? frontmatter.readTime.trim()
            : "";

    return (
        <main className="w-full">
            <div className="max-w-[1400px] mx-auto px-4 lg:pl-6 lg:pr-1 py-10 w-full">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {authorKey && (
                        <aside className="w-full lg:w-[260px] flex-shrink-0 lg:sticky lg:top-20 lg:self-start">
                            <AuthorCard authorKey={authorKey} />
                        </aside>
                    )}

                    <section className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[720px]">
                        <div className="mb-6 px-4">
                            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
                                {title}
                            </h1>
                            {readTime && (
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <path strokeWidth="2" d="M12 6v6l4 2" />
                                    </svg>
                                    <span>{readTime}</span>
                                </div>
                            )}
                        </div>

                        <div className="pb-6 px-4 lg:hidden">
                            <TableOfContents content={markdownContent} />
                        </div>

                        <div className="w-full px-4 lg:px-0">
                            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
                                <MarkdownRenderer content={markdownContent} />
                            </div>

                            <div className="mt-10">
                                <DisqusComments post={{ id: slug, title }} />
                            </div>
                        </div>
                    </section>

                    <aside className="hidden lg:block w-[320px] flex-shrink-0 sticky top-20 self-start">
                        <TableOfContents content={markdownContent} />
                    </aside>
                </div>
            </div>
        </main>
    );
}
