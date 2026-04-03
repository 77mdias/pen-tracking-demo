"use client";

import { RefObject, MutableRefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap/registerGsap";
import { PEN_POSES, PenPose } from "@/lib/three/penPoses";
import { SCROLL_HIJACK_CONFIG } from "@/lib/gsap/scrollHijackConfig";

type UseScrollHijackProps = {
  scope: RefObject<HTMLElement | null>;
  penTargetRef: MutableRefObject<PenPose | null>;
  reducedMotion: boolean;
};

export default function useScrollHijack({ scope, penTargetRef, reducedMotion }: UseScrollHijackProps) {
  useGSAP(() => {
    if (reducedMotion) return;
    if (!scope.current) return;

    const sections = scope.current.querySelectorAll("[data-scroll-section]");
    if (!sections.length) return;

    sections.forEach((el) => {
      const sectionId = el.getAttribute("data-scroll-section") as keyof typeof SCROLL_HIJACK_CONFIG.pinExtraScrollVh;
      if (!sectionId || !PEN_POSES[sectionId as keyof typeof PEN_POSES]) return;

      const endValue = SCROLL_HIJACK_CONFIG.pinExtraScrollVh[sectionId];

      // Pin the section
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${endValue}`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onEnter: () => {
          penTargetRef.current = PEN_POSES[sectionId as keyof typeof PEN_POSES];
        },
        onEnterBack: () => {
          penTargetRef.current = PEN_POSES[sectionId as keyof typeof PEN_POSES];
        },
      });

      // Content timeline (scrubbed with scroll)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${endValue}`,
          scrub: SCROLL_HIJACK_CONFIG.scrub,
        },
      });

      // --- Ambient glow fades in first ---
      const glow = el.querySelector(".section-glow");
      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" },
          0.05,
        );
      }

      // --- Label enters ---
      const label = el.querySelector(".section-label");
      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" },
          0.15,
        );
      }

      // --- Headlines stagger in ---
      const headlines = el.querySelectorAll(".section-headline-line");
      if (headlines.length) {
        tl.fromTo(
          headlines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.14, stagger: 0.05, ease: "power2.out" },
          0.20,
        );
      }

      // --- Body text ---
      const body = el.querySelector(".section-body");
      if (body) {
        tl.fromTo(
          body,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.35,
        );
      }

      // --- Details (bullets/grid) ---
      const details = el.querySelector(".section-details");
      if (details) {
        tl.fromTo(
          details,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
          0.45,
        );
      }

      // --- Stat accent ---
      const stat = el.querySelector(".section-stat");
      if (stat) {
        tl.fromTo(
          stat,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" },
          0.55,
        );
      }

      // --- Exit: fade everything out together ---
      const exitElements: Element[] = [];
      if (glow) exitElements.push(glow);
      if (label) exitElements.push(label);
      if (headlines.length) exitElements.push(...Array.from(headlines));
      if (body) exitElements.push(body);
      if (details) exitElements.push(details);
      if (stat) exitElements.push(stat);

      if (exitElements.length) {
        tl.to(
          exitElements,
          { opacity: 0, y: -20, duration: 0.08, ease: "power1.in" },
          0.88,
        );
      }
    });

    // Handle leaving the last section focusMode to transition to CTA
    const focusModeEl = Array.from(sections).find(e => e.getAttribute("data-scroll-section") === "focusMode");
    if (focusModeEl) {
      ScrollTrigger.create({
        trigger: focusModeEl,
        start: "top top",
        end: `+=${SCROLL_HIJACK_CONFIG.pinExtraScrollVh.focusMode}`,
        onLeave: () => {
          penTargetRef.current = PEN_POSES.cta;
        },
        onEnterBack: () => {
          penTargetRef.current = PEN_POSES.focusMode;
        }
      });
    }
  }, { scope, dependencies: [reducedMotion, penTargetRef] });
}

