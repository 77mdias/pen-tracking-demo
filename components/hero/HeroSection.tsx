'use client';

import dynamic from "next/dynamic";
import { useRef } from "react";
import HeroAmbientDetails from "@/components/hero/HeroAmbientDetails";
import HeroContent from "@/components/hero/HeroContent";
import HeroFallback from "@/components/hero/HeroFallback";
import HeroMobile from "@/components/hero/HeroMobile";
import HeroScrollCue from "@/components/hero/HeroScrollCue";
import useDeviceCapabilities from "@/hooks/useDeviceCapabilities";
import useHeroScrollProgress from "@/hooks/useHeroScrollProgress";
import useHeroTimeline from "@/hooks/useHeroTimeline";
import useMediaQuery from "@/hooks/useMediaQuery";
import useReducedMotion from "@/hooks/useReducedMotion";

const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="relative -translate-y-2">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#007bff]/35 to-cyan-400/10 blur-3xl" />
        <div className="glass-panel relative flex h-[340px] w-[340px] items-center justify-center rounded-full md:h-[420px] md:w-[420px]">
          <div className="h-[46%] w-[46%] rounded-full border border-white/20 bg-gradient-to-b from-white/12 to-transparent shadow-[0_0_90px_rgba(0,123,255,0.3)]" />
        </div>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { tier, supportsWebGL, recommendedMaxDpr } = useDeviceCapabilities();
  const shouldUseFallback = !supportsWebGL;
  const enableScrollNarrative = !reducedMotion && !isMobile && !shouldUseFallback;
  const motionScale = isTablet ? 0.65 : tier === "medium" ? 0.82 : tier === "low" ? 0.5 : 1;
  const enablePointerParallax = !reducedMotion && !isMobile && hasFinePointer && isDesktop && tier !== "low";
  const scrollProgressRef = useHeroScrollProgress({
    scope: sectionRef,
    reducedMotion: !enableScrollNarrative,
  });

  useHeroTimeline({ scope: sectionRef, reducedMotion, scrollProgressRef, enableScrollNarrative });

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-[var(--color-bg)] text-white ${
        isMobile ? "h-[92svh]" : "h-screen"
      }`}
    >
      <div className="noise-overlay z-[19]" aria-hidden />

      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,123,255,0.14),transparent_52%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/50 to-transparent" />
      </div>

      <div className="hero-scene-layer absolute inset-0 z-[1]">
        {shouldUseFallback ? (
          <HeroFallback className="absolute inset-0" reducedMotion={reducedMotion} />
        ) : isMobile ? (
          <HeroMobile className="absolute inset-0" reducedMotion={reducedMotion} />
        ) : (
          <HeroCanvas
            reducedMotion={reducedMotion}
            enablePointerParallax={enablePointerParallax}
            scrollProgressRef={scrollProgressRef}
            motionScale={motionScale}
            maxDpr={recommendedMaxDpr}
            tier={tier}
          />
        )}
      </div>

      <div
        className={`relative z-[10] mx-auto flex h-full w-full max-w-7xl px-6 ${
          isMobile
            ? "items-start justify-center pt-24 pb-12"
            : isTablet
              ? "items-center justify-center py-10"
              : "items-center justify-center"
        }`}
      >
        <HeroContent isMobile={isMobile} isTablet={isTablet} />
      </div>

      {!isMobile && tier !== "low" && !reducedMotion ? <HeroAmbientDetails /> : null}
      {!isMobile && !reducedMotion ? <HeroScrollCue /> : null}
    </section>
  );
}
