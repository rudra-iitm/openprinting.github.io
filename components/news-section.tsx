"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import Image from "next/image"

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
  authorImage?: string
  date: string
  excerpt: string
  slug: string
}

export default function NewsSection({ posts }: { posts: NewsPost[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-24 bg-background" id="news">
      <div className="hero-glow-blue opacity-30" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">What&apos;s New</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Latest News
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={item.slug}
                prefetch={false}
                className="group block h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
              >
                <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    {item.authorImage ? (
                      <div className="rounded-full overflow-hidden w-4 h-4 border border-border/50">
                        <Image
                          src={item.authorImage}
                          alt={item.author}
                          width={16}
                          height={16}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    {item.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.date)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read more
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-24 mx-auto max-w-6xl" />
    </section>
  )
}
