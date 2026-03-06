import * as React from "react"
import { cn } from "@/src/lib/utils"

const GlassPanel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        intensity?: "light" | "medium" | "heavy";
    }
>(({ className, intensity = "medium", ...props }, ref) => {
    const intensityClasses = {
        light: "bg-[rgba(10,22,40,0.4)] backdrop-blur-md border-[rgba(0,212,255,0.05)]",
        medium: "bg-[var(--glass-bg)] backdrop-blur-[16px] border-[var(--glass-border)]",
        heavy: "bg-[rgba(10,22,40,0.85)] backdrop-blur-[30px] border-[rgba(0,212,255,0.15)]",
    }

    return (
        <div
            ref={ref}
            className={cn(
                "border rounded-xl",
                intensityClasses[intensity],
                className
            )}
            {...props}
        />
    )
})
GlassPanel.displayName = "GlassPanel"

export { GlassPanel }
