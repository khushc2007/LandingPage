"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Cpu, Radio, GitMerge, BarChart3 } from "lucide-react"

const techs = [
  {
    icon: Cpu, title: "Edge AI Engine", color: "#00D4FF",
    desc: "On-device machine learning processes sensor data locally at sub-second speed—no cloud dependency required.",
  },
  {
    icon: Radio, title: "5-Parameter Sensor Fusion", color: "#00FFB2",
    desc: "pH, turbidity, TDS, ORP, and ammonia sensors feed a unified quality score engine in real time.",
  },
  {
    icon: GitMerge, title: "Adaptive Routing Logic", color: "#00D4FF",
    desc: "A dual-valve decision tree routes water in 0.5 seconds, eliminating false-safe errors entirely.",
  },
  {
    icon: BarChart3, title: "Predictive Maintenance AI", color: "#00FFB2",
    desc: "Usage patterns predict membrane replacement windows and system degradation 2 weeks in advance.",
  },
]

export default function TechnologyReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05])

  return (
    <section id="technology" ref={containerRef} className="relative py-36 px-6 overflow-hidden">
      <motion.div style={{ scale: bgScale }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,212,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[140px]" />
      </motion.div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Core Technology</span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-black text-foreground md:text-5xl lg:text-6xl text-balance">
            Engineered for
            <br />
            <span className="text-primary glow-text">Precision Intelligence</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Four breakthrough technologies working in concert to deliver the most accurate greywater treatment system ever built.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass group rounded-2xl p-7 transition-all hover:border-primary/25"
            >
              <div className="flex items-start gap-5">
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all"
                  style={{ backgroundColor: `${tech.color}12` }}
                  whileHover={{ scale: 1.08, backgroundColor: `${tech.color}22` }}
                >
                  <tech.icon className="h-7 w-7" style={{ color: tech.color }} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{tech.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tech.desc}</p>
                </div>
              </div>
              <motion.div
                className="mt-5 h-px w-full"
                style={{ background: `linear-gradient(to right, ${tech.color}30, transparent)` }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.12 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
