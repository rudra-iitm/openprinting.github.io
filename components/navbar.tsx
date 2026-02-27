"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GithubIcon } from "@/components/icons"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : ""

const navItems = [
  // { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Projects", href: "#projects" },
  { name: "Downloads", href: "#downloads" },
  { name: "Docs", href: "#documentation" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hiddenOnScrollUp, setHiddenOnScrollUp] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current

      setScrolled(currentScrollY > 10)

      if (isOpen || currentScrollY < 80) {
        setHiddenOnScrollUp(false)
      } else {
        setHiddenOnScrollUp(isScrollingDown)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        hiddenOnScrollUp ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
        scrolled ? "pt-2" : "pt-4",
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 md:px-6",
            scrolled
              ? "border-gray-200 bg-white/85 shadow-lg backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-950/85 dark:shadow-[0_10px_45px_rgba(2,6,23,0.45)]"
              : "border-gray-200/60 bg-white/55 backdrop-blur-sm dark:border-slate-600/45 dark:bg-slate-950/55",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image src={`${basePath}/openprinting.png`} alt="OpenPrinting Logo" width={34} height={34} className="object-contain" />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="text-base font-semibold tracking-wide text-gray-900 dark:text-slate-100 md:text-lg"
            >
              OpenPrinting
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.06 }}
              >
                <Link href={item.href} className="text-sm font-medium text-gray-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-200">
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
            <a
              href="https://github.com/OpenPrinting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((open) => !open)}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="container mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white/95 backdrop-blur dark:border-slate-700/80 dark:bg-slate-950/95"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.16, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800/85 dark:hover:text-slate-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
