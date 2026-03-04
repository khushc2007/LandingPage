"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, Factory, Sprout, Fish } from "lucide-react"

const applications = [
  {
    icon: Building2,
    title: "Apartment Buildings",
    desc: "Retrofit-ready modules for high-rise and mid-rise residential blocks, with minimal utility downtime.",
    badge: "Core Use Case",
  },
  {
    icon: Factory,
    title: "Industrial Facilities",
    desc: "Capture process greywater and route it to pre-treatment before central plant processing.",
    badge: "Industrial",
  },
  {
    icon: Sprout,
    title: "Agriculture",
    desc: "Reuse treated greywater for landscape irrigation, community gardens, and micro-farming plots.",
    badge: "Irrigation",
  },
  {
    icon: Fish,
    title: "Aquaculture",
    desc: "Maintain stable water quality in recirculating systems with continuous monitoring and routing.",
    badge: "Aquaculture",
  },
]

export default function ProductApplications() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="applications" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0 water-shimmer" aria-hidden="true" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Product Applications
          </span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
            Built for Real-World Infrastructure
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From dense apartment towers to industrial campuses, WATER-IQ fits into the
            water story of every modern site.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,212,255,0.18)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <app.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {app.title}
                    </h3>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary uppercase">
                      {app.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {app.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

