import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "about-us.md"
)

export default async function AboutUsPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "About Us"

  return (
    <main className="min-h-screen bg-black text-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          {title}
        </h1>

        <div className="prose prose-invert max-w-none">
          {/* overview page → no reading time / meta */}
          <MarkdownRenderer content={content} showMeta={false} />
        </div>
      </div>
    </main>
  )
}
