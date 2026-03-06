"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/src/components/ui/glass-panel";
import { cn } from "@/src/lib/utils";

export interface FiltrationStage {
    id: string;
    name: string;
    status: "pending" | "active" | "completed";
    purity: number;
}

export function FiltrationStageVisualizer({ stages, className }: { stages: FiltrationStage[], className?: string }) {
    return (
        <GlassPanel intensity="medium" className={cn("p-6", className)}>
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest font-mono mb-8">Process Telemetry</h3>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/10" />

                <div className="flex flex-col gap-8 relative z-10">
                    {stages.map((stage, index) => (
                        <div key={stage.id} className="flex gap-6 items-start group">
                            <div className="relative">
                                {/* Node */}
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center border-2 border-background z-10 relative transition-all duration-500",
                                    stage.status === "completed" ? "bg-[#10b981] text-background" :
                                        stage.status === "active" ? "bg-transparent border-[#00f5ff] text-[#00f5ff]" :
                                            "bg-[#0A1628] border-white/20 text-white/40"
                                )}>
                                    <span className="font-mono text-sm font-bold">{index + 1}</span>

                                    {/* Pulse ring for active */}
                                    {stage.status === "active" && (
                                        <div className="absolute inset-0 rounded-full border border-[#00f5ff] animate-[pulseRing_2s_infinite]" />
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 pt-2">
                                <div className="flex justify-between mb-2">
                                    <h4 className={cn(
                                        "font-semibold text-lg transition-colors",
                                        stage.status === "active" ? "text-white" : "text-muted-foreground"
                                    )}>
                                        {stage.name}
                                    </h4>
                                    <span className={cn(
                                        "font-mono text-sm",
                                        stage.status === "active" ? "text-[#00f5ff]" : "text-muted-foreground"
                                    )}>
                                        {stage.purity}% Purity
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className={cn(
                                            "h-full rounded-full",
                                            stage.status === "completed" ? "bg-[#10b981]" : "bg-[#00f5ff]"
                                        )}
                                        initial={{ width: 0 }}
                                        animate={{ width: stage.status === "pending" ? "0%" : stage.status === "active" ? "60%" : "100%" }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </GlassPanel>
    );
}
