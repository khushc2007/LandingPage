"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-80px" })

  const directionMap = {
    up:    { y: distance,  x: 0         },
    down:  { y: -distance, x: 0         },
    left:  { x: distance,  y: 0         },
    right: { x: -distance, y: 0         },
  }

  const initial = { opacity: 0, ...directionMap[direction] }
  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
