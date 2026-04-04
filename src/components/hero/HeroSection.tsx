'use client';

import dynamic from "next/dynamic";
import { useRef } from "react";
import HeroAmbientDetails from "@/components/hero/HeroAmbientDetails";
import HeroContent from "@/components/hero/HeroContent";
import HeroFallback from "@/components/hero/HeroFallback";
import HeroScrollCue from "@/components/hero/HeroScrollCue";
import VideoBackground from "@/components/hero/VideoBackground";
import useDeviceCapabilities from "@/hooks/useDeviceCapabilities";
import useHeroScrollProgress from "@/hooks/useHeroScrollProgress";
import useScrollHijack from "@/hooks/useScrollHijack";
import useSnapScroll from "@/hooks/useSnapScroll";
import type { PenPose } from "@/lib/three/penPoses";
import useHeroTimeline from "@/hooks/useHeroTimeline";
import useMediaQuery from "@/hooks/useMediaQuery";
import useReducedMotion from "@/hooks/useReducedMotion";
import useMobilePenPoses from "@/hooks/useMobilePenPoses";

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

export default function HeroSection({ children }: { children?: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const productIntroContainerRef = useRef<HTMLDivElement>(null);
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
  
  const penTargetRef = useRef<PenPose | null>(null);

  // Content reveal animations (enter/exit) per section
  useScrollHijack({
    scope: productIntroContainerRef,
    penTargetRef,
    reducedMotion: !enableScrollNarrative,
    isMobile,
  });

  // Wheel/touch snap navigation between sections
  useSnapScroll({
    heroRef: sectionRef,
    containerRef: productIntroContainerRef,
    penTargetRef,
    reducedMotion: !enableScrollNarrative,
    isMobile,
  });

  // On mobile the full scroll narrative is disabled, but we still want the pen
  // to move to the correct pose as the user scrolls through feature sections.
  useMobilePenPoses({
    containerRef: productIntroContainerRef,
    penTargetRef,
    isMobile,
    reducedMotion,
  });

  useHeroTimeline({ scope: sectionRef, reducedMotion, scrollProgressRef, enableScrollNarrative });

  return (
    <div className="relative w-full bg-[var(--color-bg)]">
      {/* Base background restricted to the Hero's initial height */}
      <div className={`absolute top-0 left-0 right-0 z-0 overflow-hidden ${isMobile ? "h-[92svh]" : "h-screen"}`} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,123,255,0.14),transparent_52%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/50 to-transparent" />
      </div>

      <div className="hero-scene-layer absolute inset-0 z-[1] pointer-events-none">
        <div className="sticky top-0 h-screen w-full pointer-events-auto">
          <VideoBackground className="z-[0]" />
          {shouldUseFallback ? (
            <HeroFallback className="absolute inset-0 z-[1]" reducedMotion={reducedMotion} />
          ) : (
            <HeroCanvas
              reducedMotion={reducedMotion}
              enablePointerParallax={enablePointerParallax}
              scrollProgressRef={scrollProgressRef}
              penTargetRef={penTargetRef}
              motionScale={motionScale}
              maxDpr={isMobile ? Math.min(recommendedMaxDpr, 1.5) : recommendedMaxDpr}
              tier={isMobile ? "medium" : tier}
            />
          )}
        </div>
      </div>

      <section
        ref={sectionRef}
        id="experience"
        className={`relative z-[10] scroll-mt-28 text-white ${
          isMobile ? "h-[92svh]" : "h-screen"
        }`}
      >
        <div className="noise-overlay z-[19]" aria-hidden />

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

      <div className="relative z-[10] w-full" ref={productIntroContainerRef}>
        {children}
      </div>
    </div>
  );
}
