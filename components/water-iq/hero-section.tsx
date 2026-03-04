"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown, Zap, Shield, Cpu } from "lucide-react"
import TankVisualization from "./tank-visualization"

const badges = [
  { icon: Zap, label: "Real-time Analysis" },
  { icon: Shield, label: "99.7% Accuracy" },
  { icon: Cpu, label: "AI-Powered" },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Cinematic background */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Primary orb */}
        <div className="absolute -top-20 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/6 blur-[140px]" />
        {/* Secondary accent */}
        <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-accent/4 blur-[120px]" />
        {/* Deep left */}
        <div className="absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:gap-12">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Smart Greywater Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-heading)] text-5xl leading-[1.05] font-black tracking-tight text-foreground md:text-7xl lg:text-7xl xl:text-8xl text-balance"
          >
            The Future of{" "}
            <span className="relative inline-block">
              <span className="glow-text text-primary">Water</span>
            </span>
            <br />
            <span className="text-foreground/80">Starts Here.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
          >
            WATER-IQ transforms apartment greywater into a reusable resource—
            in real time, autonomously, intelligently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + i * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <b.icon className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <motion.a
              href="#solution"
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,212,255,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="glow-cyan rounded-xl bg-primary px-8 py-4 text-center text-sm font-bold text-primary-foreground transition-all"
            >
              Explore the System
            </motion.a>
            <motion.a
              href="#problem"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl border border-border bg-secondary/40 px-8 py-4 text-center text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              See the Problem
            </motion.a>
          </motion.div>
        </div>

        {/* Tank visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full"
        >
          <TankVisualization />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] text-muted-foreground/60 uppercase">Scroll</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border/50 p-1.5">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
