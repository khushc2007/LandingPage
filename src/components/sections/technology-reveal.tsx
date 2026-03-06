"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Droplets, Workflow, Gauge, Layers3, RefreshCw } from "lucide-react"

const layers = [
  {
    id: "inlet",
    icon: Droplets,
    title: "Inlet Oil Separator",
    subtitle: "Layer 01",
    desc: "Removes floating oils, soaps, and surface contaminants as greywater enters the system.",
  },
  {
    id: "swirl",
    icon: RefreshCw,
    title: "Swirl Mixing Chamber",
    subtitle: "Layer 02",
    desc: "A precision propeller creates a controlled vortex, homogenizing flow for consistent treatment.",
  },
  {
    id: "sensors",
    icon: Gauge,
    title: "Sensor Monitoring Chamber",
    subtitle: "Layer 03",
    desc: "Multi-parameter probes continuously measure pH, TDS, turbidity, ORP, and ammonia in real time.",
  },
  {
    id: "residue",
    icon: Layers3,
    title: "Residue Separation Chamber",
    subtitle: "Layer 04",
    desc: "Membrane and media filters extract suspended solids and residues with high capture efficiency.",
  },
  {
    id: "pump",
    icon: Workflow,
    title: "Pump Routing Chamber",
    subtitle: "Layer 05",
    desc: "Intelligent pumps route treated water to reuse storage or safe discharge based on quality.",
  },
]

export default function TechnologyReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const stackOffset = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section id="reveal" className="relative py-32 px-6">
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center"
      >
        {/* Copy */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Technology Reveal
            </span>
            <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
              A Modular Tank Engineered
              <span className="block text-primary">Layer by Layer</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground lg:mx-0">
              Scroll to separate the WATER-IQ tank into its core treatment layers.
              Each module is independently serviceable while operating as a single,
              intelligent system.
            </p>
          </motion.div>
        </div>

        {/* Layer stack */}
        <div className="relative flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto h-[520px] w-full max-w-[360px]"
          >
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-secondary/80 via-background/90 to-background/95 shadow-[0_40px_120px_rgba(0,0,0,0.85)]" />

            {layers.map((layer, index) => {
              const baseY = 10 + index * 16
              const direction = index - (layers.length - 1) / 2
              const separation = useTransform(
                stackOffset,
                [0, 80],
                [0, direction * 26],
              )

              return (
                <motion.div
                  key={layer.id}
                  className="absolute left-1/2 w-11/12 max-w-[320px] -translate-x-1/2"
                  style={{ top: `${baseY}%`, y: separation }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.06 }}
                >
                  <div className="glass-strong flex items-center gap-3 rounded-2xl border border-primary/15 bg-gradient-to-r from-secondary/80 to-background/90 px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <layer.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                            {layer.subtitle}
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {layer.title}
                          </div>
                        </div>
                        <div className="hidden text-[10px] text-muted-foreground sm:block">
                          Scroll to separate
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Top glass cap */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-primary/10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

