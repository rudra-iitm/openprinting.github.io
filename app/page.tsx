import HeroSection from "@/components/hero-section"
import InfoSection from "@/components/info-section"
import ProjectsSection from "@/components/projects-section"
import NewsSection from "@/components/news-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <NewsSection />
      <InfoSection />
      <ProjectsSection />
      <Footer />
    </main>
  )
}
