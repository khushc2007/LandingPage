"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Waves, Droplets, Activity, Filter, GitBranch } from "lucide-react"

const stages = [
  {
    id: 1, icon: Waves, title: "Mixing Chamber", subtitle: "Stage 01",
    desc: "Greywater enters a swirl chamber where a precision propeller stabilizes turbulent flow, ensuring uniform distribution for downstream processing.",
    color: "#00D4FF", metrics: ["Flow Rate: 12L/min", "Stabilization: 3s", "Turbulence: ±2%"],
  },
  {
    id: 2, icon: Droplets, title: "Oil Separation", subtitle: "Stage 02",
    desc: "Floating oils and soap residues are removed using a precision surface plate, eliminating up to 95% of surface contaminants before analysis.",
    color: "#00FFB2", metrics: ["Efficiency: 95%", "Soap Removal: 98%", "Cycle: 8s"],
  },
  {
    id: 3, icon: Activity, title: "Sensor Array", subtitle: "Stage 03",
    desc: "Five-parameter sensor array measures water quality including pH, turbidity, TDS, ORP, and ammonia levels simultaneously in real time.",
    color: "#00D4FF", metrics: ["pH ±0.01", "Turbidity ±0.5 NTU", "TDS ±5ppm", "ORP ±2mV", "NH₃ ±0.01"],
  },
  {
    id: 4, icon: Filter, title: "Membrane Filtration", subtitle: "Stage 04",
    desc: "Advanced dual-membrane barriers capture particulates and contaminants down to 0.1 microns, delivering clean pre-treated water for quality scoring.",
    color: "#00FFB2", metrics: ["Particle Capture: 99%", "Membrane Life: 2yr", "0.1μm rating"],
  },
  {
    id: 5, icon: GitBranch, title: "Intelligent Routing", subtitle: "Stage 05",
    desc: "The AI decision engine scores water quality in 0.5 seconds and routes it to storage for reuse or safely discards contaminated water.",
    color: "#00D4FF", metrics: ["Decision Time: 0.5s", "Accuracy: 99.7%", "False-safe: 0%"],
  },
]

export default function SystemBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const tankProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * stages.length), stages.length - 1)
      setActiveStage(index)
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    <section id="system" ref={containerRef} className="relative" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 lg:flex-row lg:items-center">

          {/* Tank diagram */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative h-[480px] w-[260px] md:h-[560px] md:w-[300px]">
              {/* Outer glow */}
              <div className="absolute inset-0 -z-10 rounded-3xl blur-3xl" style={{ backgroundColor: `${stages[activeStage].color}08` }} />

              {/* Tank shell */}
              <div className="absolute inset-0 rounded-3xl border border-primary/15 bg-gradient-to-b from-secondary/70 to-background/90 overflow-hidden">
                {/* Water level fill */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
                  style={{ height: tankProgress }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-primary/8 to-transparent" />
                  {/* Wave surface */}
                  <motion.svg
                    className="absolute -top-3 left-0 w-full"
                    viewBox="0 0 300 24"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      fill="rgba(0, 212, 255, 0.12)"
                      animate={{
                        d: [
                          "M0 12 Q37.5 4 75 12 T150 12 T225 12 T300 12 V24 H0 Z",
                          "M0 12 Q37.5 20 75 12 T150 12 T225 12 T300 12 V24 H0 Z",
                          "M0 12 Q37.5 4 75 12 T150 12 T225 12 T300 12 V24 H0 Z",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.svg>
                </motion.div>

                {/* Stage rows */}
                {stages.map((stage, i) => {
                  const yPos = 8 + i * 17
                  const isActive = activeStage === i
                  const isPast = activeStage > i
                  return (
                    <motion.div
                      key={stage.id}
                      className="absolute left-3 right-3 flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-colors duration-500"
                      style={{ top: `${yPos}%` }}
                      animate={{
                        backgroundColor: isActive ? `${stage.color}12` : isPast ? `${stage.color}05` : "transparent",
                        borderColor: isActive ? `${stage.color}35` : isPast ? `${stage.color}15` : "transparent",
                      }}
                    >
                      <motion.div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        animate={{
                          backgroundColor: isActive ? `${stage.color}25` : "rgba(255,255,255,0.03)",
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <stage.icon
                          className="h-4 w-4 transition-colors duration-500"
                          style={{ color: isActive ? stage.color : isPast ? `${stage.color}80` : "#2A4A6A" }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: isActive ? `${stage.color}90` : "#2A4A6A" }}>
                          {stage.subtitle}
                        </div>
                        <div
                          className="text-xs font-semibold truncate transition-colors duration-500"
                          style={{ color: isActive ? stage.color : isPast ? `${stage.color}60` : "#4A6A8A" }}
                        >
                          {stage.title}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: stage.color }}
                          animate={{ boxShadow: [`0 0 4px ${stage.color}60`, `0 0 12px ${stage.color}80`, `0 0 4px ${stage.color}60`] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  )
                })}

                {/* Flow arrows */}
                {stages.slice(0, -1).map((_, i) => {
                  const yPos = 8 + i * 17 + 14
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: `${yPos}%` }}
                      animate={{ opacity: activeStage > i ? 0.5 : 0.08 }}
                    >
                      <motion.svg
                        width="10" height="10" viewBox="0 0 10 10" fill="none"
                        animate={activeStage > i ? { y: [0, 4, 0] } : {}}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <path d="M5 1L5 9M5 9L2 6M5 9L8 6" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" />
                      </motion.svg>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Stage detail */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">System Breakdown</span>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-black text-foreground md:text-4xl lg:text-5xl">
                How WATER-IQ Works
              </h2>
            </motion.div>

            {/* Stage progress dots */}
            <div className="mb-8 flex items-center gap-2">
              {stages.map((s, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-500"
                  animate={{
                    width: activeStage === i ? 32 : 8,
                    backgroundColor: activeStage === i ? s.color : activeStage > i ? `${s.color}50` : "#1A2E4A",
                  }}
                />
              ))}
            </div>

            {/* Active stage card */}
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-8"
              style={{ borderColor: `${stages[activeStage].color}25`, boxShadow: `0 0 40px ${stages[activeStage].color}08` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${stages[activeStage].color}18` }}
                >
                  {(() => { const Icon = stages[activeStage].icon; return <Icon className="h-6 w-6" style={{ color: stages[activeStage].color }} /> })()}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: `${stages[activeStage].color}90` }}>
                    {stages[activeStage].subtitle}
                  </div>
                  <div className="mt-0.5 text-xl font-bold text-foreground">{stages[activeStage].title}</div>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {stages[activeStage].desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {stages[activeStage].metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-lg border px-3 py-1.5 text-xs font-medium"
                    style={{
                      borderColor: `${stages[activeStage].color}25`,
                      color: stages[activeStage].color,
                      backgroundColor: `${stages[activeStage].color}08`,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stage navigation hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1 }}
              className="mt-6 text-xs text-muted-foreground"
            >
              Scroll to advance through each stage ↓
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
