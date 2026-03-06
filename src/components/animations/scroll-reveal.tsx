"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    amount?: "some" | "all" | number;
    className?: string;
}

export function ScrollReveal({
    children,
    delay = 0,
    duration = 0.8,
    direction = "up",
    amount = 0.3,
    className
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount });

    const getAxisOffset = () => {
        switch (direction) {
            case "up": return { y: 40, x: 0 };
            case "down": return { y: -40, x: 0 };
            case "left": return { x: 40, y: 0 };
            case "right": return { x: -40, y: 0 };
            case "none": return { x: 0, y: 0 };
        }
    };

    const initialOffset = getAxisOffset();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, ...initialOffset }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialOffset }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom sleek easing
            }}
        >
            {children}
        </motion.div>
    );
}
