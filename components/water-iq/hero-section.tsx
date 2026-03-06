"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Cpu, ArrowDown, ArrowRight } from "lucide-react"
import GlowButton from "./ui/glow-button"
import MetricCard from "./ui/metric-card"

const badges = [
  { icon: Zap,    label: "Real-time Analysis" },
  { icon: Shield, label: "99.7% Accuracy" },
  { icon: Cpu,    label: "AI-Powered" },
]

const stats = [
  { val: 98.7, suffix: "%",  lbl: "Filtration Efficiency", accent: "cyan" as const },
  { val: 2,    suffix: ".4s", lbl: "AI Response Time",     accent: "emerald" as const },
  { val: 150,  suffix: "+",  lbl: "Households Served",     accent: "cyan" as const },
  { val: 5,    suffix: "",   lbl: "Separation Layers",      accent: "emerald" as const },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      {/* ── Animated gradient background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#030B12]" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -left-32 top-1/2 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,255,178,0.09) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.42, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)" }}
        />
        {/* Enhanced grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 h-32 w-px bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="absolute top-0 right-0 h-32 w-px bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-32 bg-gradient-to-l from-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030B12] to-transparent" />
      </div>

      {/* ── Floating water droplets ── */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            left: `${8 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            background: i % 2 === 0 ? "rgba(0,212,255,0.45)" : "rgba(0,255,178,0.38)",
            filter: "blur(1px)",
            boxShadow: i % 2 === 0 ? "0 0 10px rgba(0,212,255,0.55)" : "0 0 10px rgba(0,255,178,0.55)",
          }}
          animate={{ y: [-14, 14, -14], x: [0, 8, 0], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <div className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase neon-flicker">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Smart Greywater Intelligence
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-7xl font-black leading-none tracking-tight md:text-8xl lg:text-9xl"
          style={{
            fontFamily: "'Orbitron', monospace",
            background: "linear-gradient(135deg, #ffffff 20%, #00D4FF 55%, #00FFB2 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 50px rgba(0,212,255,0.28))",
          }}
        >
          WATER·IQ
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/55 md:text-xl"
        >
          A five-layer AI-driven greywater treatment system engineered for modern
          residential buildings.{" "}
          <span className="text-white/80">Reclaim. Recycle. Reimagine.</span>
        </motion.p>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mb-10 flex flex-wrap justify-center gap-2.5"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="glass-btn neon-border flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/70 cursor-default"
            >
              <b.icon className="h-3.5 w-3.5 text-primary" />
              {b.label}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons — now using GlowButton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mb-20 flex flex-col gap-3 sm:flex-row"
        >
          <GlowButton href="#solution" variant="primary">
            Explore Technology
            <ArrowRight className="h-4 w-4" />
          </GlowButton>
          <GlowButton href="#tank" variant="secondary">
            View 3D Model
          </GlowButton>
        </motion.div>

        {/* Stats row — now using MetricCard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.lbl}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.08 }}
            >
              <MetricCard
                value={s.val}
                suffix={s.suffix}
                label={s.lbl}
                accentColor={s.accent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/25">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
