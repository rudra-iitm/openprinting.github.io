import React from "react"
import { toString } from "mdast-util-to-string"
import { visit } from "unist-util-visit"
import GithubSlugger from "github-slugger"
import { unified } from "unified"
import remarkParse from "remark-parse"

interface TocEntry {
  value: string
  url: string
  depth: number
}

interface TableOfContentsProps {
  content: string
  isSticky?: boolean
}

export function TableOfContents({ content, isSticky = false }: TableOfContentsProps) {

  const toc = React.useMemo(() => {
  const slugger = new GithubSlugger()
  const tocEntries: TocEntry[] = []

  const tree = unified().use(remarkParse).parse(content)

  visit(tree, "heading", (node) => {
    const textContent = toString(node)
    tocEntries.push({
      value: textContent,
      url: slugger.slug(textContent),
      depth: node.depth,
      })
    })

    return tocEntries
  }, [content])

  const containerClasses = `w-64 bg-gray-900 p-4 rounded-lg ${isSticky ? "sticky top-4 self-start" : ""}`

  return (
    <nav className={containerClasses}>
      <h2 className="text-lg font-semibold mb-2 text-white">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((entry, index) => (
          <li key={index} className={`${entry.depth > 2 ? "ml-4" : ""} text-sm hover:text-blue-400 transition-colors`}>
            <a
              href={`#${entry.url}`}
            >
              {entry.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
