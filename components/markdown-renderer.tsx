import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeRaw from 'rehype-raw'
import readingTime from "reading-time"
import "highlight.js/styles/github-dark.css"
import bash from "highlight.js/lib/languages/bash"
import matter from "gray-matter"
import { Clock } from 'lucide-react';

interface MarkdownRendererProps {
  content: string
}

export interface Metadata {
  title?: string
  layout?: string
  toc?: boolean
  toc_sticky?: boolean
  author?: string
  excerpt?: string
  [key: string]: unknown
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { data, content: markdownContent } = matter(content)
  const metadata: Metadata = data
  const stats = readingTime(markdownContent)

  return (
    <div className="p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="mb-4 md:mb-6">
        {metadata.title && (
          <h1 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 text-white">
            {metadata.title}
          </h1>
        )}
        <div className="flex items-center gap-2 text-sm md:text-base text-gray-400">
          <Clock size={16} />
          <span>{Math.ceil(stats.minutes)} minute read</span>
        </div>
      </div>
      <div className="flex">
        <div className="prose prose-invert prose-github max-w-none w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [rehypeHighlight, { languages: { bash }, detect: true, ignoreMissing: true }],
              rehypeSlug,
              rehypeRaw,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              // @ts-expect-error: TypeScript does not recognize the code component props
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline ? (
                  <code className={`${className || ""} ${!match ? "language-bash" : ""} rounded-md`} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
