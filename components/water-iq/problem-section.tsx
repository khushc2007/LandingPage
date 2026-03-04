"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Droplets, WashingMachine, ShowerHead } from "lucide-react"
import AnimatedCounter from "./animated-counter"

const sources = [
  { icon: ShowerHead, label: "Showers", desc: "40% of daily water" },
  { icon: WashingMachine, label: "Washing Machines", desc: "25% of daily water" },
  { icon: Droplets, label: "Sinks", desc: "20% of daily water" },
]

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problem" className="relative py-32 px-6">
      {/* Water-like background motion */}
      <div className="pointer-events-none absolute inset-0 water-shimmer" aria-hidden="true" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            The Problem
          </span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Urban Apartments Waste Thousands of Liters of Water{" "}
            <span className="text-primary">Every Day</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Greywater from everyday activities is usually discarded even though a
            significant portion can be safely treated and reused.
          </p>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="glass glow-cyan rounded-2xl p-8">
            <AnimatedCounter
              end={70}
              suffix="%"
              label="Of household water becomes greywater"
            />
          </div>
          <div className="glass glow-cyan rounded-2xl p-8">
            <AnimatedCounter
              end={120}
              suffix="k+"
              label="Liters of greywater wasted daily per complex"
            />
          </div>
          <div className="glass glow-cyan rounded-2xl p-8">
            <AnimatedCounter
              end={30}
              suffix="+"
              label="Global cities already facing severe water stress"
            />
          </div>
        </motion.div>

        {/* Greywater sources */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {sources.map((source, i) => (
            <motion.div
              key={source.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              className="glass group flex items-center gap-4 rounded-xl p-6 transition-all hover:border-primary/30"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <source.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{source.label}</h3>
                <p className="text-sm text-muted-foreground">{source.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
