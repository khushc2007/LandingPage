import * as React from "react"
import { cn } from "@/src/lib/utils"
import { GlassPanel } from "./glass-panel"

export interface SensorPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    status: "active" | "standby" | "warning";
    sensorId: string;
    name: string;
}

export function SensorPanel({
    status,
    sensorId,
    name,
    className,
    children,
    ...props
}: SensorPanelProps) {
    return (
        <GlassPanel
            intensity="heavy"
            className={cn(
                "p-6 flex flex-col gap-4 font-mono relative overflow-hidden",
                "border-[var(--glass-border)]",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between pointer-events-none border-b border-white/5 pb-4 mb-2">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">{sensorId}</span>
                    <span className="text-sm font-semibold text-foreground tracking-wide mt-1">{name}</span>
                </div>
                <div className={cn(
                    "w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]",
                    status === "active" && "bg-[#10b981] text-[#10b981]",
                    status === "standby" && "bg-[#00f5ff] text-[#00f5ff]",
                    status === "warning" && "bg-[#f59e0b] text-[#f59e0b]"
                )} title={`Status: ${status}`} />
            </div>

            <div className="flex-grow flex flex-col gap-3 relative z-10">
                {children}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            {/* Decorative grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-30" />
        </GlassPanel>
    )
}
