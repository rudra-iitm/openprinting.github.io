import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import DisqusComments from "@/components/disqus-comment";
import AuthorSection from "@/components/AuthorSection";
import authors from "@/data/authors";


export default async function Home() {
  const markdownPath = path.join(process.cwd(), 'contents', 'sample.md');
  const content = await fs.readFile(markdownPath, 'utf8');
  const { data: frontMatter, content: markdownContent } = matter(content);
  
  // Generate a URL-friendly slug from the filename
  const slug = path.basename(markdownPath, '.md');

  return (
    <main className="flex container mx-auto py-10 gap-10">
      <div className="flex flex-col gap-8 max-w-3xl">
        <MarkdownRenderer content={content} />

  {/* Authors section (reusable) */}
  <AuthorSection authors={authors} />

        <DisqusComments post={{ id: slug, title: frontMatter.title || 'Untitled Post' }} />

      </div>

      <TableOfContents content={markdownContent} />
    </main>

  )
}
