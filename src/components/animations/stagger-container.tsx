"use client";

import { motion } from "framer-motion";

export interface StaggerContainerProps {
    children: React.ReactNode;
    delayChildren?: number;
    staggerChildren?: number;
    className?: string;
    viewportAmount?: number | "some" | "all";
}

export function StaggerContainer({
    children,
    delayChildren = 0.2,
    staggerChildren = 0.1,
    className,
    viewportAmount = 0.2,
}: StaggerContainerProps) {
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren,
                delayChildren,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
        >
            {children}
        </motion.div>
    );
}

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98]
            }
        },
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
};
