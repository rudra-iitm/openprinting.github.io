import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { siteConfig } from "@/config/site.config"
import { withBasePath } from "@/lib/site"

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "history.md"
)

export default async function HistoryPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "History"

  return (
    <>
      <div className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${withBasePath(siteConfig.assets.heroBackground)})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-zinc-900/90" aria-hidden />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl text-white/80">
            The story of OpenPrinting
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 about-us-content">
          <MarkdownRenderer content={content} showMeta={false} noCard />
        </div>
      </main>
    </>
  )
}
