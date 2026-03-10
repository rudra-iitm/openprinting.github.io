"use client"

import { useEffect } from "react"

export default function CupsPage() {
  useEffect(() => {
    window.location.href = "https://openprinting.github.io/cups/"
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-4">CUPS</h1>
      <p className="text-muted-foreground">
        Redirecting to the OpenPrinting CUPS page…
      </p>
    </main>
  )
}

