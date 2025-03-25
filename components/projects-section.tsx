"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "Printer Working Group",
      description:
        "OpenPrinting collaborates with the PWG's Internet Printing Protocol workgroup to support this ubiquitous printing standard.",
      image: "/placeholder.svg?height=120&width=240",
      delay: 0.1,
    },
    {
      title: "GSoC - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoC program under its umbrella organization The Linux Foundation.",
      image: "/placeholder.svg?height=120&width=240",
      delay: 0.3,
    },
    {
      title: "GSoD - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoD program under its umbrella organization The Linux Foundation.",
      image: "/placeholder.svg?height=120&width=240",
      delay: 0.5,
    },
  ]

  return (
    <section ref={ref} className="py-16 bg-gray-900 text-white" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <div className="w-24 h-1 bg-brand-lightBlue mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: project.delay }}
              className="bg-gray-800 rounded-lg overflow-hidden card-hover"
            >
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-brand-blue rounded-md hover:bg-brand-blue/80 transition-colors"
                >
                  Read More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-xl mb-8">
            Most modern printers work using OpenPrinting software without additional drivers or software.
          </p>
          <p className="text-lg text-gray-300">
            OpenPrinting also hosts a printer compatibility database of legacy printers supported by free software
            drivers.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
