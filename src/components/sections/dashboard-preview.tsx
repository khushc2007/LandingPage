"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Activity, Droplets, Thermometer, Gauge, TrendingUp, Bell } from "lucide-react"
// We simulate this for now, but in real life we could use SWR/React Query.
const useSimulatedDashboardData = () => {
  return {
    ph: 7.2,
    turbidity: 0.5,
    tds: 300,
    orp: 650,
    ammonia: 0.1,
    saved: 12500,
  }
}
import { SystemMonitorPanel } from "@/src/components/visualizations/system-monitor-panel"
import { MetricCard } from "@/src/components/ui/metric-card"

function MiniChart({ color, height = 40 }: { color: string; height?: number }) {
  const points = useRef(Array.from({ length: 20 }, () => Math.random() * 0.6 + 0.2))

  useEffect(() => {
    const interval = setInterval(() => {
      points.current = [...points.current.slice(1), Math.random() * 0.6 + 0.2]
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const pathD = points.current
    .map((p, i) => {
      const x = (i / (points.current.length - 1)) * 100
      const y = height - p * height
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(" ")

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathD + ` L 100 ${height} L 0 ${height} Z`} fill={`url(#grad-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const data = useSimulatedDashboardData()

  const sensors = [
    { label: "pH", value: data.ph, unit: "", icon: Activity, color: "#00D4FF" },
    { label: "Turbidity", value: data.turbidity, unit: "NTU", icon: Droplets, color: "#00FFB2" },
    { label: "TDS", value: data.tds, unit: "ppm", icon: Gauge, color: "#00D4FF" },
    { label: "ORP", value: data.orp, unit: "mV", icon: Thermometer, color: "#00FFB2" },
    { label: "Ammonia", value: data.ammonia, unit: "mg/L", icon: Thermometer, color: "#00D4FF" },
  ]

  return (
    <section id="dashboard" className="relative py-32 px-6">
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Smart Monitoring
          </span>
          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl text-balance">
            Industrial-Grade SCADA-Inspired Dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Live visualization of pH, TDS, turbidity, ORP, and ammonia levels,
            wrapped in a modern interface inspired by industrial control rooms.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="glass-strong glow-cyan rounded-2xl p-1 md:p-2">
            {/* Top bar */}
            <div className="flex items-center justify-between rounded-t-xl bg-secondary/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">WATER-IQ Dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  <span className="text-xs text-accent">Live</span>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Metrics grid */}
              <SystemMonitorPanel>
                {sensors.map((sensor) => (
                  <MetricCard
                    key={sensor.label}
                    label={`${sensor.label} (${sensor.unit})`}
                    value={sensor.value.toString()}
                    trend="0.1"
                    trendDirection="up"
                    color={sensor.color === "#00f5ff" || sensor.color === "#00D4FF" ? "cyan" : sensor.color === "#3b82f6" ? "blue" : "emerald"}
                  />
                ))}
              </SystemMonitorPanel>

              {/* Main chart area */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-border/50 bg-secondary/30 p-4 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Water Quality Over Time</span>
                    <div className="flex gap-4">
                      {["1H", "24H", "7D"].map((t) => (
                        <button
                          key={t}
                          className="text-xs text-muted-foreground transition-colors hover:text-primary first:text-primary"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 h-40">
                    <MiniChart color="#00D4FF" height={160} />
                  </div>
                </div>

                <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <span className="text-sm font-medium text-foreground">System Status</span>
                  <div className="mt-4 flex flex-col gap-3">
                    {[
                      { label: "Reuse Rate", value: "73%", color: "#00FFB2" },
                      { label: "System Health", value: "98%", color: "#00D4FF" },
                      { label: "ORP Level", value: `${data.orp}`, color: "#00D4FF" },
                      { label: "Ammonia", value: `${data.ammonia}`, color: "#00FFB2" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-semibold" style={{ color: item.color }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/10 p-3">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="text-xs text-accent">
                      {data.saved}L saved this month
                    </span>
                  </div>
                </div>
              </div>

              {/* Predictive insights */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Predictive Insight</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on current patterns, membrane filter replacement recommended in approximately 14 days.
                  System efficiency will improve by 3% after maintenance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
