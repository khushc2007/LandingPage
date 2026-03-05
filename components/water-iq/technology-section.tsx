"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Cpu, Box, GitBranch, Building2, BarChart3, Sparkles } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Real-time Sensor Fusion",
    desc: "Multi-parameter sensors continuously monitor pH, turbidity, TDS, ORP, and ammonia levels with sub-second response times.",
    color: "#00D4FF",
    stat: "5 sensors",
  },
  {
    icon: Box,
    title: "Compact Modular Design",
    desc: "Engineered to fit within standard apartment utility spaces. Each module can be serviced independently without system downtime.",
    color: "#00FFB2",
    stat: "< 0.8m²",
  },
  {
    icon: GitBranch,
    title: "Automated Routing System",
    desc: "AI-driven decision engine determines optimal water routing within 0.5 seconds, achieving 99.7% classification accuracy.",
    color: "#00D4FF",
    stat: "99.7% acc.",
  },
  {
    icon: Building2,
    title: "Scalable Installation",
    desc: "From single apartments to entire residential complexes. Modular architecture enables seamless scaling with zero redesign.",
    color: "#00FFB2",
    stat: "10–10k units",
  },
  {
    icon: BarChart3,
    title: "Continuous Monitoring",
    desc: "Real-time analytics and predictive maintenance alerts. Monitor water quality, system health, and savings from any device.",
    color: "#00D4FF",
    stat: "24/7 uptime",
  },
  {
    icon: Sparkles,
    title: "AI Predictive Maintenance",
    desc: "Machine learning models detect performance degradation before failures occur, reducing downtime and maintenance costs.",
    color: "#00FFB2",
    stat: "–40% costs",
  },
]

export default function TechnologySection() {
  const ref    = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="technology" className="relative py-32 px-6 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/4 blur-[150px]" />
        <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-primary uppercase">
            Technology
          </span>
          <h2 className="mt-4 text-4xl font-black text-foreground md:text-5xl leading-tight">
            Engineered for the Future
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Every component is designed for reliability, efficiency, and seamless
            integration into modern urban infrastructure.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card group p-7"
            >
              {/* Icon + stat row */}
              <div className="mb-5 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                  style={{ background: `${f.color}14` }}
                >
                  <f.icon className="h-6 w-6 transition-colors" style={{ color: f.color }} />
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: `${f.color}12`, color: f.color }}
                >
                  {f.stat}
                </span>
              </div>

              <h3 className="mb-3 text-base font-bold text-foreground group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${f.color}66, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
