"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import TankVisualization from "./tank-visualization"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -40])
  const tankScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute bottom-[-10%] right-[-10%] h-[480px] w-[480px] rounded-full bg-accent/10 blur-[140px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Tank visualization as the cinematic center */}
        <motion.div
          style={{ scale: tankScale }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex-1 lg:order-1"
        >
          <div className="relative mx-auto flex max-w-sm items-center justify-center">
            <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-b from-primary/15 via-secondary/40 to-background/90 blur-3xl" />
            <div className="relative w-full rounded-[32px] border border-primary/20 bg-gradient-to-b from-secondary/60 via-background/80 to-background/95 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
              <TankVisualization />
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex-1 text-center lg:order-2 lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,178,0.6)]" />
              Live Greywater Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-6 font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl text-balance"
          >
            Water Intelligence for the{" "}
            <span className="glow-text text-primary">Next Generation</span>{" "}
            of Cities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl"
          >
            WATER-IQ is a smart greywater treatment system engineered for
            apartment buildings. It analyzes every liter in real time and
            intelligently routes water for reuse or safe discharge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#solution"
              className="glow-cyan rounded-xl bg-primary px-8 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
            >
              Explore the System
            </a>
            <a
              href="#dashboard"
              className="rounded-xl border border-border bg-secondary/60 px-8 py-3.5 text-center text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              View Live Monitoring
            </a>
          </motion.div>
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
