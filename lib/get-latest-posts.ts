import fs from "fs"
import path from "path"
import matter from "gray-matter"
import authors from "@/data/authors"

const postsDirectory = path.join(process.cwd(), "contents/post")

export type PostMeta = {
  title: string
  author: string
  authorImage?: string
  date: string
  excerpt: string
  slug: string
}

export function getLatestPosts(limit = 3): PostMeta[] {
  const files = fs.readdirSync(postsDirectory)

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      const authorKey = typeof data.author === "string" ? data.author.trim() : undefined
      const authorDef = authorKey ? authors.find(a => a.key === authorKey) : undefined
      const authorImage = authorDef?.image

      return {
        title: data.title,
        author: authorDef ? authorDef.name : data.author,
        authorImage,
        date: data.date,
        excerpt: data.excerpt,
        slug,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts.slice(0, limit)
}
