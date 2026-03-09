import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import OpenPrintingCard from "@/components/OpenPrintingCard"

type Post = {
  slug: string
  title: string
  excerpt: string
  date: Date
  year: number
  readTime: string
}

const POSTS_DIR = path.join(process.cwd(), "contents", "post")

export default async function NewsPage() {
  const files = await fs.readdir(POSTS_DIR)

  const posts: Post[] = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(
          path.join(POSTS_DIR, file),
          "utf8"
        )
        const { data } = matter(raw)
        const date = new Date(data.date ?? "1970-01-01")

        return {
          slug: file.replace(/\.md$/, ""),
          title:
            typeof data.title === "string"
              ? data.title
              : file.replace(/\.md$/, ""),
          excerpt:
            typeof data.excerpt === "string"
              ? data.excerpt
              : "",
          date,
          year: date.getFullYear(),
          readTime:
            typeof data.readTime === "string"
              ? data.readTime
              : "less than 1 minute read",
        }
      })
  )

  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  const postsByYear = posts.reduce<Record<number, Post[]>>(
    (acc, post) => {
      acc[post.year] = acc[post.year] || []
      acc[post.year].push(post)
      return acc
    },
    {}
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main className="w-full min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-4 py-6 sm:py-8 w-full">
        <div className="grid grid-cols-12 gap-6 sm:gap-10 items-start">
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-20 sm:top-24">
              <OpenPrintingCard />
            </div>
          </aside>

          <section className="col-span-12 lg:col-span-6">
            <div className="mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
                News and Events
              </h1>
              <a
                href="http://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors break-all sm:break-normal"
              >
                Monthly Call Minutes
              </a>
              <div className="section-divider mt-6 sm:mt-8" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-3 sm:gap-y-4 mb-10 sm:mb-14">
              {years.map((year) => (
                <a
                  key={year}
                  href={`#year-${year}`}
                  className="flex justify-between items-center border-b border-border/60 pb-1 text-sm text-muted-foreground hover:text-foreground transition-colors min-w-0"
                >
                  <span>{year}</span>
                  <span className="text-xs text-muted-foreground">
                    {postsByYear[year].length}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-10 sm:space-y-16">
              {years.map((year) => (
                <section key={year} id={`year-${year}`} className="scroll-mt-20 sm:scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-muted-foreground">
                    {year}
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {postsByYear[year].map((post) => (
                      <article
                        key={post.slug}
                        className="rounded-xl border border-border/60 bg-card/50 p-4 sm:p-6 transition-all duration-300 hover:border-border card-glow"
                      >
                        <Link
                          href={`/${post.slug}`}
                          prefetch={false}
                          className="text-base sm:text-lg md:text-xl font-semibold text-foreground hover:text-blue-400 transition-colors block break-words"
                        >
                          {post.title}
                        </Link>

                        <div className="text-xs text-muted-foreground mt-1.5 sm:mt-2 mb-2 sm:mb-3">
                          {post.readTime}
                        </div>

                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed break-words">
                            {post.excerpt}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <div className="hidden lg:block lg:col-span-3" />
        </div>
      </div>
    </main>
  )
}
