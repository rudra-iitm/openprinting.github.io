"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

type SoftwareItem = {
  title: string
  description: string
  image: string
  href: string
  delay: number
  isExternal?: boolean
}

type ProjectItem = {
  title: string
  description: string
  image: string
  href: string
  delay: number
  isExternal?: boolean
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const softwares: SoftwareItem[] = [
    {
      title: "Driverless Printers",
      description:
        "Most modern printers work ‘out of the box’ with OpenPrinting software. Browse the thousands of driverless printers.",
      image: "/ipp-everywhere.png",
      href: "/printers",
      delay: 0.1,
    },
    {
      title: "Legacy Printers",
      description:
        "The Foomatic printer database lists all of the printers that are supported by free software printer drivers.",
      image: "/printer.png",
      href: "/printers",
      delay: 0.3,
    },
    {
      title: "Windows?!",
      description:
        "Our Printer Applications revive old printers under current Windows, any model which works under Linux.",
      image: "/wsl-printing-icon.png",
      href: "/wsl-printer-app",
      delay: 0.5,
    },
  ]

  const projects: ProjectItem[] = [
    {
      title: "Printer Working Group",
      description:
        "OpenPrinting collaborates with the PWG's Internet Printing Protocol workgroup to support this ubiquitous printing standard.",
      image: "/pwg.png",
      href: "https://www.pwg.org/ipp/",
      delay: 0.1,
    },
    {
      title: "GSoC - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoC program under its umbrella organization The Linux Foundation.",
      image: "/gsoc.jpeg",
      href: "/gsoc",
      delay: 0.3,
    },
    {
      title: "GSoD - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoD program under its umbrella organization The Linux Foundation.",
      image: "/gsod.jpg",
      href: "/gsod",
      delay: 0.5,
    },
  ]

  return (
    <section ref={ref} className="bg-background text-foreground" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-center font-bold mb-4 leading-relaxed text-foreground">
            Most modern printers work using OpenPrinting software without additional drivers or software.
          </p>
          <p className="text-lg text-foreground">
            OpenPrinting also hosts a printer compatibility database of legacy printers supported by free software
            drivers.
          </p>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {softwares.map((software, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: software.delay }}
              className="group relative bg-card rounded-lg overflow-hidden p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="mb-4 bg-muted rounded-lg flex items-center justify-center">
                <Image
                  src={software.image || "/placeholder.svg"}
                  alt={software.title}
                  width={300}
                  height={200}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{software.title}</h3>
                <p className="text-card-foreground mb-4">{software.description}</p>
                <Button asChild className="bg-primary text-md text-primary-foreground hover:bg-primary/90">
                  <Link href={software.href} prefetch={false}>
                    {software.title === "Windows?!" ? "Read More" : "Browse"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-center font-bold mb-4 leading-relaxed text-foreground">
            OpenPrinting collaborates with standards groups and participates in coding/documentation programs.
          </p>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: project.delay }}
              className="group relative bg-card rounded-lg overflow-hidden p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="mb-4 bg-muted rounded-lg flex items-center justify-center">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{project.title}</h3>
                <p className="text-card-foreground mb-4">{project.description}</p>
                {project.href.startsWith("http") ? (
                  <Button asChild className="bg-primary text-md text-primary-foreground hover:bg-primary/90">
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </Button>
                ) : (
                  <Button asChild className="bg-primary text-md text-primary-foreground hover:bg-primary/90">
                    <Link href={project.href} prefetch={false}>
                      Read More
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full h-16"></div>
    </section>
  )
}
