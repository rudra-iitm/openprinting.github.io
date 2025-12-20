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
    <main className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8">

          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-20">
              <OpenPrintingCard />
            </div>
          </aside>

          <section className="col-span-12 lg:col-span-6">
            <h1 className="text-4xl font-bold mb-10">
              News and Events
            </h1>

            <div className="mb-10">
              <a
                href="http://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-blue-400 underline font-semibold"
              >
                Monthly Call Minutes
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-4 mb-14 text-lg">
              {years.map((year) => (
                <a
                  key={year}
                  href={`#year-${year}`}
                  className="flex justify-between border-b border-gray-700 pb-1 text-gray-300 hover:text-white"
                >
                  <span>{year}</span>
                  <span className="text-gray-500 text-sm">
                    {postsByYear[year].length}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-20">
              {years.map((year) => (
                <section key={year} id={`year-${year}`}>
                  <h2 className="text-3xl font-bold mb-8 text-gray-500">
                    {year}
                  </h2>

                  <div className="space-y-12">
                    {postsByYear[year].map((post) => (
                      <div
                        key={post.slug}
                        className="border-2 border-transparent p-4 hover:border-gray-600 transition-colors duration-200 rounded"
                      >
                        <Link
                          href={`/${post.slug}`}
                          className="text-2xl font-bold text-[#03A9F4] underline hover:text-[#4dd0e1]"
                        >
                          {post.title}
                        </Link>

                        <div className="text-sm text-gray-400 mt-2 mb-3">
                          {post.readTime}
                        </div>

                        {post.excerpt && (
                          <p className="text-gray-300 max-w-4xl">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
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
