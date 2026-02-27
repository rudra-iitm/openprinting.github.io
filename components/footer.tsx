"use client"

import { motion } from "framer-motion"
import { Rss } from "lucide-react"
import { TwitterXIcon, GithubIcon, FacebookIcon, TelegramIcon } from "@/components/icons"

const links = [
  { icon: TwitterXIcon, label: "Twitter", href: "https://twitter.com" },
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/OpenPrinting" },
  { icon: TelegramIcon, label: "Telegram", href: "https://t.me/+RizBbjXz4uU2ZWM1" },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { icon: Rss, label: "Feed", href: "/feed" },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50/80 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-slate-200">OpenPrinting</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Open-source printing stack for Linux and Unix ecosystems.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {links.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white/75 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-cyan-500/50 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-cyan-300/50 dark:hover:text-cyan-200"
              >
                <Icon className="h-4 w-4" />
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-5 text-xs text-gray-400 dark:border-slate-800/70 dark:text-slate-500">
          © {new Date().getFullYear()} OpenPrinting. Built with Next.js and Tailwind CSS.
        </div>
      </div>
    </footer>
  )
}
