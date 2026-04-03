"use client";

import { RefObject, MutableRefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap/registerGsap";
import { PEN_POSES, MOBILE_PEN_POSES, PenPose } from "@/lib/three/penPoses";

type UseScrollHijackProps = {
  scope: RefObject<HTMLElement | null>;
  penTargetRef: MutableRefObject<PenPose | null>;
  reducedMotion: boolean;
  isMobile: boolean;
};

/**
 * Fires free-running GSAP enter animations when each section enters the
 * viewport. Works alongside useSnapScroll — navigation is driven by snap,
 * this hook only handles content reveal/hold animations.
 *
 * No pin, no scrub. Animations play automatically on section arrival.
 */
export default function useScrollHijack({ scope, penTargetRef, reducedMotion, isMobile }: UseScrollHijackProps) {
  useGSAP(() => {
    if (reducedMotion) return;
    if (!scope.current) return;

    const sections = scope.current.querySelectorAll("[data-scroll-section]");
    if (!sections.length) return;

    sections.forEach((el) => {
      const sectionId = el.getAttribute("data-scroll-section");

      // ── Query content elements ──
      const glow = el.querySelector(".section-glow");
      const editorialCard = el.querySelector(".editorial-card");
      const label = el.querySelector(".section-label");
      const headlines = el.querySelectorAll(".section-headline-line");
      const body = el.querySelector(".section-body");
      const details = el.querySelector(".section-details");
      const stat = el.querySelector(".section-stat");

      // Set initial hidden state so elements start invisible
      const hideable = [glow, editorialCard, label, ...Array.from(headlines), body, details, stat].filter(Boolean);
      gsap.set(hideable, { opacity: 0, y: 0 });

      const playEnter = () => {
        // Update pen pose when section enters
        if (sectionId) {
          // Cast to Record<string, PenPose> to avoid TypeScript narrowing issues
          // caused by MOBILE_PEN_POSES not having the "hero" key.
          const poses: Record<string, PenPose> = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
          if (poses[sectionId]) penTargetRef.current = poses[sectionId];
        }

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (glow) {
          tl.fromTo(glow, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }, 0);
        }

        if (editorialCard) {
          tl.fromTo(editorialCard, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5 }, 0.05);
        }

        if (label) {
          tl.fromTo(label, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4 }, 0.1);
        }

        if (headlines.length) {
          tl.fromTo(
            headlines,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
            0.18,
          );
        }

        if (body) {
          tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.32);
        }

        if (details) {
          tl.fromTo(details, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.42);
        }

        if (stat) {
          tl.fromTo(stat, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35 }, 0.52);
        }
      };

      const playExit = () => {
        const exitables = [stat, details, body, ...Array.from(headlines), label, editorialCard, glow].filter(Boolean);
        gsap.to(exitables, { opacity: 0, y: -16, duration: 0.3, stagger: 0.03, ease: "power2.inOut" });
      };

      // ScrollTrigger fires mid-snap (top 55%) so content starts revealing
      // during the programmatic scroll animation — feels like the section
      // "catches" the user on arrival
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom top",
        onEnter: playEnter,
        onEnterBack: playEnter,
        onLeave: playExit,
        onLeaveBack: playExit,
      });
    });

    // focusMode → CTA pen pose when scrolling past focus section
    const focusModeEl = Array.from(sections).find(
      (e) => e.getAttribute("data-scroll-section") === "focusMode",
    );
    if (focusModeEl) {
      ScrollTrigger.create({
        trigger: focusModeEl,
        start: "bottom 50%",
        onEnter: () => {
          penTargetRef.current = isMobile ? MOBILE_PEN_POSES.cta : PEN_POSES.cta;
        },
        onLeaveBack: () => {
          penTargetRef.current = isMobile ? MOBILE_PEN_POSES.focusMode : PEN_POSES.focusMode;
        },
      });
    }
  }, { scope, dependencies: [reducedMotion, isMobile, penTargetRef] });
}
