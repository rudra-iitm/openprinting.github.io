"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
              icon: "/placeholder.svg?height=80&width=80",
              delay: 0.1,
            },
            {
              title: "Contribute",
              description:
                "Know how you can be part of an excellent community and help improve printing experience for millions of users",
              icon: "/placeholder.svg?height=80&width=80",
              delay: 0.3,
            },
            {
              title: "CUPS",
              description:
                "CUPS is the standards-based, open source printing system that is used on Linux® and other operating systems.",
              icon: "/placeholder.svg?height=80&width=80",
              delay: 0.5,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="bg-gray-800 rounded-lg p-6 card-hover"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
                  <img src={item.icon || "/placeholder.svg"} alt={item.title} className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
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
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>
    </section>
  )
}
