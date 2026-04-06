'use client';

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerGsap";

type UseHeroTimelineProps = {
  scope: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  scrollProgressRef: { current: number };
  enableScrollNarrative: boolean;
};

export default function useHeroTimeline({
  scope,
  reducedMotion,
  scrollProgressRef,
  enableScrollNarrative,
}: UseHeroTimelineProps): void {
  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(
          [
            ".hero-scene-layer",
            ".hero-headline-line",
            ".hero-subheadline",
            ".hero-cta",
            ".hero-scroll-cue",
            ".hero-support-copy",
          ],
          {
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
          },
        );
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      timeline
        .fromTo(".hero-scene-layer", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.8 })
        .fromTo(
          ".hero-headline-line",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(".hero-subheadline", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-scroll-cue", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.1");

      if (!enableScrollNarrative) {
        return;
      }

      const setHeadlineScale = gsap.quickSetter(".hero-headline", "scale");
      const setHeadlineOpacity = gsap.quickSetter(".hero-headline", "opacity");
      const setSubheadlineOpacity = gsap.quickSetter(".hero-subheadline", "opacity");
      const setSubheadlineY = gsap.quickSetter(".hero-subheadline", "y", "px");
      const setSupportCopyOpacity = gsap.quickSetter(".hero-support-copy", "opacity");
      const setSupportCopyY = gsap.quickSetter(".hero-support-copy", "y", "px");
      const setCtaPrimaryScale = gsap.quickSetter(".hero-cta-primary", "scale");
      const setCtaSecondaryOpacity = gsap.quickSetter(".hero-cta-secondary", "opacity");
      const setScrollCueOpacity = gsap.quickSetter(".hero-scroll-cue", "opacity");
      const setCtaOpacity = gsap.quickSetter(".hero-cta", "opacity");

      const applyScrollProgress = () => {
        const progress = scrollProgressRef.current;

        // Hero content fades out fully by ~60% scroll — clean handoff to bridge
        const fadeOut = Math.max(0, 1 - progress * 2.5);
        const aggressiveFade = Math.max(0, 1 - progress * 4);
        // CTA fades only in the final 20% of scroll range (handoff to next section)
        const ctaFade = Math.max(0, 1 - Math.max(0, progress - 0.8) * 5);

        setHeadlineScale(1 - progress * 0.08);
        setHeadlineOpacity(fadeOut);
        setSubheadlineOpacity(fadeOut);
        setSubheadlineY(-progress * 30);
        const supportCopyFadeIn = Math.max(0, Math.min(1, (progress - 0.20) / 0.20));
        const supportCopyFadeOut = Math.max(0, Math.min(1, (0.60 - progress) / 0.20));
        setSupportCopyOpacity(supportCopyFadeIn * supportCopyFadeOut);
        setSupportCopyY((1 - progress) * 10);
        setCtaPrimaryScale(1 + progress * 0.04);
        setCtaSecondaryOpacity(fadeOut);
        setScrollCueOpacity(aggressiveFade);
        // CTA stays accessible throughout scroll — only fades at very end (>80%)
        setCtaOpacity(ctaFade);
      };

      gsap.ticker.add(applyScrollProgress);

      return () => {
        gsap.ticker.remove(applyScrollProgress);
      };
    },
    { scope, dependencies: [reducedMotion, enableScrollNarrative], revertOnUpdate: true },
  );
}
