"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ShowerHead, WashingMachine, Droplets, AlertTriangle, TrendingDown, Globe } from "lucide-react"
import AnimatedCounter from "./animated-counter"

const stats = [
  { end: 70, suffix: "%", label: "Of greywater is reusable", icon: TrendingDown, color: "#00D4FF" },
  { end: 350, suffix: "L", label: "Wasted per apartment daily", icon: Droplets, color: "#00FFB2" },
  { end: 2, suffix: "B+", label: "People in water-stressed regions", icon: Globe, color: "#00D4FF" },
]

const sources = [
  { icon: ShowerHead, label: "Showers", desc: "40% of daily water use", pct: 40 },
  { icon: WashingMachine, label: "Washing Machines", desc: "25% of daily water use", pct: 25 },
  { icon: Droplets, label: "Sinks & Basins", desc: "20% of daily water use", pct: 20 },
]

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section id="problem" ref={containerRef} className="relative py-36 px-6 overflow-hidden">
      {/* Animated background */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 water-shimmer opacity-60" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/3 blur-[120px]" />
      </motion.div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs font-bold tracking-[0.2em] text-destructive uppercase">
              The Problem
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-4xl font-black text-foreground md:text-5xl lg:text-6xl text-balance leading-tight">
            Urban Apartments Waste
            <br />
            <span className="text-primary glow-text">Thousands of Liters</span>
            <br />
            Every Single Day
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Greywater from showers, sinks, and washing machines is discarded daily—
            even though the majority can be safely treated and reused.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass glow-cyan rounded-2xl p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
              </div>
              <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>

        {/* Greywater sources with visual bars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center text-sm font-bold tracking-widest text-muted-foreground uppercase">
            Where Greywater Comes From
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sources.map((source, i) => (
              <motion.div
                key={source.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.12 }}
                className="glass group flex flex-col gap-4 rounded-2xl p-6 transition-all hover:border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <source.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{source.label}</h4>
                    <p className="text-xs text-muted-foreground">{source.desc}</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${source.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.9 + i * 0.12, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
