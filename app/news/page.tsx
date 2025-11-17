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
    <main className="container mx-auto py-10 flex flex-col md:flex-row gap-10">
      <aside className="w-full md:w-1/3 lg:w-1/4">
        <AuthorCard authorKey={authorKey} />
      </aside>

      <section className="w-full md:w-2/3 lg:w-3/4">
        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </div>

        <div className="mt-10">
          <DisqusComments post={{ id: "1", title: frontmatter.title }} />
        </div>

        <div className="mt-10">
          <TableOfContents content={markdownContent} />
        </div>
      </section>
    </main>
  );
}
