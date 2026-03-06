"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Waves, Droplets, Activity, Filter, GitBranch } from "lucide-react"

const stages = [
  {
    id: 1,
    icon: Waves,
    title: "Mixing Chamber",
    subtitle: "Stage 1",
    desc: "Greywater enters a swirl chamber where a propeller stabilizes the flow, ensuring uniform distribution for downstream processing.",
    color: "#00D4FF",
    metrics: ["Flow Rate: 12L/min", "Stabilization: 3s"],
  },
  {
    id: 2,
    icon: Droplets,
    title: "Oil Separation",
    subtitle: "Stage 2",
    desc: "Floating oils and soap residues are separated using a precision surface plate, removing up to 95% of surface contaminants.",
    color: "#00FFB2",
    metrics: ["Efficiency: 95%", "Soap Removal: 98%"],
  },
  {
    id: 3,
    icon: Activity,
    title: "Sensor Monitoring",
    subtitle: "Stage 3",
    desc: "Multi-parameter sensors measure water quality including pH, turbidity, TDS, ORP, and ammonia levels in real time.",
    color: "#00D4FF",
    metrics: ["pH", "Turbidity", "TDS", "ORP", "Ammonia"],
  },
  {
    id: 4,
    icon: Filter,
    title: "Residue Separation",
    subtitle: "Stage 4",
    desc: "Advanced membrane barriers capture larger contaminants and particulates, producing clean filtered water ready for quality assessment.",
    color: "#00FFB2",
    metrics: ["Particle Capture: 99%", "Membrane Life: 2yr"],
  },
  {
    id: 5,
    icon: GitBranch,
    title: "Smart Routing",
    subtitle: "Stage 5",
    desc: "The intelligent system decides whether water meets reuse standards and routes it to storage or safely discards contaminated water.",
    color: "#00D4FF",
    metrics: ["Decision Time: 0.5s", "Accuracy: 99.7%"],
  },
]

export default function SystemBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * stages.length), stages.length - 1)
      setActiveStage(index)
    })
    return unsubscribe
  }, [scrollYProgress])

  const tankProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section id="system" ref={containerRef} className="relative" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
          {/* Tank diagram */}
          <div className="flex-1">
            <div className="relative mx-auto h-[450px] w-[280px] md:h-[550px] md:w-[320px]">
              {/* Tank shell */}
              <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-gradient-to-b from-secondary/60 to-background/80">
                {/* Progress fill */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-primary/15 to-transparent"
                  style={{ height: tankProgress }}
                />

                {/* Stage indicators inside tank */}
                {stages.map((stage, i) => {
                  const yPos = 10 + i * 18
                  const isActive = activeStage === i
                  return (
                    <motion.div
                      key={stage.id}
                      className="absolute left-4 right-4 flex items-center gap-3 rounded-lg p-2 transition-all duration-500"
                      style={{ top: `${yPos}%` }}
                      animate={{
                        backgroundColor: isActive
                          ? `${stage.color}15`
                          : "transparent",
                        borderColor: isActive ? `${stage.color}40` : "transparent",
                      }}
                    >
                      <motion.div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                        animate={{
                          backgroundColor: isActive
                            ? `${stage.color}25`
                            : "rgba(255,255,255,0.03)",
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <stage.icon
                          className="h-4 w-4 transition-colors duration-500"
                          style={{ color: isActive ? stage.color : "#6B8AAE" }}
                        />
                      </motion.div>
                      <span
                        className="text-xs font-medium transition-colors duration-500"
                        style={{ color: isActive ? stage.color : "#6B8AAE" }}
                      >
                        {stage.title}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto h-2 w-2 rounded-full"
                          style={{ backgroundColor: stage.color }}
                          animate={{
                            boxShadow: [
                              `0 0 5px ${stage.color}60`,
                              `0 0 15px ${stage.color}80`,
                              `0 0 5px ${stage.color}60`,
                            ],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  )
                })}

                {/* Flow arrows */}
                {stages.slice(0, -1).map((_, i) => {
                  const yPos = 10 + i * 18 + 12
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: `${yPos}%` }}
                      animate={{
                        opacity: activeStage >= i ? 0.6 : 0.1,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1L6 11M6 11L2 7M6 11L10 7" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  )
                })}
              </div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/5 blur-3xl" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center lg:text-left"
            >
              <span className="text-xs font-medium tracking-widest text-primary uppercase">
                System Breakdown
              </span>
              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl text-balance">
                How WATER-IQ Works
              </h2>
            </motion.div>

            {/* Active stage card */}
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass glow-cyan mt-8 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${stages[activeStage].color}20` }}
                >
                  {(() => {
                    const Icon = stages[activeStage].icon
                    return <Icon className="h-5 w-5" style={{ color: stages[activeStage].color }} />
                  })()}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{stages[activeStage].subtitle}</div>
                  <div className="text-lg font-semibold text-foreground">{stages[activeStage].title}</div>
                </div>
              </div>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {stages[activeStage].desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {stages[activeStage].metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border px-3 py-1 text-xs"
                    style={{
                      borderColor: `${stages[activeStage].color}30`,
                      color: stages[activeStage].color,
                      backgroundColor: `${stages[activeStage].color}08`,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stage dots */}
            <div className="mt-6 flex justify-center gap-2 lg:justify-start">
              {stages.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded-full transition-all duration-500"
                  animate={{
                    width: activeStage === i ? 24 : 8,
                    backgroundColor: activeStage === i ? "#00D4FF" : "#1A2E4A",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
