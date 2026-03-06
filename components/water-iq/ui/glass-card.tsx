"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  glowColor?: "cyan" | "emerald" | "none"
  hover?: boolean
  className?: string
}

const glowColorMap = {
  cyan:    "hover:border-[rgba(0,212,255,0.30)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.55),0_0_50px_rgba(0,212,255,0.14),0_0_0_1px_rgba(0,212,255,0.20)]",
  emerald: "hover:border-[rgba(0,255,178,0.30)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.55),0_0_50px_rgba(0,255,178,0.12),0_0_0_1px_rgba(0,255,178,0.18)]",
  none:    "",
}

export default function GlassCard({
  children,
  glowColor = "cyan",
  hover = true,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "wiq-glass-card",
        glowColorMap[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
