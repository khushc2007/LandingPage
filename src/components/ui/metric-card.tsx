import * as React from "react"
import { cn } from "@/src/lib/utils"
import { GlassPanel } from "./glass-panel"

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    value: string;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    color?: "cyan" | "blue" | "emerald";
}

export function MetricCard({
    label,
    value,
    trend,
    trendDirection = "neutral",
    color = "cyan",
    className,
    ...props
}: MetricCardProps) {
    return (
        <GlassPanel
            intensity="heavy"
            className={cn(
                "p-5 flex flex-col gap-1 relative overflow-hidden group border-white/10",
                color === "cyan" && "hover:border-[#00f5ff]/30 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)]",
                color === "blue" && "hover:border-[#3b82f6]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
                color === "emerald" && "hover:border-[#10b981]/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                className
            )}
            {...props}
        >
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono font-medium">
                {label}
            </span>
            <div className="flex items-baseline gap-3 mt-1">
                <span className={cn(
                    "text-3xl font-bold tracking-tight font-mono",
                    color === "cyan" && "text-[#00f5ff]",
                    color === "blue" && "text-[#3b82f6]",
                    color === "emerald" && "text-[#10b981]"
                )}>
                    {value}
                </span>
                {trend && (
                    <span className={cn(
                        "text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1",
                        trendDirection === "up" && "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
                        trendDirection === "down" && "text-rose-400 border-rose-500/20 bg-rose-500/10"
                    )}>
                        {trendDirection === "up" && "↑"}{trendDirection === "down" && "↓"}{trendDirection === "neutral" && "−"} {trend}
                    </span>
                )}
            </div>
            <div className={cn(
                "absolute -bottom-1 -right-1 w-16 h-16 rounded-full blur-[24px] opacity-20 group-hover:opacity-40 transition-opacity",
                color === "cyan" && "bg-[#00f5ff]",
                color === "blue" && "bg-[#3b82f6]",
                color === "emerald" && "bg-[#10b981]"
            )} />
        </GlassPanel>
    )
}
