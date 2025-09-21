"use client";

import { useRef } from "react";
import { FloatingDots } from "@/components/landing/FloatingDots";
import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeatureSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { CTASection } from "@/components/landing/CTASection";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const sections = ["Hero", "Features", "How It Works", "Timeline", "Join"];

  return (
    <>
      <div className="relative w-screen h-screen bg-black text-green-400 font-mono overflow-hidden">
        <FloatingDots sections={sections} containerRef={containerRef} />

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-x-auto md:overflow-y-hidden snap-x snap-mandatory scroll-smooth"
        >
          <Hero />
          <FeaturesSection />
          <HowItWorksSection />
          <TimelineSection />
          <CTASection />
        </div>

        <div className="absolute inset-0 pointer-events-none grid grid-cols-20 grid-rows-20 gap-[1px]">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="bg-green-900/10 border border-green-800/20 animate-pulse"
            />
          ))}
        </div>
      </div>
    </>
  );
}
