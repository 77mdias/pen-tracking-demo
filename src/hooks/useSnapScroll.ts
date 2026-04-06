"use client";

import { RefObject, MutableRefObject, useEffect } from "react";
import { gsap } from "@/lib/gsap/registerGsap";
import { PEN_POSES, MOBILE_PEN_POSES, PenPose, PoseName } from "@/lib/three/penPoses";
import { SCROLL_HIJACK_CONFIG } from "@/lib/gsap/scrollHijackConfig";

type UseSnapScrollProps = {
  heroRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  penTargetRef: MutableRefObject<PenPose | null>;
  disableSnapScroll: boolean;
  isMobile: boolean;
};

/** Maps data-scroll-section values to PEN_POSES keys */
const SECTION_TO_POSE: Record<string, PoseName> = {
  bridge: "bridge",
  aiWriting: "aiWriting",
  smartSync: "smartSync",
  focusMode: "focusMode",
  cta: "cta",
};

/**
 * Intercepts wheel and touch events and snaps the page to the
 * nearest section. A single small scroll gesture is enough to
 * trigger a strong programmatic throw to the next section.
 *
 * Pen pose is updated immediately on navigation so the 3D lerp
 * plays during the scroll animation — no hard cut.
 */
export default function useSnapScroll({
  heroRef,
  containerRef,
  penTargetRef,
  disableSnapScroll,
  isMobile,
}: UseSnapScrollProps) {
  useEffect(() => {
    if (disableSnapScroll) return;
    if (!heroRef.current || !containerRef.current) return;

    const { threshold, touchThreshold, duration, ease, cooldown } =
      SCROLL_HIJACK_CONFIG.snap;

    // Build ordered list of snap targets: hero first, then all data-scroll-section elements
    const sectionEls = Array.from(
      containerRef.current.querySelectorAll("[data-scroll-section]"),
    ) as HTMLElement[];
    const targets: HTMLElement[] = [heroRef.current, ...sectionEls];

    let currentIndex = 0;
    let isTransitioning = false;
    let touchStartY = 0;
    let scrollTween: ReturnType<typeof gsap.to> | null = null;

    const updatePenPose = (index: number) => {
      if (index === 0) {
        // Hero: null lets HeroScene use its scroll-driven defaults
        penTargetRef.current = null;
        return;
      }
      const sectionId = targets[index].getAttribute("data-scroll-section");
      if (sectionId && SECTION_TO_POSE[sectionId]) {
        // Cast to Record<string, PenPose> to avoid TypeScript narrowing issues
        // caused by MOBILE_PEN_POSES not having the "hero" key.
        const poses: Record<string, PenPose> = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
        penTargetRef.current = poses[SECTION_TO_POSE[sectionId]];
      }
    };

    const navigateTo = (index: number) => {
      if (isTransitioning) return;
      const clamped = Math.max(0, Math.min(targets.length - 1, index));
      if (clamped === currentIndex) return;

      isTransitioning = true;
      currentIndex = clamped;

      // Update pen pose immediately so 3D lerp plays during scroll animation
      updatePenPose(currentIndex);

      // Kill any in-progress tween to prevent stacking
      if (scrollTween) scrollTween.kill();

      scrollTween = gsap.to(window, {
        scrollTo: { y: targets[currentIndex], offsetY: 0 },
        duration,
        ease,
        onComplete: () => {
          // Hold the lock for cooldown ms to absorb trackpad momentum
          setTimeout(() => {
            isTransitioning = false;
            scrollTween = null;
          }, cooldown);
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      // If at last section and scrolling down, release to natural scroll
      if (currentIndex === targets.length - 1 && e.deltaY > 0) return;
      e.preventDefault();
      if (isTransitioning) return;
      const { deltaY } = e;
      if (Math.abs(deltaY) < threshold) return;
      navigateTo(currentIndex + (deltaY > 0 ? 1 : -1));
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < touchThreshold) return;
      navigateTo(currentIndex + (delta > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (scrollTween) scrollTween.kill();
    };
  }, [disableSnapScroll, heroRef, containerRef, penTargetRef, isMobile]);
}
