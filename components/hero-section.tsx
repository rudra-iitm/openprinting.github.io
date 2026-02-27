"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : ""

const sponsors = [
  { name: "The Linux Foundation", logo: `${basePath}/lfx.svg` },
  { name: "Sovereign Tech Agency", logo: `${basePath}/sta.jpeg` },
]

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-4 md:pt-32 md:pb-6">
      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="section-kicker"
            >
              Open Printing
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-4 text-4xl font-semibold text-gray-900 dark:text-slate-100 sm:text-5xl lg:text-6xl"
            >
              We make
              <span className="block bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-500 bg-clip-text pb-1 text-transparent dark:from-cyan-200 dark:via-cyan-400 dark:to-emerald-300">
                printing just work!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-5 max-w-2xl text-base text-gray-600 dark:text-slate-300 md:text-lg"
            >
              OpenPrinting develops IPP-based printing technology for Linux®/Unix® operating systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
                <Link href="#about">Learn More</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 bg-white/20 text-gray-700 hover:bg-gray-50 dark:border-slate-500 dark:bg-slate-900/20 dark:text-slate-100 dark:hover:bg-slate-800/70">
                <Link href="#downloads">Find a Printer</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right column — sponsors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-col items-start gap-4 lg:items-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 dark:text-slate-500">
              Supported by
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="inline-flex items-center gap-3 rounded-full border border-gray-200/80 bg-white/40 px-4 py-2.5 text-sm font-medium text-gray-600 backdrop-blur-sm transition-colors hover:border-cyan-400/40 dark:border-slate-700/60 dark:bg-slate-800/30 dark:text-slate-300 dark:hover:border-cyan-400/40"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                    unoptimized
                  />
                  {sponsor.name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
