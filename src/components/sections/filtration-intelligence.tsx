"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { WaterQualityIndicator } from "@/src/components/visualizations/water-quality-indicator"
import { GlassPanel } from "@/src/components/ui/glass-panel"

const categories = [
  {
    id: "F1",
    label: "Minimal Contamination",
    level: 15,
    color: "#00FFB2",
    desc: "Nearly clean water. Safe for immediate reuse in non-potable applications.",
    bg: "#00FFB210",
  },
  {
    id: "F2",
    label: "Moderate Suspended Particles",
    level: 35,
    color: "#00D4FF",
    desc: "Light particulate matter detected. Quick filtration enables full reuse.",
    bg: "#00D4FF10",
  },
  {
    id: "F3",
    label: "Heavy Suspended Particles",
    level: 55,
    color: "#FFB800",
    desc: "Significant particulates present. Multi-stage treatment required before reuse.",
    bg: "#FFB80010",
  },
  {
    id: "F4",
    label: "High Dissolved Contaminants",
    level: 75,
    color: "#FF6B35",
    desc: "Elevated chemical levels. Advanced membrane filtration applied before routing.",
    bg: "#FF6B3510",
  },
  {
    id: "F5",
    label: "Unsafe Water",
    level: 95,
    color: "#FF4D4D",
    desc: "Contamination exceeds treatment capacity. Safely routed to discard line.",
    bg: "#FF4D4D10",
  },
]

export default function FiltrationIntelligence() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="relative py-32 px-6">
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Filtration Intelligence
          </span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
            Water Quality Classification
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Real-time classification determines the optimal treatment path for every
            liter of greywater.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col gap-8 lg:flex-row">
          {/* Category selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-3 lg:w-72"
          >
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-3 rounded-xl p-4 text-left transition-all ${activeCategory === i
                    ? "glass-strong border-l-2"
                    : "hover:bg-secondary/30"
                  }`}
                style={{
                  borderLeftColor:
                    activeCategory === i ? cat.color : "transparent",
                }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  style={{
                    backgroundColor: cat.bg,
                    color: cat.color,
                  }}
                >
                  {cat.id}
                </span>
                <span
                  className="text-sm font-medium transition-colors"
                  style={{
                    color: activeCategory === i ? cat.color : "#6B8AAE",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Active category display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1"
          >
            <GlassPanel intensity="heavy" className="p-8">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: categories[activeCategory].color }}
                  >
                    {categories[activeCategory].id}
                  </span>
                  <span className="text-lg font-medium text-foreground">
                    {categories[activeCategory].label}
                  </span>
                </div>

                <p className="mt-4 text-muted-foreground">
                  {categories[activeCategory].desc}
                </p>

                {/* Score Indicator */}
                <div className="mt-8">
                  <WaterQualityIndicator score={100 - categories[activeCategory].level} />
                </div>

                {/* Animated routing flow */}
                <div className="mt-10">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Routing Diagram
                  </div>
                  <div className="mt-4 flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <span>Inlet Greywater</span>
                    </div>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 md:block" />
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>Classification Engine</span>
                    </div>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40 md:block" />
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase text-primary">
                        Reuse Storage
                      </span>
                      <span className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-[10px] font-semibold uppercase text-accent">
                        Treatment Loop
                      </span>
                      <span className="flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-destructive">
                        Safe Discharge
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary via-accent to-destructive"
                      animate={{ x: ["-10%", "120%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
