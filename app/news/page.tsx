import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import DisqusComments from "@/components/disqus-comment";
import AuthorCard from "@/components/AuthorCard";

export default async function Home() {
  const markdownPath = path.join(process.cwd(), "contents", "sample.md");
  const raw = await fs.readFile(markdownPath, "utf8");

  const { data, content: markdownContent = "" } = matter(raw);
  const frontmatter = data as Record<string, unknown>;

  const DEFAULT_AUTHOR_KEY = "Till";

  const authorKey =
    typeof frontmatter.author === "string" &&
    frontmatter.author.trim() !== ""
      ? frontmatter.author.trim()
      : DEFAULT_AUTHOR_KEY;

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
    <main className="w-full">
      <div className="lg:hidden">
        <AuthorCard authorKey={authorKey} />

        <div className="px-4 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
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

        <div className="pb-6">
          <div className="px-4">
            <TableOfContents content={markdownContent} />
          </div>
        </div>

        <div className="w-full px-4">
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
            <MarkdownRenderer content={markdownContent} />
          </div>

          <div className="mt-10">
            <DisqusComments post={{ id: "1", title }} />
          </div>
        </div>
      </div>

      <div className="hidden lg:block max-w-[1400px] mx-auto px-6">
        <div className="flex gap-8 py-10 items-start">
          <aside className="w-[260px] flex-shrink-0 sticky top-20 self-start">
            <AuthorCard authorKey={authorKey} />
          </aside>

          <section className="flex-1 min-w-0 max-w-[720px]">
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

            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
              <MarkdownRenderer content={markdownContent} />
            </div>

            <div className="mt-10">
              <DisqusComments post={{ id: "1", title }} />
            </div>
          </section>

          <aside className="w-[320px] flex-shrink-0 sticky top-20 self-start">
            <TableOfContents content={markdownContent} />
          </aside>
        </div>
      </div>
    </main>
  );
}
