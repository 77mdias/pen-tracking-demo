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

/**
 * Scroll-hijack hook following the SCROLL_NARRATIVE_CONTINUITY_SPEC timing model:
 *
 *   0–20%   ENTER   — content fades in, staggered gently
 *  20–60%   HOLD    — everything fully visible (reading window)
 *  60–85%   EXIT    — content fades out in reverse stagger
 *  85–100%  BUFFER  — clean slate before next section pins
 *
 * Key principles:
 * - "Never hard cut" — sections overlap via pen pose crossfade
 * - "Text must enter, stay readable, exit slowly"
 * - "Scroll controls STATE, not every pixel animation"
 */
export default function useScrollHijack({ scope, penTargetRef, reducedMotion }: UseScrollHijackProps) {
  useGSAP(() => {
    if (reducedMotion) return;
    if (!scope.current) return;

    const sections = scope.current.querySelectorAll("[data-scroll-section]");
    if (!sections.length) return;

    const { phases } = SCROLL_HIJACK_CONFIG;

    // ── Compute enter/hold/exit durations from phase config ──
    const enterDuration = phases.enterEnd - phases.enterStart;     // 0.20
    const holdDuration = phases.holdEnd - phases.holdStart;         // 0.40
    const exitDuration = phases.exitEnd - phases.exitStart;         // 0.25

    sections.forEach((el) => {
      const sectionId = el.getAttribute("data-scroll-section") as keyof typeof SCROLL_HIJACK_CONFIG.pinExtraScrollVh;
      if (!sectionId || !PEN_POSES[sectionId as keyof typeof PEN_POSES]) return;

      const endValue = SCROLL_HIJACK_CONFIG.pinExtraScrollVh[sectionId];

      // ── Pin the section ──
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

      // ── Content timeline (scrubbed with scroll) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${endValue}`,
          scrub: SCROLL_HIJACK_CONFIG.scrub,
        },
      });

      // Query all content elements
      const glow = el.querySelector(".section-glow");
      const glassPanel = el.querySelector(".glass-panel");
      const label = el.querySelector(".section-label");
      const headlines = el.querySelectorAll(".section-headline-line");
      const body = el.querySelector(".section-body");
      const details = el.querySelector(".section-details");
      const stat = el.querySelector(".section-stat");

      // ────────────────────────────────
      // PHASE 1: ENTER (0 → 0.20)
      // Staggered reveal within the entry window
      // ────────────────────────────────

      // Glow leads — atmospheric setup
      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: enterDuration * 0.8, ease: "power2.out" },
          phases.enterStart,
        );
      }

      // Glass panel container fades in with content (prevents empty shell)
      if (glassPanel) {
        tl.fromTo(
          glassPanel,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: enterDuration * 0.75, ease: "power2.out" },
          phases.enterStart + enterDuration * 0.05,
        );
      }

      // Label arrives early
      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: enterDuration * 0.6, ease: "power2.out" },
          phases.enterStart + enterDuration * 0.10,
        );
      }

      // Headlines stagger in
      if (headlines.length) {
        tl.fromTo(
          headlines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: enterDuration * 0.55, stagger: enterDuration * 0.12, ease: "power2.out" },
          phases.enterStart + enterDuration * 0.25,
        );
      }

      // Body text
      if (body) {
        tl.fromTo(
          body,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: enterDuration * 0.50, ease: "power2.out" },
          phases.enterStart + enterDuration * 0.50,
        );
      }

      // Details (bullets/grid)
      if (details) {
        tl.fromTo(
          details,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: enterDuration * 0.50, ease: "power2.out" },
          phases.enterStart + enterDuration * 0.65,
        );
      }

      // Stat accent is last to arrive
      if (stat) {
        tl.fromTo(
          stat,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: enterDuration * 0.45, ease: "power2.out" },
          phases.enterStart + enterDuration * 0.80,
        );
      }

      // ────────────────────────────────
      // PHASE 2: HOLD (0.20 → 0.60)
      // Everything stays at full opacity.
      // We use a spacer tween to occupy timeline time.
      // ────────────────────────────────
      tl.to({}, { duration: holdDuration }, phases.holdStart);

      // ────────────────────────────────
      // PHASE 3: EXIT (0.60 → 0.85)
      // Reverse stagger — stat exits first, then details, body,
      // headlines, label. Glow lingers longest.
      // ────────────────────────────────

      // Stat exits first
      if (stat) {
        tl.to(
          stat,
          { opacity: 0, y: -16, duration: exitDuration * 0.30, ease: "power2.inOut" },
          phases.exitStart,
        );
      }

      // Details
      if (details) {
        tl.to(
          details,
          { opacity: 0, y: -20, duration: exitDuration * 0.30, ease: "power2.inOut" },
          phases.exitStart + exitDuration * 0.08,
        );
      }

      // Body
      if (body) {
        tl.to(
          body,
          { opacity: 0, y: -18, duration: exitDuration * 0.30, ease: "power2.inOut" },
          phases.exitStart + exitDuration * 0.16,
        );
      }

      // Headlines
      if (headlines.length) {
        tl.to(
          headlines,
          { opacity: 0, y: -24, duration: exitDuration * 0.35, stagger: exitDuration * 0.06, ease: "power2.inOut" },
          phases.exitStart + exitDuration * 0.28,
        );
      }

      // Label exits last
      if (label) {
        tl.to(
          label,
          { opacity: 0, y: -12, duration: exitDuration * 0.25, ease: "power2.inOut" },
          phases.exitStart + exitDuration * 0.50,
        );
      }

      // Glass panel fades out with content
      if (glassPanel) {
        tl.to(
          glassPanel,
          { opacity: 0, y: -20, duration: exitDuration * 0.35, ease: "power2.inOut" },
          phases.exitStart + exitDuration * 0.45,
        );
      }

      // Glow lingers and fades last for atmosphere
      if (glow) {
        tl.to(
          glow,
          { opacity: 0, scale: 0.9, duration: exitDuration * 0.40, ease: "power1.in" },
          phases.exitStart + exitDuration * 0.55,
        );
      }

      // ────────────────────────────────
      // PHASE 4: BUFFER (0.85 → 1.0)
      // Force timeline to exactly 1.0 duration so scroll
      // progress maps 1:1 to our phase positions.
      // ────────────────────────────────
      tl.to({}, { duration: 1 - phases.bufferStart }, phases.bufferStart);
    });

    // ── Handle focusMode → CTA pen pose transition ──
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
