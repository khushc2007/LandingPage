import * as React from "react"
import { cn } from "@/src/lib/utils"

const GlassNavbar = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & {
        sticky?: boolean;
    }
>(({ className, sticky = true, ...props }, ref) => {
    return (
        <nav
            ref={ref}
            className={cn(
                "w-full z-50 transition-all duration-300",
                sticky ? "fixed top-0 left-0 right-0" : "relative",
                "bg-[var(--glass-bg)]/80 backdrop-blur-xl border-b border-[var(--glass-border)]",
                className
            )}
            {...props}
        />
    )
})
GlassNavbar.displayName = "GlassNavbar"

export { GlassNavbar }
