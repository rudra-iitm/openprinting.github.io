"use client"

import { useEffect } from "react"
import HeroSection from "@/components/hero-section"
import InfoSection from "@/components/info-section"
import ProjectsSection from "@/components/projects-section"
import NewsSection from "@/components/news-section"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        // @ts-expect-error: 'this' is expected to be an HTMLAnchorElement
        const href = this.getAttribute("href")
        if (!href) return

        const targetElement = document.querySelector(href)
        if (!targetElement) return

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      })
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", () => {})
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <NewsSection />
      <InfoSection />
      <ProjectsSection />
      <Footer />
    </main>
  )
}
