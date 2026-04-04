"use client";

import { RefObject, MutableRefObject, useEffect } from "react";
import { MOBILE_PEN_POSES } from "@/lib/three/penPoses";
import type { PenPose } from "@/lib/three/penPoses";

type UseMobilePenPosesProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  penTargetRef: MutableRefObject<PenPose | null>;
  isMobile: boolean;
  reducedMotion: boolean;
};

/**
 * On mobile, the main scroll-hijack/snap system is disabled for performance.
 * This hook uses IntersectionObserver to detect which feature section is
 * currently in view and updates the pen pose accordingly.
 *
 * Only active on mobile (≤767px) and when reducedMotion is false.
 */
export default function useMobilePenPoses({
  containerRef,
  penTargetRef,
  isMobile,
  reducedMotion,
}: UseMobilePenPosesProps) {
  useEffect(() => {
    if (!isMobile || reducedMotion) return;
    if (!containerRef.current) return;

    const sections = Array.from(
      containerRef.current.querySelectorAll("[data-scroll-section]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible intersecting section
        let best: { ratio: number; sectionId: string | null } = {
          ratio: 0,
          sectionId: null,
        };

        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > best.ratio
          ) {
            best = {
              ratio: entry.intersectionRatio,
              sectionId: entry.target.getAttribute("data-scroll-section"),
            };
          }
        }

        if (best.sectionId) {
          const poses: Record<string, PenPose> = MOBILE_PEN_POSES;
          if (poses[best.sectionId]) {
            penTargetRef.current = poses[best.sectionId];
          }
        }
      },
      {
        // Trigger when at least 30% of the section is visible
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "0px",
      },
    );

    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isMobile, reducedMotion, containerRef, penTargetRef]);
}
