"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import TankVisualization from "./tank-visualization"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-8">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
              Smart Greywater Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 font-[var(--font-heading)] text-5xl leading-tight font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance"
          >
            Reimagining{" "}
            <span className="glow-text text-primary">Water Use</span>{" "}
            in Modern Cities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
          >
            Real-time greywater analysis and intelligent routing for a sustainable
            urban future. Compact. Autonomous. Revolutionary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#solution"
              className="glow-cyan rounded-xl bg-primary px-8 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Explore the System
            </a>
            <a
              href="#technology"
              className="rounded-xl border border-border bg-secondary/50 px-8 py-3.5 text-center text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              View Technology
            </a>
          </motion.div>
        </div>

        {/* Tank visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1"
        >
          <TankVisualization />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Scroll to Explore
          </span>
          <ChevronDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
