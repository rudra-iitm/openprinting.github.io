"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

type InfoItem = {
  title: string
  description: string
  icon: string
  href: string
  delay: number
}

export default function InfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {([
            {
              title: "About Us",
              description:
                "Learn more about OpenPrinting, how it works, the people involved, and the projects maintained by it",
              icon: `${basePath}/OpenPrintingBox.png`,
              href: `${basePath}/about-us`,
              delay: 0.1,
            },
            {
              title: "Contribute",
              description:
                "Know how you can be part of an excellent community and help improve printing experience for millions of users",
              icon: `${basePath}/contribute.png`,
              href: `${basePath}/contribute`,
              delay: 0.3,
            },
            {
              title: "CUPS",
              description:
                "CUPS is the standards-based, open source printing system that is used on Linux® and other operating systems.",
              icon: `${basePath}/cups.png`,
              href: `${basePath}/cups`,
              delay: 0.5,
            },
          ] as InfoItem[]).map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="group relative bg-card rounded-lg overflow-hidden p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 hover:cursor-pointer"
            >
              <div className="flex flex-col items-start text-left">
                <div className="mb-6 bg-muted rounded-lg flex items-center justify-center w-full h-48 overflow-hidden">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-card-foreground">{item.title}</h3>
                <p className="text-card-foreground mb-6 leading-relaxed">{item.description}</p>

                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={item.href} prefetch={false}>
                    Read More
                  </Link>
                </Button>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>
    </section>
  )
}