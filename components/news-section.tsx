"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const basePath =
  process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

type NewsPost = {
  title: string
  author: string
  date: string
  excerpt: string
  slug: string
}

export default function NewsSection({ posts }: { posts: NewsPost[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="bg-background text-foreground py-16" id="news">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="w-[70%] max-w-2xl mx-auto h-px bg-foreground" aria-hidden />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-card rounded-lg overflow-hidden p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 hover:cursor-pointer"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300"></div>
              <Link href={`${basePath}/${item.slug}`} prefetch={false} className="block h-full">
                <h3 className="text-xl font-bold mb-3 text-card-foreground">{item.title}</h3>

                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span>Author: {item.author}</span>
                  <span className="mx-2">•</span>
                  <span>Date: {formatDate(item.date)}</span>
                </div>

                <p className="text-card-foreground mb-6">{item.excerpt}</p>

              </Link>

              {/* Animated border effect on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>
    </section>
  )
}

