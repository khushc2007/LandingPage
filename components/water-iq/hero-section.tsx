"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Zap, Shield, Cpu } from "lucide-react"
import dynamic from "next/dynamic"

const TankThreeBackground = dynamic(
  () => import("./tank-three-background"),
  { ssr: false }
)

const badges = [
  { icon: Zap, label: "Real-time Analysis" },
  { icon: Shield, label: "99.7% Accuracy" },
  { icon: Cpu, label: "AI-Powered" },
]

// Sensor data shown in exploded view
const sensorItems = [
  { label: "pH Sensor", color: "#00e5ff" },
  { label: "Turbidity", color: "#00ff88" },
  { label: "TDS Monitor", color: "#00e5ff" },
  { label: "Ammonia", color: "#ffd700" },
  { label: "ORP Sensor", color: "#00ff88" },
]

const layerLabels = [
  "Swirl Chamber",
  "Oil Membrane",
  "Residue Filter",
  "Sensor Core",
  "Pump Routing",
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPct, setScrollPct] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "10%"])

  // Track raw scroll % within the hero section for Three.js
  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setScrollPct(v))
    return unsub
  }, [scrollYProgress])

  // Derived UI states
  const showSensors = scrollPct > 0.15
  const showLayers = scrollPct > 0.65 && scrollPct < 0.92
  const showStats = scrollPct > 0.15

  return (
    // Tall section so scroll has room to drive the Three.js timeline
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "650vh" }}
      id="hero"
    >
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Three.js canvas — full background */}
        <TankThreeBackground scrollProgress={scrollPct} />

        {/* Vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,11,18,0.72) 100%)" }}
        />

        {/* ── SCROLL PROGRESS BAR ── */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] z-[60] bg-gradient-to-r from-primary via-accent to-primary"
          style={{ width: `${scrollPct * 100}%`, boxShadow: "0 0 8px #00D4FF" }}
        />

        {/* ── SENSOR PANEL (right) ── */}
        <motion.div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3"
          animate={{ opacity: showSensors ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {sensorItems.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 text-xs tracking-wide text-white/60 flex-row-reverse">
              <span>{s.label}</span>
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}` }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 0.8 }}
              />
            </div>
          ))}
        </motion.div>

        {/* ── LAYER LABELS (left) ── */}
        <motion.div
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-7"
          animate={{ opacity: showLayers ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {layerLabels.map((label) => (
            <div key={label} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 font-mono">
              {label}
              <div className="w-5 h-px bg-primary/40" />
            </div>
          ))}
        </motion.div>

        {/* ── STATS BAR (bottom) ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-12 pb-5 pt-8"
          style={{ background: "linear-gradient(to top, rgba(3,11,18,0.9), transparent)" }}
          animate={{ opacity: showStats ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { val: "98.7%", lbl: "Filtration Efficiency" },
            { val: "2.4s", lbl: "AI Response Time" },
            { val: "150+", lbl: "Households Served" },
            { val: "5-Layer", lbl: "Smart Separation" },
          ].map((s) => (
            <div key={s.lbl} className="text-center">
              <div className="font-mono text-lg font-bold text-primary">{s.val}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/35">{s.lbl}</div>
            </div>
          ))}
        </motion.div>

        {/* ── HERO TEXT (fades out on scroll) ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-[18vh] px-6 text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Smart Greywater Intelligence
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl font-black tracking-tight leading-[1.0] md:text-8xl"
            style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #fff 30%, #00D4FF 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            WATER·IQ
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/55 md:text-lg"
          >
            A five-layer AI-driven greywater treatment system engineered for
            modern residential buildings. Reclaim. Recycle. Reimagine.
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-6 flex flex-wrap justify-center gap-2.5 pointer-events-auto"
          >
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/65 backdrop-blur-sm"
              >
                <b.icon className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row pointer-events-auto"
          >
            <motion.a
              href="#solution"
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,212,255,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground"
              style={{ boxShadow: "0 0 24px rgba(0,212,255,0.3)" }}
            >
              Explore Technology
            </motion.a>
            <motion.a
              href="#system"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              View Layers
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll to explore</span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-2 w-0.5 rounded-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
