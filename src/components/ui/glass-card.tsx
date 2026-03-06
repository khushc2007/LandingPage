import * as React from "react"
import { cn } from "@/src/lib/utils"

const GlassCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        hoverEffect?: boolean;
        glowColor?: "cyan" | "blue" | "emerald";
    }
>(({ className, hoverEffect = true, glowColor = "cyan", ...props }, ref) => {
    const glowClasses = {
        cyan: "hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:border-[#00f5ff]/30",
        blue: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-[#3b82f6]/30",
        emerald: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-[#10b981]/30"
    };

    return (
        <div
            ref={ref}
            className={cn(
                "bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[16px]",
                "rounded-2xl overflow-hidden transition-all duration-300 ease-out",
                hoverEffect && glowClasses[glowColor],
                hoverEffect && "hover:-translate-y-1",
                className
            )}
            {...props}
        />
    )
})
GlassCard.displayName = "GlassCard"

export { GlassCard }
