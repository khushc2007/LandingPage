"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Droplets, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Problem",     href: "#problem"     },
  { label: "Solution",    href: "#solution"    },
  { label: "3D Model",    href: "#tank"         },
  { label: "System",      href: "#system"      },
  { label: "Dashboard",   href: "#dashboard"   },
  { label: "Applications",href: "#applications"},
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeSection,  setActiveSection]  = useState("")

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = navLinks.map(l => l.href.replace("#", ""))
      for (const s of ids.slice().reverse()) {
        const el = document.getElementById(s)
        if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(s); break }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, #00D4FF, #00FFB2, #00D4FF)" }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong py-3 shadow-[0_1px_0_rgba(0,212,255,0.12)]"
            : "py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <a href="#" className="group flex items-center gap-2.5">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Droplets className="h-7 w-7 text-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
            </motion.div>
            <span className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors"
              style={{ fontFamily: "'Orbitron', monospace" }}>
              WATER·IQ
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const id       = link.href.replace("#", "")
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.a
              href="#tank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(0,212,255,0.25)] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.45)]"
            >
              View 3D Model
            </motion.a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-primary"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#tank"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="mt-3 rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  View 3D Model
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
