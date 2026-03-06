"use client"

import dynamic from "next/dynamic"
import SmoothScroll from "@/src/components/sections/smooth-scroll"
import Navbar from "@/src/components/sections/navbar"
import HeroSection from "@/src/components/sections/hero-section"

// Lazy load heavy visuals to improve performance and stop layout shift
const ProblemSection = dynamic(() => import("@/src/components/sections/problem-section"))
const SolutionSection = dynamic(() => import("@/src/components/sections/solution-section"))
const TechnologyReveal = dynamic(() => import("@/src/components/sections/technology-reveal"))
const SystemBreakdown = dynamic(() => import("@/src/components/sections/system-breakdown"))
const FiltrationIntelligence = dynamic(() => import("@/src/components/sections/filtration-intelligence"))
const TechnologySection = dynamic(() => import("@/src/components/sections/technology-section"))
const DashboardPreview = dynamic(() => import("@/src/components/sections/dashboard-preview"))
const SustainabilitySection = dynamic(() => import("@/src/components/sections/sustainability-section"))
const VisionSection = dynamic(() => import("@/src/components/sections/vision-section"))
const ProductApplications = dynamic(() => import("@/src/components/sections/product-applications"))
const SectionDivider = dynamic(() => import("@/src/components/sections/section-divider"))

const WaterParticles = dynamic(
  () => import("@/src/components/sections/water-particles"),
  { ssr: false }
)

import { ScrollReveal } from "@/src/components/animations/scroll-reveal"

export default function Home() {
  return (
    <SmoothScroll>
      <WaterParticles />
      <Navbar />
      <main className="relative z-10">
        <ScrollReveal duration={1.2}>
          <HeroSection />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <ProblemSection />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <SolutionSection />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <TechnologyReveal />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <SystemBreakdown />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <FiltrationIntelligence />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <TechnologySection />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <DashboardPreview />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <ProductApplications />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <SustainabilitySection />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <VisionSection />
        </ScrollReveal>
      </main>
    </SmoothScroll>
  )
}
