"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : ""

const softwareCards = [
  {
    title: "Driverless Printers",
    description: "Browse modern devices that work out of the box with IPP and OpenPrinting software.",
    image: `${basePath}/ipp-everywhere.png`,
    cta: "Browse devices",
    href: "#downloads",
    delay: 0.1,
  },
  {
    title: "Legacy Printers",
    description: "Use community-maintained free software drivers for older devices.",
    image: `${basePath}/printer.png`,
    cta: "Check compatibility",
    href: "#downloads",
    delay: 0.2,
  },
  {
    title: "Windows + WSL",
    description: "Run modern Printer Applications and restore old hardware from a Linux userspace on Windows.",
    image: `${basePath}/wsl.png`,
    cta: "Read walkthrough",
    href: "/OpenPrinting-News-Windows-Protected-Print-vs.-Scanning-under-Windows",
    delay: 0.3,
  },
]

const collaborationCards = [
  {
    title: "Printer Working Group",
    description: "Collaborative standards work around Internet Printing Protocol and interoperability.",
    image: `${basePath}/pwg.png`,
    cta: "View collaboration",
    href: "/OpenPrinting-News-A-New-Approach",
    delay: 0.1,
  },
  {
    title: "Google Summer of Code",
    description: "Mentorship and contributor onboarding through Linux Foundation programs.",
    image: `${basePath}/gsoc-new.png`,
    cta: "GSoC updates",
    href: "/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one",
    delay: 0.2,
  },
  {
    title: "Google Season of Docs",
    description: "Documentation-focused improvements that make printing tooling easier to use and maintain.",
    image: `${basePath}/gsod.png`,
    cta: "GSoD updates",
    href: "/OpenPrinting-News-The-Winter-of-Code-4.0",
    delay: 0.3,
  },
]

type CardItem = {
  title: string
  description: string
  image: string
  cta: string
  href: string
  delay: number
}

function CardGrid({ cards, isInView }: { cards: CardItem[]; isInView: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: card.delay }}
          className="modern-card flex flex-col"
        >
          <div className="rounded-xl border border-gray-200 bg-gray-50/90 p-2 dark:border-slate-700/80 ">
            <Image src={card.image} alt={card.title} width={360} height={220} className="h-44 w-full rounded-lg object-contain" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-slate-100">{card.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-slate-300">{card.description}</p>
          <Button asChild className="mt-6 w-fit bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
            <Link href={card.href}>{card.cta}</Link>
          </Button>
        </motion.article>
      ))}
    </div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="section-shell" id="projects">
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="section-kicker">Projects</span>
          <h2 className="section-heading mt-4">Software support and ecosystem programs</h2>
          <p className="mt-4 text-gray-600 dark:text-slate-300">
            OpenPrinting covers everyday printing for modern devices while preserving access for older hardware.
          </p>
        </div>

        <CardGrid cards={softwareCards} isInView={isInView} />

        <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-slate-600" />

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Standards and mentoring programs</h3>
          <p className="mt-3 text-gray-600 dark:text-slate-300">
            We work with standards groups and support contributors through coding and documentation initiatives.
          </p>
        </div>

        <CardGrid cards={collaborationCards} isInView={isInView} />
      </div>
    </section>
  )
}
