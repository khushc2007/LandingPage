"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Droplets, Banknote, Leaf, Building2 } from "lucide-react"
import AnimatedCounter from "./animated-counter"

const impacts = [
  {
    icon: Droplets,
    title: "Reduced Water Wastage",
    desc: "Reclaim up to 70% of household greywater for non-potable reuse, dramatically reducing municipal water demand.",
    stat: 70,
    suffix: "%",
    statLabel: "Water Reclaimed",
    color: "#00D4FF",
  },
  {
    icon: Banknote,
    title: "Lower Utility Costs",
    desc: "Significant reduction in water bills for residents and property managers through intelligent water recycling.",
    stat: 40,
    suffix: "%",
    statLabel: "Cost Reduction",
    color: "#00FFB2",
  },
  {
    icon: Leaf,
    title: "Urban Sustainability",
    desc: "Enable greener apartment living with zero additional effort from residents. The system operates fully autonomously.",
    stat: 2847,
    suffix: "L",
    statLabel: "Monthly Savings / Unit",
    color: "#00D4FF",
  },
  {
    icon: Building2,
    title: "Smart Infrastructure",
    desc: "Future-proof buildings with integrated water intelligence. Compatible with smart city management systems.",
    stat: 99,
    suffix: "%",
    statLabel: "System Uptime",
    color: "#00FFB2",
  },
]

export default function SustainabilitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0 water-shimmer" aria-hidden="true" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-widest text-accent uppercase">
            Impact
          </span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
            Sustainability at Scale
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every installation contributes to a more sustainable urban water ecosystem.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {impacts.map((impact, i) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass group rounded-2xl p-8 transition-all duration-300 hover:border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors"
                  style={{ backgroundColor: `${impact.color}15` }}
                >
                  <impact.icon className="h-6 w-6" style={{ color: impact.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{impact.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {impact.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                <AnimatedCounter
                  end={impact.stat}
                  suffix={impact.suffix}
                  label={impact.statLabel}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
