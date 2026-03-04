"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Cpu, Box, GitBranch, Building2, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Real-time Sensor Fusion",
    desc: "Multi-parameter sensors continuously monitor pH, turbidity, TDS, ORP, and ammonia levels with sub-second response times.",
  },
  {
    icon: Box,
    title: "Compact Modular Design",
    desc: "Engineered to fit within standard apartment utility spaces. Each module can be serviced independently without system downtime.",
  },
  {
    icon: GitBranch,
    title: "Automated Routing System",
    desc: "AI-driven decision engine determines optimal water routing within 0.5 seconds, achieving 99.7% classification accuracy.",
  },
  {
    icon: Building2,
    title: "Scalable Installation",
    desc: "From single apartments to entire residential complexes. Modular architecture enables seamless scaling with zero redesign.",
  },
  {
    icon: BarChart3,
    title: "Continuous Monitoring Dashboard",
    desc: "Real-time analytics and predictive maintenance alerts. Monitor water quality, system health, and savings from any device.",
  },
]

export default function TechnologySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="technology" className="relative py-32 px-6">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/3 blur-[150px]" aria-hidden="true" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Technology
          </span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
            Engineered for the Future
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every component is designed for reliability, efficiency, and seamless
            integration into modern urban infrastructure.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass group rounded-2xl p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
