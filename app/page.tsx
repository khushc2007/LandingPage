"use client"

import dynamic from "next/dynamic"
import SmoothScroll from "@/components/water-iq/smooth-scroll"
import Navbar from "@/components/water-iq/navbar"
import HeroSection from "@/components/water-iq/hero-section"
import ProblemSection from "@/components/water-iq/problem-section"
import SolutionSection from "@/components/water-iq/solution-section"
import SystemBreakdown from "@/components/water-iq/system-breakdown"
import DashboardPreview from "@/components/water-iq/dashboard-preview"
import ProductApplications from "@/components/water-iq/product-applications"
import SustainabilitySection from "@/components/water-iq/sustainability-section"
import VisionSection from "@/components/water-iq/vision-section"
import SectionDivider from "@/components/water-iq/section-divider"

// Lazy load heavy 3D/visualization components for performance
const TankSimulationSection = dynamic(
  () => import("@/components/water-iq/tank-simulation-section"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Loading 3D Model</span>
        </div>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        {/* Hero — clean gradient, no Three.js canvas */}
        <HeroSection />

        <div className="relative z-10 bg-background">
          <SectionDivider />
          <ProblemSection />
          <SectionDivider />
          <SolutionSection />
          <SectionDivider />

          {/* Interactive 3D tank viewer — lazy loaded */}
          <TankSimulationSection />
          <SectionDivider />

          <SystemBreakdown />
          <SectionDivider />
          <DashboardPreview />
          <SectionDivider />
          <ProductApplications />
          <SectionDivider />
          <SustainabilitySection />
          <SectionDivider />
          <VisionSection />
        </div>
      </main>
    </SmoothScroll>
  )
}
