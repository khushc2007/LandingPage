"use client"

import SmoothScroll from "@/components/water-iq/smooth-scroll"
import Navbar from "@/components/water-iq/navbar"
import HeroSection from "@/components/water-iq/hero-section"
import ProblemSection from "@/components/water-iq/problem-section"
import SolutionSection from "@/components/water-iq/solution-section"
import SystemBreakdown from "@/components/water-iq/system-breakdown"
import DashboardPreview from "@/components/water-iq/dashboard-preview"
import ProductApplications from "@/components/water-iq/product-applications"
import VisionSection from "@/components/water-iq/vision-section"
import SectionDivider from "@/components/water-iq/section-divider"

export default function Home() {
  return (
    <SmoothScroll>
      {/* WaterParticles intentionally removed: Three.js hero scene includes ambient particles */}
      <Navbar />
      <main>
        {/* Hero — full height Three.js cinematic section */}
        <HeroSection />

        {/* Remaining sections — z-index above Three.js canvas ends here */}
        <div className="relative z-10 bg-background">
          <SectionDivider />
          <ProblemSection />
          <SectionDivider />
          <SolutionSection />
          <SectionDivider />
          <SystemBreakdown />
          <SectionDivider />
          <DashboardPreview />
          <SectionDivider />
          <ProductApplications />
          <SectionDivider />
          <VisionSection />
        </div>
      </main>
    </SmoothScroll>
  )
}
