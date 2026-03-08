"use client"

import { motion } from "framer-motion"
import { Twitter, Github, Facebook, Rss } from "lucide-react"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

export default function Footer() {
  return (
    <footer className="bg-card text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-8">
            <motion.a
              href="https://x.com/open_printing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground flex gap-2 hover:text-primary transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="font-extrabold">Twitter</span>
            </motion.a>
            <motion.a
              href="https://github.com/OpenPrinting"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground flex gap-2 hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="font-extrabold">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.facebook.com/sharer/sharer.php?u=https://openprinting.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground flex gap-2 hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
              <span className="font-extrabold">Facebook</span>
            </motion.a>
            <motion.a
              href={`${basePath}/feed.xml`}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground flex gap-2 hover:text-primary transition-colors"
            >
              <Rss className="h-6 w-6" />
              <span className="font-extrabold">Feed</span>
            </motion.a>
          </div>

          <div className="text-muted-foreground text-sm text-center">
            <p>© {new Date().getFullYear()} OpenPrinting. All rights reserved.</p>
            <p className="mt-1">Powered by Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
