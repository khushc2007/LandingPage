"use client";

import { useEffect, useState } from "react";
import { GlassPanel } from "@/src/components/ui/glass-panel";
import { cn } from "@/src/lib/utils";

export interface SensorMetricCardProps {
    label: string;
    unit: string;
    initialValue: number;
    variance?: number; // How much it fluctuates
    interval?: number; // Update interval in ms
    color?: "cyan" | "blue" | "emerald";
    className?: string;
}

export function SensorMetricCard({
    label,
    unit,
    initialValue,
    variance = 2,
    interval = 3000,
    color = "emerald",
    className
}: SensorMetricCardProps) {
    const [value, setValue] = useState(initialValue);
    const [trend, setTrend] = useState<"up" | "down" | "flat">("flat");

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(prev => {
                const change = (Math.random() * variance * 2) - variance;
                const newValue = prev + change;
                if (newValue > prev) setTrend("up");
                else if (newValue < prev) setTrend("down");
                else setTrend("flat");

                // Keep within reasonable bounds (e.g., +/- 20% of initial)
                if (Math.abs(newValue - initialValue) > initialValue * 0.2) {
                    return initialValue;
                }
                return Math.max(0, newValue);
            });
        }, interval);

        return () => clearInterval(timer);
    }, [initialValue, variance, interval]);

    return (
        <GlassPanel
            intensity="heavy"
            className={cn(
                "p-4 flex flex-col justify-between font-mono relative overflow-hidden group",
                "border-white/10",
                color === "cyan" && "hover:border-[#00f5ff]/40",
                color === "blue" && "hover:border-[#3b82f6]/40",
                color === "emerald" && "hover:border-[#10b981]/40",
                className
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                <div className={cn(
                    "h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]",
                    trend === "up" ? "bg-emerald-400 text-emerald-400" :
                        trend === "down" ? "bg-rose-400 text-rose-400" :
                            "bg-blue-400 text-blue-400"
                )}></div>
            </div>

            <div className="flex items-baseline gap-2">
                <span className={cn(
                    "text-4xl font-light tracking-tight transition-colors duration-500",
                    color === "cyan" && "text-[#00f5ff]",
                    color === "blue" && "text-[#3b82f6]",
                    color === "emerald" && "text-[#10b981]"
                )}>
                    {value.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">{unit}</span>
            </div>

            {/* HUD Scanner Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-[waterFlow_2s_linear_infinite]" />
        </GlassPanel>
    );
}
