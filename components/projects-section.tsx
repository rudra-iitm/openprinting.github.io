"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "./ui/button"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const softwares = [
    {
      title: "Driverless Printers",
      description:
        "Most modern printers work ‘out of the box’ with OpenPrinting software. Browse the thousands of driverless printers.",
      image: `${basePath}/ipp-everywhere.png`,
      delay: 0.1,
    },
    {
      title: "Legacy Printers",
      description:
        "The Foomatic printer database lists all of the printers that are supported by free software printer drivers.",
      image: `${basePath}/printer.png`,
      delay: 0.3,
    },
    {
      title: "Windows?!",
      description:
        "Our Printer Applications revive old printers under current Windows, any model which works under Linux.",
      image: `${basePath}/wsl-printing-icon.png`,
      delay: 0.5,
    },
  ]
  

  const projects = [
    {
      title: "Printer Working Group",
      description:
        "OpenPrinting collaborates with the PWG's Internet Printing Protocol workgroup to support this ubiquitous printing standard.",
      image: `${basePath}/pwg.png`,
      delay: 0.1,
    },
    {
      title: "GSoC - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoC program under its umbrella organization The Linux Foundation.",
      image: `${basePath}/gsoc.jpeg`,
      delay: 0.3,
    },
    {
      title: "GSoD - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoD program under its umbrella organization The Linux Foundation.",
      image: `${basePath}/gsod.jpg`,
      delay: 0.5,
    },
  ]

  return (
    <section ref={ref} className="bg-black text-white" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="w-24 h-1 bg-brand-lightBlue mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-center font-bold mb-4 leading-relaxed">
            Most modern printers work using OpenPrinting software without additional drivers or software.
          </p>
          <p className="text-lg text-gray-300">
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
            className="group relative bg-gray-900 rounded-lg overflow-hidden p-6 border border-gray-800 hover:border-brand-lightBlue transition-colors duration-300 hover:cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            >
              <div className="mb-4 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src={software.image || `${basePath}/placeholder.svg`}
                  alt={software.title}
                  width={300}
                  height={200}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-2">{software.title}</h3>
                <p className="text-gray-300 mb-4">{software.description}</p>
                <Button className="bg-blue-500 text-md text-white">Browse</Button>
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
          <p className="text-xl md:text-2xl text-center font-bold mb-4 leading-relaxed">
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
            className="group relative bg-gray-900 rounded-lg overflow-hidden p-6 border border-gray-800 hover:border-brand-lightBlue transition-colors duration-300 hover:cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            >
              <div className="mb-4 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src={project.image || `${basePath}/placeholder.svg`}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <Button className="bg-blue-500 text-md text-white">Read More</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>
    </section>
  )
}
