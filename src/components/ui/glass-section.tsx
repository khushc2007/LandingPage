import * as React from "react"
import { cn } from "@/src/lib/utils"

const GlassSection = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
    return (
        <section
            ref={ref}
            className={cn(
                "relative w-full py-20 px-6 md:px-12 lg:px-24",
                "overflow-hidden",
                className
            )}
            {...props}
        />
    )
})
GlassSection.displayName = "GlassSection"

export { GlassSection }
