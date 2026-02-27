import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Clock3 } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import DisqusComments from "@/components/disqus-comment";
import AuthorCard from "@/components/AuthorCard";

export default async function Home() {
  const markdownPath = path.join(
    process.cwd(),
    "contents",
    "post",
    "sample.md"
  );
  const raw = await fs.readFile(markdownPath, "utf8");

  const { data, content: markdownContent = "" } = matter(raw);
  const frontmatter = data as Record<string, unknown>;

  const rawAuthor =
    typeof frontmatter.author === "string" ? frontmatter.author.trim() : "";
  const authorKey = rawAuthor !== "" ? rawAuthor : undefined;

  const title =
    typeof frontmatter.title === "string" &&
    frontmatter.title.trim() !== ""
      ? frontmatter.title.trim()
      : "Untitled Article";

  const readTime =
    typeof frontmatter.readTime === "string" &&
    frontmatter.readTime.trim() !== ""
      ? frontmatter.readTime.trim()
      : "";

  return (
    <main className="section-shell pt-28 md:pt-32">
      <div className="container relative z-10">
        <header className="modern-card mb-8">
          <p className="section-kicker">Sample News</p>
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
            <div className="mb-6 xl:hidden">
              <TableOfContents content={markdownContent} />
            </div>

            <article className="modern-card">
              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-headings:font-semibold prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:text-cyan-500 dark:prose-a:text-cyan-300 dark:hover:prose-a:text-cyan-200 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 dark:prose-code:bg-slate-800">
                <MarkdownRenderer content={markdownContent} />
              </div>
            </article>

            <section className="modern-card mt-8">
              <DisqusComments post={{ id: "sample-news", title }} />
            </section>
          </section>

          <aside className="hidden xl:block">
            <TableOfContents content={markdownContent} isSticky />
          </aside>
        </div>
      </div>
    </main>
  );
}
