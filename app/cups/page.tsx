import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "cups.md"
)

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

const cupsNavItems = [
  { name: "Introduction", href: "#introduction" },
  { name: "A Brief History of CUPS", href: "#a-brief-history-of-cups" },
  { name: "Setting Up Printer Queues", href: "#setting-up-printer-queues" },
  { name: "Printing Files", href: "#printing-files" },
  { name: "Documentation", href: "#documentation" },
  { name: "Platforms", href: "https://github.com/OpenPrinting/cups/wiki/Platforms" },
]

export default async function CupsPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "OpenPrinting CUPS"

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg overflow-hidden border border-border">
              <div className="relative w-full h-36">
                <Image
                  src={`${basePath}/assets/images/cups.png`}
                  alt="CUPS"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-6 text-card-foreground uppercase tracking-wide">
                  {title}
                </h3>
                <nav className="space-y-4">
                  {cupsNavItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href="https://github.com/openprinting/cups/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Download CUPS
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <MarkdownRenderer content={raw} showMeta={false} noCard={true} />
          </div>
        </div>
      </div>
    </main>
  )
}

