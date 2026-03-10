"use client"

import { useEffect } from "react"

export default function PrintersPage() {
  useEffect(() => {
    window.location.href = "/foomatic"
  }, [])

  return null
}
