import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { redirect, notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import GiscusComments from "@/components/giscus-comment";
import AuthorCard from "@/components/AuthorCard";
import { extractHashtags, parseTagsFromUnknown, uniqueTags } from "@/lib/tags";

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

async function getPost(slug: string) {
    const decodedSlug = decodeURIComponent(slug);
    const filePath = path.join(POSTS_DIR, `${decodedSlug}.md`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
        frontmatter: data as Record<string, unknown>,
        content: content ?? "",
    };
}

async function getAllPostsMetadata() {
    const entries = await fs.readdir(POSTS_DIR);

    const posts = await Promise.all(
        entries
            .filter((name) => name.endsWith(".md"))
            .map(async (name) => {
                const filePath = path.join(POSTS_DIR, name);
                const raw = await fs.readFile(filePath, "utf8");
                const { data } = matter(raw);

                return {
                    slug: name.replace(/\.md$/, ""),
                    previousSlugs: Array.isArray(data.previousSlugs)
                        ? data.previousSlugs
                        : [],
                };
            })
    );

    return posts;
}

export async function generateStaticParams() {
    const entries = await fs.readdir(POSTS_DIR);

    const params: { slug: string }[] = [];

    for (const name of entries) {
        if (!name.endsWith(".md")) continue;

        const slug = name.replace(/\.md$/, "");
        params.push({ slug });

        const filePath = path.join(POSTS_DIR, name);
        const raw = await fs.readFile(filePath, "utf8");
        const { data } = matter(raw);

        if (Array.isArray(data.previousSlugs)) {
            for (const prevSlug of data.previousSlugs) {
                params.push({ slug: prevSlug });
            }
        }
    }

    return params;
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const allPosts = await getAllPostsMetadata();

    const directMatch = allPosts.find((post) => post.slug === decodedSlug);

    if (!directMatch) {
        const redirectMatch = allPosts.find((post) =>
            post.previousSlugs.includes(decodedSlug)
        );

        if (redirectMatch) {
            redirect(`/${redirectMatch.slug}`);
        }

        notFound();
    }

    const { frontmatter, content: markdownContent } = await getPost(decodedSlug);

    const rawAuthor =
        typeof frontmatter.author === "string" ? frontmatter.author.trim() : "";
    const authorKey = rawAuthor !== "" ? rawAuthor : undefined;

    const title =
        typeof frontmatter.title === "string" && frontmatter.title.trim() !== ""
            ? frontmatter.title.trim()
            : "Untitled Article";

    let formattedDate = "";
    if (typeof frontmatter.date === "string" && frontmatter.date.trim() !== "") {
        const parsedDate = new Date(frontmatter.date);
        formattedDate = parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const readTime =
        typeof frontmatter.readTime === "string" &&
            frontmatter.readTime.trim() !== ""
            ? frontmatter.readTime.trim()
            : "";

    const showToc =
        !!frontmatter &&
        (frontmatter.toc === true || String(frontmatter.toc) === "true");
    const postTags = uniqueTags([
        ...parseTagsFromUnknown(frontmatter.tags),
        ...extractHashtags(markdownContent),
        ...(title.toLowerCase().includes("google summer of code") || /\bgsoc\b/i.test(title)
            ? ["gsoc"]
            : []),
    ]);

    return (
        <main className="w-full min-h-screen pt-24 pb-16 bg-background text-foreground">
            <div className="max-w-[1400px] mx-auto px-6 lg:pl-8 lg:pr-4 py-8 w-full">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {authorKey && (
                        <aside className="w-full lg:w-[260px] flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                            <AuthorCard authorKey={authorKey} />
                        </aside>
                    )}

                    <section className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[720px]">
                        <div className="mb-8 px-4">
                            <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-3">
                                {title}
                            </h1>
                            {formattedDate && (
                                <div className="text-muted-foreground text-sm mb-2">
                                    {formattedDate}
                                </div>
                            )}
                            {readTime && (
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
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
                            <div className="section-divider mt-8" />
                        </div>

                        {showToc && (<div className="pb-6 px-4 lg:hidden">
                            <TableOfContents content={markdownContent} />
                        </div>)}

                        <div className="w-full px-4 lg:px-0">
                            <div className="prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300">
                                <MarkdownRenderer content={markdownContent} />
                            </div>

                            {postTags.length > 0 && (
                                <div className="mt-10 border-t border-border/60 pt-5">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Tags
                                    </h2>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {postTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-12">
                                <GiscusComments />
                            </div>
                        </div>
                    </section>

                    {showToc && (<aside className="hidden lg:block w-[320px] flex-shrink-0 sticky top-24 self-start">
                        <TableOfContents content={markdownContent} />
                    </aside>)}
                </div>
            </div>
        </main>
    );
}
