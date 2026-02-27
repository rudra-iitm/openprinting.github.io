"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : ""

const cards = [
  {
    title: "About OpenPrinting",
    description: "Learn how the project is organized, who contributes, and how major components fit together.",
    image: `${basePath}/openprinting.png`,
    cta: "Learn more",
    href: "/How-did-this-all-begin",
    delay: 0.1,
  },
  {
    title: "Contribute",
    description: "Join community development, testing, and documentation to improve printing for millions of users.",
    image: `${basePath}/contribute-new.png`,
    cta: "Start contributing",
    href: "/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started",
    delay: 0.2,
  },
  {
    title: "CUPS Stack",
    description: "Explore the standards-based printing system that powers Linux and multiple Unix-like platforms.",
    image: `${basePath}/cups.png`,
    cta: "Read about CUPS",
    href: "/cups-2.4.15",
    delay: 0.3,
  },
]

export default function InfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="section-shell" id="about">
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-kicker">Foundation</span>
          <h2 className="section-heading mt-4">Community, standards, and core software</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: item.delay }}
              className="modern-card flex flex-col"
            >
              <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-2 dark:border-slate-700/80">
                <Image src={item.image} alt={item.title} width={360} height={220} className="h-44 w-full rounded-lg object-contain" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-gray-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-slate-300">{item.description}</p>
              <Button asChild className="mt-6 w-fit bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
                <Link href={item.href}>{item.cta}</Link>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
