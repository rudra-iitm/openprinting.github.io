import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Clock3 } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import DisqusComments from "@/components/disqus-comment";
import AuthorCard from "@/components/AuthorCard";

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

  const showToc =
    !!frontmatter &&
    (frontmatter.toc === true || String(frontmatter.toc) === "true");

  return (
    <main className="section-shell pt-28 md:pt-32">
      <div className="container relative z-10">
        <header className="modern-card mb-8">
          <p className="section-kicker">OpenPrinting Article</p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-gray-900 dark:text-slate-100 md:text-5xl">
            {title}
          </h1>
          {readTime && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/70 px-3 py-1 text-sm text-gray-600 dark:border-slate-600/80 dark:bg-slate-900/70 dark:text-slate-300">
              <Clock3 className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          )}
        </header>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          {authorKey ? (
            <aside className="xl:sticky xl:top-24 xl:self-start">
              <AuthorCard authorKey={authorKey} />
            </aside>
          ) : (
            <div className="hidden xl:block" />
          )}

          <section className="min-w-0">
            {showToc && (
              <div className="mb-6 xl:hidden">
                <TableOfContents content={markdownContent} />
              </div>
            )}

            <article className="modern-card prose-headings:scroll-mt-28 prose-a:text-cyan-600 hover:prose-a:text-cyan-500 dark:prose-a:text-cyan-300 dark:hover:prose-a:text-cyan-200">
              <MarkdownRenderer content={markdownContent} />
            </article>

            <section className="modern-card mt-8">
              <DisqusComments post={{ id: slug, title }} />
            </section>
          </section>

          {showToc ? (
            <aside className="hidden xl:block">
              <TableOfContents content={markdownContent} isSticky />
            </aside>
          ) : (
            <div className="hidden xl:block" />
          )}
        </div>
      </div>
    </main>
  );
}
