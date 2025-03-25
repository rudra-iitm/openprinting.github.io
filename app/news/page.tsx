import fs from 'fs/promises';
import path from 'path';
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from '@/components/table-of-contents'
import DisqusComments from '@/components/disqus-comment';

export default async function Home() {
  const markdownPath = path.join(process.cwd(), 'contents', 'sample.md');
  const content = await fs.readFile(markdownPath, 'utf8');
  const { content: markdownContent } = matter(content)

  return (
    <main className="flex container mx-auto py-10">
      <div>
        <MarkdownRenderer content={content} />
        <DisqusComments post={{ id: '1', title: 'Sample Post' }} />
      </div>
      <TableOfContents content={markdownContent} />
    </main>
  )
}
