"use client"

import { useEffect } from "react"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a[href^='#']")
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || href === "#") return
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const navHeight = 80
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: "smooth" })
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return <>{children}</>
}
