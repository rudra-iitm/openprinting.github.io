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
    <section ref={ref} className="bg-black text-white" id="news">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="w-24 h-1 bg-brand-lightBlue mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-gray-900 rounded-lg overflow-hidden p-6 border border-gray-800 hover:border-brand-lightBlue transition-colors duration-300 hover:cursor-pointer"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-blue/0 to-brand-blue/0 group-hover:from-brand-blue/5 group-hover:to-brand-blue/10 transition-all duration-300"></div>
              <Link href={`${basePath}/${item.slug}`} className="block h-full">
                <h3 className="text-xl font-bold mb-3 text-brand-lightBlue">{item.title}</h3>

                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <span>Author: {item.author}</span>
                  <span className="mx-2">•</span>
                  <span>Date: {formatDate(item.date)}</span>
                </div>

                <p className="text-gray-300 mb-6">{item.excerpt}</p>

              </Link>

              {/* Animated border effect on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-brand-lightBlue"
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

