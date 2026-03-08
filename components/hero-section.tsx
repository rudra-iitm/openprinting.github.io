"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
  return (
    <>
    <section className="relative min-h-[60vh] flex items-center hero-gradient">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('/rotation_pantone.jpg')` }}></div>
      <div className="hero-section-overlay"></div>

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
            className="text-xl md:text-2xl text-gray-100 mb-8"
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
              <Link href="/about-us" prefetch={false}>Learn More</Link>
            </Button>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-muted border border-border">
              <Link href="/printers/" prefetch={false}>Find a Printer</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
    <h2 className="text-xl md:text-2xl text-center font-bold pt-10 leading-relaxed outline-none" tabIndex={-1}>
      OpenPrinting develops IPP-based printing technology for Linux®/Unix® operating systems.
    </h2>
    </>
  )
}
