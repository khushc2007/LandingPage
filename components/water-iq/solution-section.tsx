"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Zap, RotateCcw, Minimize2, TrendingUp, ArrowRight } from "lucide-react"
import ScrollReveal from "./animations/scroll-reveal"
import StaggerReveal from "./animations/stagger-reveal"
import GlassCard from "./ui/glass-card"
import GlowButton from "./ui/glow-button"

const features = [
  { icon: Zap,        val: "Real-time",  desc: "Continuous water quality analysis",  color: "#00D4FF" },
  { icon: RotateCcw,  val: "Autonomous", desc: "Self-routing without human input",   color: "#00FFB2" },
  { icon: Minimize2,  val: "Compact",    desc: "Fits any apartment building",         color: "#00D4FF" },
  { icon: TrendingUp, val: "Scalable",   desc: "From 10 to 10,000 units",            color: "#00FFB2" },
]

export default function SolutionSection() {
  const ref          = useRef<HTMLDivElement>(null)
  const isInView     = useInView(ref, { once: true, margin: "-80px" })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])

  return (
    <section id="solution" ref={containerRef} className="relative py-36 px-6 overflow-hidden">
      <motion.div style={{ x }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-accent/4 blur-[100px]" />
      </motion.div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row">

          {/* ── Text side ── */}
          <div className="flex-1 order-2 lg:order-1">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-accent uppercase">
                The Solution
              </span>

              <h2 className="mt-6 text-4xl font-black text-foreground md:text-5xl lg:text-6xl leading-tight">
                WATER·IQ:<br />
                <span className="text-primary glow-text">Smart Greywater</span><br />
                Intelligence
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                WATER·IQ analyzes greywater in real time using multi-parameter sensors,
                then autonomously decides whether to reuse or safely discard it —
                all within a compact smart treatment system.
              </p>
            </ScrollReveal>

            {/* Feature cards — GlassCard primitives */}
            <StaggerReveal className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2" baseDelay={0.2}>
              {features.map((f) => (
                <GlassCard key={f.val} className="flex items-center gap-4 p-4" glowColor={f.color === "#00D4FF" ? "cyan" : "emerald"}>
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${f.color}14` }}
                  >
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: f.color }}>{f.val}</div>
                    <div className="text-xs text-muted-foreground">{f.desc}</div>
                  </div>
                </GlassCard>
              ))}
            </StaggerReveal>

            <ScrollReveal delay={0.5}>
              <GlowButton href="#tank" variant="secondary" className="mt-8 rounded-full px-6 py-3 text-sm">
                See the 3D model
                <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </ScrollReveal>
          </div>

          {/* ── Visual side — glass stats panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.92 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full order-1 lg:order-2"
          >
            <div className="glass-panel p-8">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">System Overview</div>
                  <div className="text-lg font-bold text-foreground">WATER·IQ Unit A1</div>
                </div>
                <div className="flex items-center gap-2 rounded-full glass-btn px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-xs text-accent">Active</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Filtration Eff.", val: "98.7%", color: "#00D4FF", bar: 0.987 },
                  { label: "Reuse Rate",      val: "73%",   color: "#00FFB2", bar: 0.73  },
                  { label: "AI Accuracy",     val: "99.7%", color: "#00D4FF", bar: 0.997 },
                  { label: "Uptime",          val: "24/7",  color: "#00FFB2", bar: 1.0   },
                ].map((m) => (
                  <div key={m.label} className="glass-inset p-4">
                    <div className="text-[10px] uppercase tracking-widest text-white/35 mb-2">{m.label}</div>
                    <div className="font-mono text-xl font-bold mb-2" style={{ color: m.color }}>{m.val}</div>
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.bar * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${m.color}88, ${m.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Water saved */}
              <div className="glass-inset p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-2xl font-black text-primary">2,847L</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Water saved this month</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
