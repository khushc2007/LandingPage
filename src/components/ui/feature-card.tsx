import * as React from "react"
import { cn } from "@/src/lib/utils"
import { GlassCard } from "./glass-card"

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description: string;
    glowColor?: "cyan" | "blue" | "emerald";
}

export function FeatureCard({
    icon,
    title,
    description,
    glowColor = "cyan",
    className,
    ...props
}: FeatureCardProps) {
    return (
        <GlassCard
            glowColor={glowColor}
            className={cn("p-6 flex flex-col gap-4 group", className)}
            {...props}
        >
            {icon && (
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300",
                    "bg-white/5 border border-white/10 group-hover:scale-110",
                    glowColor === "cyan" && "text-[#00f5ff] group-hover:border-[#00f5ff]/30 group-hover:bg-[#00f5ff]/10",
                    glowColor === "blue" && "text-[#3b82f6] group-hover:border-[#3b82f6]/30 group-hover:bg-[#3b82f6]/10",
                    glowColor === "emerald" && "text-[#10b981] group-hover:border-[#10b981]/30 group-hover:bg-[#10b981]/10"
                )}>
                    {icon}
                </div>
            )}
            <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </GlassCard>
    )
}
