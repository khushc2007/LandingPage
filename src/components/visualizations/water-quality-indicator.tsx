import { GlassPanel } from "@/src/components/ui/glass-panel";
import { cn } from "@/src/lib/utils";

export interface WaterQualityIndicatorProps {
    score: number; // 0-100
    className?: string;
}

export function WaterQualityIndicator({ score, className }: WaterQualityIndicatorProps) {
    const isOptimal = score >= 90;
    const isGood = score >= 70 && score < 90;
    const isWarning = score < 70;

    const colorClass = isOptimal ? "text-[#00f5ff] bg-[#00f5ff]" :
        isGood ? "text-[#10b981] bg-[#10b981]" :
            "text-rose-500 bg-rose-500";

    return (
        <GlassPanel intensity="heavy" className={cn("p-6 font-mono", className)}>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h4 className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Quality Index</h4>
                    <div className="flex items-baseline gap-2">
                        <span className={cn("text-5xl font-light", colorClass.split(' ')[0])}>{score}</span>
                        <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className={cn(
                        "text-xs px-2 py-1 rounded border",
                        isOptimal ? "text-[#00f5ff] border-[#00f5ff]/30 bg-[#00f5ff]/10" :
                            isGood ? "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10" :
                                "text-rose-500 border-rose-500/30 bg-rose-500/10"
                    )}>
                        {isOptimal ? "OPTIMAL" : isGood ? "ACCEPTABLE" : "WARNING"}
                    </span>
                </div>
            </div>

            {/* Segmented display bar representing stages */}
            <div className="flex gap-1 h-3 w-full">
                {Array.from({ length: 20 }).map((_, i) => {
                    const isActive = (i / 20) * 100 < score;
                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex-1 rounded-sm transition-all duration-500",
                                isActive ? colorClass.split(' ')[1] : "bg-white/5",
                                isActive && "shadow-[0_0_10px_currentColor]"
                            )}
                        />
                    );
                })}
            </div>
        </GlassPanel>
    );
}
