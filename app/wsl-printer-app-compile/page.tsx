import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import AuthorCard from "@/components/AuthorCard"
import { siteConfig } from "@/config/site.config";

const basePath = siteConfig.urls.basePath;

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "wsl-printer-app-compile.md"
)

export default async function WSLPrinterAppCompilePage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Reviving an older printer with Ubuntu WSL and Printer Applications"
  
  const author = typeof data.author === "string" ? data.author : null

  return (
    <>
      <div className="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-28 md:py-32 min-h-[340px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-100 dark:opacity-40"
          style={{ backgroundImage: `url(${basePath}/rotation_pantone.jpg)` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-white/65 dark:bg-zinc-900/90" aria-hidden />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
        </div>
      </div>

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {author && (
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <AuthorCard authorKey={author} />
                </div>
              </aside>
            )}
            
            <div className={author ? "lg:col-span-3" : "lg:col-span-4"}>
              <MarkdownRenderer content={raw} showMeta={false} noCard={true} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
