"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export interface HoverGlowProps {
    children: React.ReactNode;
    color?: "cyan" | "blue" | "emerald";
    className?: string;
}

export function HoverGlow({ children, color = "cyan", className }: HoverGlowProps) {
    const [isHovered, setIsHovered] = useState(false);

    const glowColors = {
        cyan: "rgba(0, 245, 255, 0.4)",
        blue: "rgba(59, 130, 246, 0.4)",
        emerald: "rgba(16, 185, 129, 0.4)",
    };

    return (
        <motion.div
            className={cn("relative group cursor-pointer", className)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <motion.div
                className="absolute -inset-0.5 rounded-2xl blur-lg pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: glowColors[color] }}
            />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
