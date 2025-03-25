"use client"

import { motion } from "framer-motion"
import { Twitter, Github, Facebook, Rss } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-8">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 flex gap-2 hover:text-white transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="font-extrabold">Twitter</span>
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 flex gap-2 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="font-extrabold">GitHub</span>
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 flex gap-2 hover:text-white transition-colors"
            >
              <Facebook className="h-6 w-6" />
              <span className="font-extrabold">Facebook</span>
            </motion.a>
            <motion.a
              href="/feed"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 flex gap-2 hover:text-white transition-colors"
            >
              <Rss className="h-6 w-6" />
              <span className="font-extrabold">Feed</span>
            </motion.a>
          </div>

          <div className="text-gray-500 text-sm text-center">
            <p>© {new Date().getFullYear()} OpenPrinting. All rights reserved.</p>
            <p className="mt-1">Powered by Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
