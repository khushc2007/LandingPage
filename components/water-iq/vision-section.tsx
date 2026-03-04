"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Droplets, ArrowRight, Globe, Sparkles } from "lucide-react"

const milestones = [
  { year: "2024", label: "WATER-IQ Prototype", desc: "First 5-stage treatment system validated" },
  { year: "2025", label: "Pilot Deployments", desc: "12 apartment buildings in metro areas" },
  { year: "2026", label: "Platform Launch", desc: "City-scale rollout with partner buildings" },
  { year: "2030", label: "Sustainable Cities", desc: "1M+ liters reused daily across the network" },
]

export default function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section id="vision" ref={containerRef} className="relative py-36 px-6 overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/4 blur-[120px]" />
        {/* Concentric ring ornament */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[200, 350, 500, 650, 800].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-primary/5"
              style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
              animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}
        </div>
      </motion.div>

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20"
            style={{ boxShadow: "0 0 60px rgba(0,212,255,0.15)" }}
          >
            <Droplets className="h-10 w-10 text-primary" />
          </motion.div>

          <div className="mb-5 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Our Vision</span>
          </div>

          <h2 className="font-[var(--font-heading)] text-5xl font-black text-foreground md:text-6xl lg:text-7xl text-balance leading-[1.02]">
            Every Drop.
            <br />
            <span className="text-primary glow-text">Rethought.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Intelligent greywater reuse will transform urban infrastructure.
            Every apartment building becomes a node in a smarter, self-sustaining city water network.
            WATER-IQ is the foundation.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.a
              href="#solution"
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(0,212,255,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="glow-cyan flex items-center gap-2 rounded-2xl bg-primary px-10 py-4 text-sm font-bold text-primary-foreground"
            >
              Start the Journey
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#problem"
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-10 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/30"
            >
              <Globe className="h-4 w-4" />
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Roadmap timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-28"
        >
          <h3 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Roadmap to Impact
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <motion.div
              className="absolute top-5 left-0 h-px bg-gradient-to-r from-primary to-accent"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "75%" } : {}}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
            />

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                  className="relative pt-10 text-center"
                >
                  <motion.div
                    className="absolute top-3.5 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                    style={{
                      borderColor: i < 3 ? "#00D4FF" : "#1A2E4A",
                      backgroundColor: i < 3 ? "#00D4FF" : "#0A1628",
                      boxShadow: i < 3 ? "0 0 12px rgba(0,212,255,0.5)" : "none",
                    }}
                    animate={i < 3 ? { boxShadow: ["0 0 8px rgba(0,212,255,0.3)", "0 0 20px rgba(0,212,255,0.6)", "0 0 8px rgba(0,212,255,0.3)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <div className="text-sm font-black text-primary">{m.year}</div>
                  <div className="mt-1 text-sm font-bold text-foreground">{m.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto mt-32 max-w-6xl border-t border-border/50 pt-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#" className="flex items-center gap-2.5 group">
            <Droplets className="h-6 w-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] transition-all" />
            <span className="font-[var(--font-heading)] text-base font-black text-foreground">WATER-IQ</span>
          </a>
          <p className="text-xs text-muted-foreground/70 text-center">
            Smart Greywater Intelligence · Building the future of urban water management
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-xs text-muted-foreground/60 transition-colors hover:text-primary">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
