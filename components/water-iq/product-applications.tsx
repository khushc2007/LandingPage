"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Building2, Leaf, Factory, ArrowRight } from "lucide-react"

const applications = [
  {
    id: "residential",
    icon: Building2,
    title: "Residential Buildings",
    subtitle: "Apartments & Condominiums",
    desc: "Install WATER-IQ in the utility room of any apartment building. The system automatically collects greywater from all units, treats it, and redistributes it for toilet flushing and irrigation.",
    stats: [
      { label: "Water Savings", value: "40–60%" },
      { label: "Payback Period", value: "2–4 yrs" },
      { label: "Units Supported", value: "8–500+" },
    ],
    color: "#00D4FF",
    gradient: "from-primary/15 to-transparent",
  },
  {
    id: "agriculture",
    icon: Leaf,
    title: "Urban Agriculture",
    subtitle: "Rooftop & Community Gardens",
    desc: "Treated greywater meets irrigation standards for non-edible crops. WATER-IQ ensures that only properly treated water reaches plants, with real-time quality certification for every batch.",
    stats: [
      { label: "Irrigation Coverage", value: "100%" },
      { label: "Quality Certified", value: "Every Batch" },
      { label: "Cost Reduction", value: "Up to 70%" },
    ],
    color: "#00FFB2",
    gradient: "from-accent/15 to-transparent",
  },
  {
    id: "commercial",
    icon: Factory,
    title: "Commercial & Industrial",
    subtitle: "Hotels, Offices & Factories",
    desc: "Scale WATER-IQ across large commercial facilities with centralized monitoring. Manage water reuse across floors, wings, and buildings from a single dashboard interface.",
    stats: [
      { label: "Scale", value: "Unlimited" },
      { label: "Monitoring", value: "Centralized" },
      { label: "Compliance", value: "Automated" },
    ],
    color: "#00D4FF",
    gradient: "from-primary/15 to-transparent",
  },
]

export default function ProductApplications() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [active, setActive] = useState(0)

  return (
    <section id="applications" className="relative py-36 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/4 blur-[150px]" />
        <div className="absolute left-0 bottom-1/3 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Real-World Applications</span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-black text-foreground md:text-5xl lg:text-6xl text-balance">
            Built for Every
            <br />
            <span className="text-primary glow-text">Urban Environment</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            From single apartment buildings to city-scale deployments,
            WATER-IQ adapts to any context.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Tab selector */}
          <div className="flex flex-col gap-4">
            {applications.map((app, i) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                onClick={() => setActive(i)}
                className={`group relative flex items-start gap-5 rounded-2xl border p-6 text-left transition-all duration-300 ${
                  active === i ? "border-primary/30 bg-secondary/50" : "border-border/40 bg-secondary/15 hover:border-border/60 hover:bg-secondary/30"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="appActiveCard"
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at left, ${app.color}06 0%, transparent 60%)` }}
                    transition={{ type: "spring", bounce: 0.15 }}
                  />
                )}
                <div
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors"
                  style={{ backgroundColor: active === i ? `${app.color}18` : `${app.color}08` }}
                >
                  <app.icon className="h-6 w-6" style={{ color: app.color }} />
                </div>
                <div className="relative flex-1 min-w-0">
                  <div className="text-xs font-medium text-muted-foreground">{app.subtitle}</div>
                  <div className="mt-0.5 text-lg font-bold text-foreground">{app.title}</div>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{app.desc}</p>
                    </motion.div>
                  )}
                </div>
                <ArrowRight
                  className="relative mt-1 h-4 w-4 shrink-0 transition-all"
                  style={{ color: active === i ? app.color : "var(--muted-foreground)", transform: active === i ? "rotate(90deg)" : "none" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl overflow-hidden"
              style={{ borderColor: `${applications[active].color}20` }}
            >
              {/* Visual header */}
              <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ background: `radial-gradient(ellipse at center, ${applications[active].color}15 0%, transparent 70%)` }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="flex h-24 w-24 items-center justify-center rounded-3xl"
                  style={{ backgroundColor: `${applications[active].color}18`, boxShadow: `0 0 60px ${applications[active].color}20` }}
                >
                  {(() => { const Icon = applications[active].icon; return <Icon className="h-12 w-12" style={{ color: applications[active].color }} /> })()}
                </motion.div>
                {/* Rings */}
                {[90, 130, 170].map((size, i) => (
                  <motion.div
                    key={size}
                    className="absolute rounded-full border"
                    style={{ width: size, height: size, borderColor: `${applications[active].color}15` }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {applications[active].stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-lg font-black" style={{ color: applications[active].color }}>
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mini insight */}
            <motion.div
              key={`insight-${active}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: applications[active].color }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: applications[active].color }}>
                  Deployment Ready
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                WATER-IQ installs in under 2 days with no building modifications required.
                Cloud monitoring is active from day one.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
