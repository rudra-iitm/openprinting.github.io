"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "./ui/button"

export default function InfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-black text-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="w-24 h-1 bg-brand-lightBlue mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "About Us",
              description:
                "Learn more about OpenPrinting, how it works, the people involved, and the projects maintained by it",
              icon: "/OpenPrintingBox.png",
              delay: 0.1,
            },
            {
              title: "Contribute",
              description:
                "Know how you can be part of an excellent community and help improve printing experience for millions of users",
              icon: "/contribute.png",
              delay: 0.3,
            },
            {
              title: "CUPS",
              description:
                "CUPS is the standards-based, open source printing system that is used on Linux® and other operating systems.",
              icon: "/cups.png",
              delay: 0.5,
            },
          ].map((item, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: item.delay }}
            className="group relative bg-gray-900 rounded-lg overflow-hidden p-6 border border-gray-800 hover:border-brand-lightBlue transition-colors duration-300 hover:cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            >
              <div className="flex flex-col items-start text-left">
                <div className="mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
                  <img src={item.icon || "/placeholder.svg"} alt={item.title} className="h-full w-full rounded-md" />
                </div>
                <h3 className="text-3xl font-extrabold mb-4">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
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