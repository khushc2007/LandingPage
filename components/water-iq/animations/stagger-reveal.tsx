"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode, Children } from "react"

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  baseDelay?: number
  direction?: "up" | "left"
}

export default function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  baseDelay = 0.1,
  direction = "up",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const initial = direction === "up" ? { opacity: 0, y: 32 } : { opacity: 0, x: -28 }

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          initial={initial}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
          transition={{
            duration: 0.65,
            delay: baseDelay + i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
