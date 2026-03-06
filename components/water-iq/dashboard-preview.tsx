"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Activity, Droplets, Thermometer, Gauge, TrendingUp, Bell, Wifi, CheckCircle2, Cpu } from "lucide-react"
import AnimatedCounter from "./animated-counter"
import ScrollReveal from "./animations/scroll-reveal"
import StaggerReveal from "./animations/stagger-reveal"
import SensorPanel from "./ui/sensor-panel"
import MetricCard from "./ui/metric-card"

function useSimulatedData() {
  const [data, setData] = useState({ ph: 7.2, turbidity: 12, tds: 145, orp: 320, ammonia: 0.3, flow: 11.4, temp: 28.5, saved: 2847, reuse: 73 })
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ph:         +(prev.ph + (Math.random() - 0.5) * 0.1).toFixed(1),
        turbidity:  Math.max(1, +(prev.turbidity + (Math.random() - 0.5) * 2).toFixed(0)),
        tds:        Math.max(50, +(prev.tds + (Math.random() - 0.5) * 5).toFixed(0)),
        orp:        Math.max(200, +(prev.orp + (Math.random() - 0.5) * 10).toFixed(0)),
        ammonia:    Math.max(0.1, +(prev.ammonia + (Math.random() - 0.5) * 0.05).toFixed(2)),
        flow:       Math.max(5, +(prev.flow + (Math.random() - 0.5) * 0.5).toFixed(1)),
        temp:       +(prev.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        saved:      prev.saved + Math.floor(Math.random() * 3),
        reuse:      Math.min(82, Math.max(65, prev.reuse + (Math.random() - 0.5) * 2)),
      }))
    }, 2200)
    return () => clearInterval(interval)
  }, [])
  return data
}

function SparkLine({ color, height = 40 }: { color: string; height?: number }) {
  const [points, setPoints] = useState(() => Array.from({ length: 24 }, () => Math.random() * 0.6 + 0.2))
  useEffect(() => {
    const interval = setInterval(() => setPoints(p => [...p.slice(1), Math.random() * 0.6 + 0.2]), 1800)
    return () => clearInterval(interval)
  }, [])
  const pathD = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100
    const y = height - p * height
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
  }).join(" ")
  const id = color.replace("#", "sg")
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L 100 ${height} L 0 ${height} Z`} fill={`url(#${id})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const data = useSimulatedData()

  const sensors = [
    { label: "pH Level",     value: data.ph,         unit: "",    icon: Activity,    color: "#00D4FF", trend: "stable" as const },
    { label: "Turbidity",    value: data.turbidity,  unit: "NTU", icon: Droplets,    color: "#00FFB2", trend: "down" as const },
    { label: "TDS",          value: data.tds,        unit: "ppm", icon: Gauge,       color: "#00D4FF", trend: "stable" as const },
    { label: "Temperature",  value: data.temp,       unit: "°C",  icon: Thermometer, color: "#00FFB2", trend: "up" as const },
  ]

  return (
    <section id="dashboard" className="relative py-36 px-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[150px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Intelligence Platform</span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-black text-foreground md:text-5xl lg:text-6xl text-balance">
            Live Water Intelligence
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Complete real-time visibility into every sensor, every decision, every drop.
          </p>
        </ScrollReveal>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="glass-strong glow-cyan rounded-3xl overflow-hidden border border-primary/15">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-border/40 bg-secondary/40 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
                    <div key={c} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="ml-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">WATER-IQ Monitor</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-semibold text-accent">Live</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Wifi className="h-3.5 w-3.5" />
                  <span>Connected</span>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="p-5 md:p-7">
              {/* Sensor cards — SensorPanel primitives */}
              <StaggerReveal className="grid grid-cols-2 gap-3 lg:grid-cols-4" baseDelay={0.3}>
                {sensors.map((sensor) => (
                  <SensorPanel
                    key={sensor.label}
                    label={sensor.label}
                    value={sensor.value}
                    unit={sensor.unit}
                    icon={sensor.icon}
                    color={sensor.color}
                    trend={sensor.trend}
                    active
                  />
                ))}
              </StaggerReveal>

              {/* Main chart + status */}
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-border/40 bg-secondary/25 p-5 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-foreground">Water Quality Index</span>
                    <div className="flex gap-2">
                      {["1H", "24H", "7D", "30D"].map((t, i) => (
                        <button key={t} className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-primary"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-36">
                    <SparkLine color="#00D4FF" height={144} />
                  </div>
                </div>

                <div className="rounded-xl border border-border/40 bg-secondary/25 p-5">
                  <span className="text-sm font-bold text-foreground">System Health</span>
                  <div className="mt-5 flex flex-col gap-3">
                    {[
                      { label: "Reuse Rate",    value: `${Math.round(data.reuse)}%`, color: "#00FFB2" },
                      { label: "System Health", value: "98%",                        color: "#00D4FF" },
                      { label: "ORP Level",     value: `${data.orp} mV`,             color: "#00D4FF" },
                      { label: "NH₃ Level",     value: `${data.ammonia} mg/L`,       color: "#00FFB2" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <motion.span
                          key={item.value}
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 1 }}
                          className="text-sm font-bold"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </motion.span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-accent/8 border border-accent/15 p-3">
                    <TrendingUp className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-xs font-medium text-accent">
                      {data.saved.toLocaleString()}L saved this month
                    </span>
                  </div>
                </div>
              </div>

              {/* AI insight bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-4 flex items-start gap-3 rounded-xl border border-primary/18 bg-primary/5 p-4"
              >
                <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="text-sm font-semibold text-foreground">AI Predictive Insight</span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Based on current usage patterns, membrane filter replacement recommended in 14 days.
                    Estimated 3% efficiency gain post-maintenance. All parameters nominal.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Key metric callouts — MetricCard primitives */}
        <StaggerReveal className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4" baseDelay={0.7}>
          <MetricCard value={99}  suffix=".7%" label="Routing Accuracy"  accentColor="cyan" />
          <MetricCard value={73}  suffix="%"   label="Average Reuse Rate" accentColor="emerald" />
          <MetricCard value={500} suffix="ms"  label="Decision Time"     accentColor="cyan" />
          <MetricCard value={24}  suffix="/7"  label="Monitoring Uptime" accentColor="emerald" />
        </StaggerReveal>
      </div>
    </section>
  )
}
