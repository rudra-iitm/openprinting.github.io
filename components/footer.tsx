"use client"

import Link from "next/link"
import { Github, Twitter, Facebook, Rss } from "lucide-react"

const footerLinks = {
  "Quick Links": [
    { name: "About Us", href: "/about-us" },
    { name: "Projects", href: "/projects" },
    { name: "News and Events", href: "/news" },
    { name: "Downloads", href: "/downloads" },
    { name: "Documentation", href: "/documentation" },
  ],
  Community: [
    { name: "GitHub", href: "https://github.com/OpenPrinting" },
    { name: "Google Summer of Code", href: "/gsoc" },
    { name: "Google Season of Docs", href: "/gsod" },
    { name: "Contribute", href: "/contribute" },
  ],
  Resources: [
    { name: "CUPS", href: "/cups" },
    { name: "Printer Database", href: "/printers" },
    { name: "Printer Working Group", href: "https://www.pwg.org/ipp/" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://x.com/open_printing", label: "Twitter" },
  { icon: Github, href: "https://github.com/OpenPrinting", label: "GitHub" },
  { icon: Facebook, href: "https://www.facebook.com/sharer/sharer.php?u=https://openprinting.github.io/", label: "Facebook" },
  { icon: Rss, href: "/feed.xml", label: "RSS Feed" },
]

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-black border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">OpenPrinting</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Making printing just work on Linux, Unix, and other operating systems through open-source technology.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.label === "RSS Feed" ? `${basePath}${social.href}` : social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OpenPrinting. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
