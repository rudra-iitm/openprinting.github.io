import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import DisqusComments from "@/components/disqus-comment";
import AuthorCard from "@/components/AuthorCard";

export default async function Home() {
  const markdownPath = path.join(process.cwd(), "contents", "sample.md");
  const content = await fs.readFile(markdownPath, "utf8");
  const { data: frontmatter, content: markdownContent } = matter(content);
  const authorKey =
    typeof frontmatter.author === "string" ? frontmatter.author : "Till";

  return (
    <main className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-1/4">
          <div className="sticky top-20 flex justify-center lg:justify-start">
            <div className="w-full max-w-[280px]">
              <AuthorCard authorKey={authorKey} />
            </div>
          </div>
        </aside>

        <section className="w-full lg:w-1/2">
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={content} />
          </div>

          <div className="mt-10">
            <DisqusComments post={{ id: "1", title: frontmatter.title }} />
          </div>
        </section>

        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-20">
            <TableOfContents content={markdownContent} />
          </div>
        </aside>
      </div>
    </main>
  );
}
