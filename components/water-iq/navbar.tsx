"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Droplets, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Problem",      href: "#problem"      },
  { label: "Solution",     href: "#solution"     },
  { label: "3D Model",     href: "#tank"          },
  { label: "System",       href: "#system"       },
  { label: "Dashboard",    href: "#dashboard"    },
  { label: "Applications", href: "#applications" },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState("")

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
      {/* Scroll progress line — neon gradient */}
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
            ? "glass-strong border-b border-primary/10 py-3 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Droplets className="h-6 w-6 text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.6)] transition-all duration-300" />
            </motion.div>
            <span
              className="text-base font-black text-foreground tracking-tight"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              WATER·IQ
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </motion.a>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#solution"
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(0,212,255,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="wiq-glow-btn wiq-glow-btn-primary rounded-full px-5 py-2.5 text-xs"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl glass-btn"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-4 w-4 text-foreground" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-4 w-4 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden glass-strong border-t border-primary/10"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-primary/8 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#solution"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl bg-primary/15 border border-primary/25 px-4 py-3 text-center text-sm font-bold text-primary"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
