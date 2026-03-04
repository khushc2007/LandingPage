"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import TankVisualization from "./tank-visualization"

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="solution" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/3 blur-[150px]" aria-hidden="true" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Text */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-medium tracking-widest text-accent uppercase">
                The Solution
              </span>
              <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
                WATER-IQ:{" "}
                <span className="text-primary">Smart Greywater Intelligence</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                WATER-IQ analyzes greywater in real time and decides whether
                water should be reused or discarded using a compact smart
                treatment system.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { val: "Real-time", desc: "Analysis" },
                  { val: "Autonomous", desc: "Routing" },
                  { val: "Compact", desc: "Design" },
                  { val: "Scalable", desc: "Deployment" },
                ].map((item) => (
                  <div key={item.val} className="glass rounded-xl p-4">
                    <div className="text-sm font-semibold text-primary">{item.val}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tank */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1"
          >
            <TankVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
