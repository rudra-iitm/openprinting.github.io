"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : ""

const sponsors = [
  { name: "The Linux Foundation", logo: `${basePath}/assets/images/lfmp.png` },
  { name: "Sovereign Tech Agency", logo: `${basePath}/sta.jpeg` },
]

export default function SponsorsStrip() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 dark:text-slate-500">
            Supported by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/60 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-colors hover:border-cyan-400/40 dark:border-slate-700/70 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-cyan-400/40"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                  unoptimized
                />
                {sponsor.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
