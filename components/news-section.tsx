"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const news = [
  {
    title: "libcups v3.0rc4",
    author: "Mike",
    date: "March 18, 2025",
    excerpt:
      "The fourth release candidate of the CUPS v3 library removes deprecated APIs and sharpens consistency across the toolchain.",
    url: "/libcups-3.0rc4",
    delay: 0.1,
  },
  {
    title: "Framework RISC-V board support",
    author: "Till",
    date: "March 2, 2025",
    excerpt: "OpenPrinting development and testing now includes RISC-V hardware from DeepComputing.",
    url: "/OpenPrinting-News-We-got-a-Framework-RISC-V-board-from-DeepComputing",
    delay: 0.2,
  },
  {
    title: "GSoC 2025: Linux Foundation accepted",
    author: "Till",
    date: "March 1, 2025",
    excerpt: "OpenPrinting mentors under The Linux Foundation again, with a new contributor cohort.",
    url: "/OpenPrinting-News-Google-Summer-of-Code-2025-The-Linux-Foundation-is-accepted-as-mentoring-organization",
    delay: 0.3,
  },
]

export default function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="section-shell" id="news">
      <div className="container relative z-10">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <span className="section-kicker">Recent Signals</span>
          {/* <h2 className="section-heading mt-4">News and engineering updates</h2> */}
          {/* <p className="mt-4 text-gray-600 dark:text-slate-300">Track releases, standards work, and program milestones from the OpenPrinting ecosystem.</p> */}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: item.delay }}
              className="modern-card"
            >
              <p className="text-xs uppercase tracking-[0.1em] text-cyan-700 dark:text-cyan-200">{item.date}</p>
              <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">By {item.author}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-300">{item.excerpt}</p>
              <Link href={item.url} className="mt-6 inline-flex text-sm font-medium text-cyan-700 hover:text-cyan-600 dark:text-cyan-200 dark:hover:text-cyan-100">
                Read update {"->"}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
