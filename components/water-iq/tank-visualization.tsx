"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const tankComponents = [
  { label: "Swirl Chamber", x: 50, y: 13, color: "#00D4FF", desc: "Flow stabilizer" },
  { label: "Oil Separator", x: 50, y: 27, color: "#00FFB2", desc: "Surface plate" },
  { label: "Sensor Array", x: 50, y: 42, color: "#00D4FF", desc: "5 parameters" },
  { label: "Membrane Filter", x: 50, y: 57, color: "#00FFB2", desc: "0.1μm rating" },
  { label: "Drain Valve", x: 28, y: 76, color: "#00D4FF", desc: "Discard" },
  { label: "Reuse Pump", x: 72, y: 76, color: "#00FFB2", desc: "Storage" },
]

export default function TankVisualization({ exploded = false }: { exploded?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [phase, setPhase] = useState(0)
  const [waterLevel, setWaterLevel] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 4500)
    const t4 = setTimeout(() => { setPhase(4); setWaterLevel(70) }, 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInView])

  const currentPhase = exploded ? 2 : phase

  return (
    <div ref={ref} className="relative mx-auto h-[500px] w-full max-w-[400px] md:h-[600px] md:max-w-[460px]">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[40px] blur-[60px]"
        animate={{ opacity: phase >= 1 ? [0.06, 0.12, 0.06] : 0 }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.3) 0%, rgba(0,255,178,0.1) 60%, transparent 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto h-full w-[280px] md:w-[320px]"
      >
        {/* Tank shell */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-b from-secondary/80 via-secondary/60 to-background/85">
          {/* Water fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            initial={{ height: "0%" }}
            animate={{ height: `${waterLevel}%` }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/22 via-primary/8 to-transparent" />
            <svg className="absolute -top-3 left-0 w-full" viewBox="0 0 320 24" fill="none" preserveAspectRatio="none">
              <motion.path
                fill="rgba(0,212,255,0.13)"
                animate={{
                  d: [
                    "M0 12 Q40 4 80 12 T160 12 T240 12 T320 12 V24 H0 Z",
                    "M0 12 Q40 20 80 12 T160 12 T240 12 T320 12 V24 H0 Z",
                    "M0 12 Q40 4 80 12 T160 12 T240 12 T320 12 V24 H0 Z",
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/25"
                style={{
                  width: 3 + (i % 3) * 2,
                  height: 3 + (i % 3) * 2,
                  left: `${10 + (i * 11) % 80}%`,
                  bottom: `${5 + (i * 13) % 70}%`,
                }}
                animate={{ y: [-5, -40 - (i % 3) * 20], opacity: [0.5, 0], scale: [1, 0.3] }}
                transition={{ duration: 2.5 + (i % 3) * 0.8, repeat: Infinity, delay: (i * 0.4) % 3, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          {/* Horizontal separator lines */}
          {[22, 38, 52, 67].map((y, i) => (
            <motion.div
              key={i}
              className="absolute left-4 right-4 h-px"
              style={{ top: `${y}%` }}
              animate={{ opacity: currentPhase >= 1 ? 0.12 : 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{ top: `${y}%`, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }}
            />
          ))}

          {/* Components */}
          {tankComponents.map((comp, i) => {
            const isLeft = comp.x < 50
            const isRight = comp.x > 50
            const explodeX = currentPhase === 2 ? (isLeft ? -55 : isRight ? 55 : (i % 2 === 0 ? -30 : 30)) : 0
            const explodeY = currentPhase === 2 ? (i - 2.5) * 12 : 0
            return (
              <motion.div
                key={comp.label}
                className="absolute"
                style={{ left: `${comp.x}%`, top: `${comp.y}%`, transform: "translate(-50%, -50%)" }}
                animate={{ x: explodeX, y: explodeY, opacity: currentPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.9, delay: currentPhase === 2 ? i * 0.09 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="relative rounded-lg border px-2.5 py-1.5"
                  style={{ borderColor: `${comp.color}40`, background: `linear-gradient(135deg, ${comp.color}12, ${comp.color}06)` }}
                  animate={currentPhase === 2 ? { boxShadow: [`0 0 8px ${comp.color}25`, `0 0 20px ${comp.color}45`, `0 0 8px ${comp.color}25`] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <div className="whitespace-nowrap text-xs font-bold" style={{ color: comp.color }}>{comp.label}</div>
                  {currentPhase === 2 && (
                    <div className="whitespace-nowrap text-[10px]" style={{ color: `${comp.color}80` }}>{comp.desc}</div>
                  )}
                </motion.div>
                {currentPhase === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.45, scaleX: 1 }}
                    className="absolute top-1/2 h-px w-5"
                    style={{
                      background: `linear-gradient(${isRight ? "to right" : "to left"}, transparent, ${comp.color})`,
                      [isRight ? "right" : "left"]: "100%",
                      transformOrigin: isRight ? "left" : "right",
                    }}
                  />
                )}
              </motion.div>
            )
          })}

          {/* Flow arrows when active */}
          {currentPhase === 4 && [18, 33, 48, 62].map((top, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${top}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0], y: [0, 18] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Input pipe top */}
        <motion.div
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          className="absolute -top-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
        >
          <div className="h-6 w-6 rounded-full border border-primary/30 bg-secondary/60 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary/60" />
          </div>
          <div className="h-4 w-0.5 bg-gradient-to-b from-primary/40 to-transparent" />
        </motion.div>

        {/* Output pipes bottom */}
        {phase >= 1 && (
          <div className="absolute -bottom-5 left-0 right-0 flex justify-around px-8">
            {["Reuse", "Drain"].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="h-4 w-0.5 bg-gradient-to-b from-transparent to-primary/40" />
                <div className="rounded-full border border-primary/25 bg-secondary/60 px-2.5 py-0.5 text-[9px] font-bold text-primary/70">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
