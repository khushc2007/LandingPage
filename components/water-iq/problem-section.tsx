"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ShowerHead, WashingMachine, Droplets, AlertTriangle, TrendingDown, Globe } from "lucide-react"
import AnimatedCounter from "./animated-counter"
import ScrollReveal from "./animations/scroll-reveal"
import StaggerReveal from "./animations/stagger-reveal"
import GlassCard from "./ui/glass-card"

const stats = [
  { end: 70,  suffix: "%",  label: "Of greywater is reusable",          icon: TrendingDown, color: "#00D4FF" },
  { end: 350, suffix: "L",  label: "Wasted per apartment daily",         icon: Droplets,     color: "#00FFB2" },
  { end: 2,   suffix: "B+", label: "People in water-stressed regions",   icon: Globe,        color: "#00D4FF" },
]

const sources = [
  { icon: ShowerHead,     label: "Showers",          desc: "40% of daily water use", pct: 40 },
  { icon: WashingMachine, label: "Washing Machines",  desc: "25% of daily water use", pct: 25 },
  { icon: Droplets,       label: "Sinks & Basins",    desc: "20% of daily water use", pct: 20 },
]

export default function ProblemSection() {
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

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal className="text-center">
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
        </ScrollReveal>

        {/* Stats — GlassCard primitives */}
        <StaggerReveal className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3" baseDelay={0.15}>
          {stats.map((stat) => (
            <GlassCard key={stat.label} glowColor={stat.color === "#00D4FF" ? "cyan" : "emerald"} className="rounded-2xl p-8 text-center">
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
              </div>
              <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </GlassCard>
          ))}
        </StaggerReveal>

        {/* Greywater sources */}
        <ScrollReveal delay={0.3} className="mt-16">
          <h3 className="mb-8 text-center text-sm font-bold tracking-widest text-muted-foreground uppercase">
            Where Greywater Comes From
          </h3>
          <StaggerReveal className="grid grid-cols-1 gap-4 md:grid-cols-3" baseDelay={0.1}>
            {sources.map((source) => (
              <GlassCard key={source.label} className="group flex flex-col gap-4 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <source.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{source.label}</h4>
                    <p className="text-xs text-muted-foreground">{source.desc}</p>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${source.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </GlassCard>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </div>
    </section>
  )
}
