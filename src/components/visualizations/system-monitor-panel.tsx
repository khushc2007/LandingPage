import { GlassPanel } from "@/src/components/ui/glass-panel";
import { cn } from "@/src/lib/utils";

export function SystemMonitorPanel({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <GlassPanel intensity="heavy" className={cn("p-1 relative overflow-hidden", className)}>
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00f5ff]/50 rounded-tl-xl m-2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00f5ff]/50 rounded-tr-xl m-2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00f5ff]/50 rounded-bl-xl m-2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00f5ff]/50 rounded-br-xl m-2 pointer-events-none" />

            {/* Grid container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
                {children}
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
        </GlassPanel>
    );
}
