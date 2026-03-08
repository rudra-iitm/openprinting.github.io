"use client"

import { Search as SearchIcon } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

const navItems = [
  { name: "About Us", href: "/about-us" },
  { name: "News and Events", href: "/news" },
  { name: "Projects", href: "/projects" },
  { name: "Downloads", href: "/downloads" },
  { name: "Documentation", href: "/documentation" },
]

const hamburgerItems = [
  { name: "Upcoming Technologies", href: "/upcoming-technologies" },
  { name: "Driverless Printing", href: "/driverless" },
  { name: "Printers", href: "/printers" },
  { name: "Printer Drivers", href: "/drivers" },
  { name: "Legacy Printers under Windows", href: "/wsl-printer-app" },
  { name: "Contact Us", href: "/contact" },
  { name: "Donations", href: "/donations" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if (
        (isMac && event.metaKey && event.key.toLowerCase() === "k") ||
        (!isMac && event.ctrlKey && event.key.toLowerCase() === "k")
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-background border-b border-border",
        scrolled && "shadow-md"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" prefetch={false} className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src={`${basePath}/openprinting.png`}
                  alt="OpenPrinting Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold text-foreground"
              >
                OpenPrinting
              </motion.span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={item.href} prefetch={false} className="text-foreground hover:text-primary transition-colors duration-200">
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button
                onClick={() => setSearchOpen(true)}
                variant="outline"
                className="rounded-full text-white/80 border-gray-400 bg-transparent px-4 py-2 font-semibold hover:bg-white/10 hover:border-white hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
              >
                <SearchIcon className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Search</span>
              </Button>
            </motion.div>

            <div className="hidden lg:flex items-center gap-3 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary border-2 border-cyan-500"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-16 right-0 w-64 bg-background border border-cyan-500 rounded-lg overflow-hidden z-40"
                  >
                    <div className="flex flex-col">
                      {hamburgerItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          prefetch={false}
                          className="px-6 py-4 text-foreground hover:text-primary border-b border-gray-600 last:border-b-0 hover:bg-white/5 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger - Shows ALL items */}
            <div className="lg:hidden flex items-center gap-3 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-foreground hover:text-primary border-2 border-cyan-500"
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              <AnimatePresence>
                {isMobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-16 right-0 w-64 bg-background border border-cyan-500 rounded-lg overflow-hidden z-40 max-h-96 overflow-y-auto"
                  >
                    <div className="flex flex-col">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          prefetch={false}
                          className="px-6 py-4 text-foreground hover:text-primary border-b border-gray-600 hover:bg-white/5 transition-colors"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {hamburgerItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          prefetch={false}
                          className="px-6 py-4 text-foreground hover:text-primary border-b border-gray-600 last:border-b-0 hover:bg-white/5 transition-colors"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  )
}
