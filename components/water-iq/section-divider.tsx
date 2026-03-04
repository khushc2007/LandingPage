"use client"

export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-primary/40" />
    </div>
  )
}
