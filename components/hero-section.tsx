"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
  return (
    <>
    <section className="relative min-h-[60vh] flex items-center hero-gradient">
      <div className="absolute inset-0 bg-[url('/rotation_pantone.jpg')] bg-cover bg-center z-0 before:absolute before:inset-0 before:bg-black/50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            OpenPrinting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            We make printing just work!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="bg-brand-blue text-white hover:bg-brand-blue/90">
              <Link href="#about">Learn More</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="#downloads">Find a Printer</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
        >
          <motion.div
            animate={{ height: ["0%", "30%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="w-1 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
    <h2 className="text-xl md:text-2xl text-center font-bold my-12 leading-relaxed">
      OpenPrinting develops IPP-based printing technology for Linux®/Unix® operating systems.
    </h2>
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>
    </>
  )
}
