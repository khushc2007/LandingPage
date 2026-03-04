"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Zap, RotateCcw, Minimize2, TrendingUp, ArrowRight } from "lucide-react"
import TankVisualization from "./tank-visualization"

const features = [
  { icon: Zap, val: "Real-time", desc: "Continuous water quality analysis", color: "#00D4FF" },
  { icon: RotateCcw, val: "Autonomous", desc: "Self-routing without human input", color: "#00FFB2" },
  { icon: Minimize2, val: "Compact", desc: "Fits any apartment building", color: "#00D4FF" },
  { icon: TrendingUp, val: "Scalable", desc: "From 10 to 10,000 units", color: "#00FFB2" },
]

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])

  return (
    <section id="solution" ref={containerRef} className="relative py-36 px-6 overflow-hidden">
      <motion.div style={{ x }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/4 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/3 blur-[100px]" />
      </motion.div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-20 lg:flex-row">
          {/* Text side */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1.5 text-xs font-bold tracking-widest text-accent uppercase">
                The Solution
              </span>
              <h2 className="mt-5 font-[var(--font-heading)] text-4xl font-black text-foreground md:text-5xl lg:text-6xl text-balance leading-tight">
                WATER-IQ:
                <br />
                <span className="text-primary glow-text">Smart Greywater</span>
                <br />
                Intelligence
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                WATER-IQ analyzes greywater in real time using multi-parameter sensors,
                then autonomously decides whether to reuse or safely discard it—
                all within a compact smart treatment system.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((f, i) => (
                  <motion.div
                    key={f.val}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="glass group flex items-center gap-4 rounded-xl p-4 transition-all hover:border-primary/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors"
                      style={{ backgroundColor: `${f.color}12` }}>
                      <f.icon className="h-5 w-5" style={{ color: f.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: f.color }}>{f.val}</div>
                      <div className="text-xs text-muted-foreground">{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#system"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                See how it works
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* Tank side */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.92 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full order-1 lg:order-2"
          >
            <TankVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
