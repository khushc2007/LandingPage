"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Droplets, ArrowRight } from "lucide-react"

export default function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="vision" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Droplets className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="font-[var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Reimagining{" "}
            <span className="glow-text text-primary">Water Use</span>{" "}
            in Modern Cities
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Intelligent greywater reuse will transform apartment infrastructure,
            making every building a node in a smarter, more sustainable urban water
            network. WATER-IQ is the foundation for that future.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#solution"
              className="glow-cyan flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#technology"
              className="rounded-xl border border-border bg-secondary/50 px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/30"
            >
              Explore Technology
            </a>
          </motion.div>
        </motion.div>

        {/* Animated water rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/10"
              style={{
                width: 200 + i * 150,
                height: 200 + i * 150,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto mt-32 max-w-6xl border-t border-border pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <span className="font-[var(--font-heading)] text-sm font-semibold text-foreground">
              WATER-IQ
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Smart Greywater Intelligence. Building the future of urban water management.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
