"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlowButtonProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode
  variant?: "primary" | "secondary"
  href?: string
  className?: string
}

export default function GlowButton({
  children,
  variant = "primary",
  href = "#",
  className,
  ...props
}: GlowButtonProps) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "wiq-glow-btn",
        variant === "primary" ? "wiq-glow-btn-primary" : "wiq-glow-btn-secondary",
        "inline-flex items-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  )
}
