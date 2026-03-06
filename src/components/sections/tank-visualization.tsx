"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const tankComponents = [
  { label: "Swirl Chamber", x: 50, y: 15, color: "#00D4FF" },
  { label: "Oil Separator", x: 50, y: 30, color: "#00FFB2" },
  { label: "Sensor Module", x: 50, y: 45, color: "#00D4FF" },
  { label: "Membrane Filter", x: 50, y: 60, color: "#00FFB2" },
  { label: "Outlet Valve", x: 30, y: 78, color: "#00D4FF" },
  { label: "Reuse Pump", x: 70, y: 78, color: "#00FFB2" },
]

export default function TankVisualization({ exploded = false }: { exploded?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [phase, setPhase] = useState(0)
  const [waterLevel, setWaterLevel] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer1 = setTimeout(() => setPhase(1), 500) // appear
    const timer2 = setTimeout(() => setPhase(2), 2000) // explode
    const timer3 = setTimeout(() => setPhase(3), 5000) // reassemble
    const timer4 = setTimeout(() => {
      setPhase(4) // water flow
      setWaterLevel(75)
    }, 6500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [isInView])

  const currentPhase = exploded ? 2 : phase

  return (
    <div ref={ref} className="relative mx-auto h-[500px] w-full max-w-[400px] md:h-[600px] md:max-w-[450px]">
      {/* Tank body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, rotateY: currentPhase >= 1 ? [0, 5, -5, 0] : 0 }
            : {}
        }
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto h-full w-[280px] md:w-[320px]"
      >
        {/* Tank outer shell */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-secondary/80 to-background/80">
          {/* Water fill animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            initial={{ height: "0%" }}
            animate={{ height: `${waterLevel}%` }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-primary/5" />
            {/* Water surface wave */}
            <svg
              className="absolute -top-2 left-0 w-full"
              viewBox="0 0 320 20"
              fill="none"
            >
              <motion.path
                d="M0 10 Q40 0 80 10 T160 10 T240 10 T320 10 V20 H0 Z"
                fill="rgba(0, 212, 255, 0.15)"
                animate={{
                  d: [
                    "M0 10 Q40 0 80 10 T160 10 T240 10 T320 10 V20 H0 Z",
                    "M0 10 Q40 20 80 10 T160 10 T240 10 T320 10 V20 H0 Z",
                    "M0 10 Q40 0 80 10 T160 10 T240 10 T320 10 V20 H0 Z",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            {/* Bubbles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: 4 + Math.random() * 6,
                  height: 4 + Math.random() * 6,
                  left: `${15 + Math.random() * 70}%`,
                  bottom: `${Math.random() * 80}%`,
                }}
                animate={{
                  y: [-20, -60 - Math.random() * 40],
                  opacity: [0.6, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* Internal components */}
          {tankComponents.map((comp, i) => {
            const explodedOffset = currentPhase === 2 ? (i % 2 === 0 ? -40 : 40) : 0
            const explodedYOffset = currentPhase === 2 ? (i - 2.5) * 8 : 0
            return (
              <motion.div
                key={comp.label}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  x: explodedOffset,
                  y: explodedYOffset,
                  opacity: currentPhase >= 1 ? 1 : 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: currentPhase === 2 ? i * 0.1 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Component visual */}
                <div className="relative">
                  <motion.div
                    className="rounded-lg border px-3 py-1.5"
                    style={{
                      borderColor: `${comp.color}40`,
                      background: `linear-gradient(135deg, ${comp.color}10, ${comp.color}05)`,
                    }}
                    animate={
                      currentPhase === 2
                        ? {
                            boxShadow: [
                              `0 0 10px ${comp.color}20`,
                              `0 0 20px ${comp.color}40`,
                              `0 0 10px ${comp.color}20`,
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span
                      className="whitespace-nowrap text-xs font-medium"
                      style={{ color: comp.color }}
                    >
                      {comp.label}
                    </span>
                  </motion.div>
                  {/* Connector line */}
                  {currentPhase === 2 && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 0.5, width: 20 }}
                      className="absolute top-1/2 h-px"
                      style={{
                        background: comp.color,
                        [explodedOffset > 0 ? "right" : "left"]: "100%",
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* Flow arrows when assembled */}
          {currentPhase === 4 && (
            <>
              {[20, 35, 50, 65].map((top, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: `${top}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0], y: [0, 20] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2L8 14M8 14L3 9M8 14L13 9"
                      stroke="#00D4FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Glow effect behind tank */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/5 blur-3xl" />
      </motion.div>
    </div>
  )
}
