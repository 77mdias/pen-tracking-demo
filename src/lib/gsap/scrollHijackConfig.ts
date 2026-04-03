/**
 * Scroll Hijack Configuration
 *
 * Navigation model: snap-per-section.
 * Any scroll gesture above `snap.threshold` immediately navigates to
 * the next/prev section via programmatic gsap.to(window, { scrollTo }).
 *
 * Content animation timing (phases) is still used by useScrollHijack
 * for the free-running enter timelines, but no longer tied to scroll delta.
 *
 * Animation model:
 *   ENTER  — content fades in (staggered, ~0.6s)
 *   HOLD   — fully visible while user is on section
 *   (EXIT is implicit — next section's enter covers it)
 */
export const SCROLL_HIJACK_CONFIG = {
  snap: {
    /** Minimum wheel deltaY (px) to trigger a section snap */
    threshold: 30,
    /** Minimum touch swipe distance (px) to trigger a section snap */
    touchThreshold: 40,
    /** GSAP scrollTo animation duration in seconds */
    duration: 0.85,
    /** Easing: strong throw + smooth deceleration */
    ease: "power3.inOut",
    /** Lock time in ms after animation completes (prevents double-fire) */
    cooldown: 900,
  },

  // Timeline phase boundaries (0–1 normalized), used for enter animation timing
  phases: {
    enterStart: 0,
    enterEnd: 0.20,
    holdStart: 0.20,
    holdEnd: 0.60,
    exitStart: 0.60,
    exitEnd: 0.85,
    bufferStart: 0.85,
  },
} as const;
