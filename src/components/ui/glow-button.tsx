import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface GlowButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "ghost";
    size?: "sm" | "md" | "lg";
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {

        const baseClasses = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden group"

        const sizeClasses = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-8 text-base",
            lg: "h-14 px-10 text-lg"
        }

        const variantClasses = {
            primary: cn(
                "bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30",
                "hover:bg-[#00f5ff]/20 hover:border-[#00f5ff]/60 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
            ),
            secondary: cn(
                "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/30",
                "hover:bg-[#3b82f6]/20 hover:border-[#3b82f6]/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            ),
            accent: cn(
                "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30",
                "hover:bg-[#10b981]/20 hover:border-[#10b981]/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            ),
            ghost: cn(
                "bg-transparent text-foreground hover:bg-white/5",
            )
        }

        return (
            <button
                ref={ref}
                className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{props.children}</span>
                {variant !== 'ghost' && (
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                )}
            </button>
        )
    }
)
GlowButton.displayName = "GlowButton"

export { GlowButton }
