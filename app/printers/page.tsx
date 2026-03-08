"use client"

import { useEffect } from "react"

export default function PrintersPage() {
  useEffect(() => {
    window.location.href = "https://openprinting.org/printers"
  }, [])
  
  return (
    <main className="min-h-screen bg-background text-foreground container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
      <p className="text-muted-foreground">
        Redirecting to OpenPrinting Printers database...
      </p>
    </main>
  );
}
