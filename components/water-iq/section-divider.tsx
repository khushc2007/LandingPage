"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative flex items-center justify-center py-2" aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-primary/20 to-transparent origin-center"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
        style={{ boxShadow: "0 0 8px rgba(0,212,255,0.4)" }}
      />
    </div>
  )
}
