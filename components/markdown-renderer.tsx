import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeRaw from "rehype-raw"
import readingTime from "reading-time"
import "highlight.js/styles/github-dark.css"
import bash from "highlight.js/lib/languages/bash"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const stats = readingTime(content)

  return (
    <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/70 px-3 py-1 text-xs text-gray-600 dark:border-slate-600/80 dark:bg-slate-900/70 dark:text-slate-300">
        <span className="font-medium">Estimated read</span>
        <span>{Math.max(1, Math.ceil(stats.minutes))} min</span>
      </div>

      <div className="prose prose-gray dark:prose-invert prose-github max-w-none">
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
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
