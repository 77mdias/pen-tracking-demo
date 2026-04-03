/**
 * Scroll Hijack Configuration
 *
 * Timing model aligned with SCROLL_NARRATIVE_CONTINUITY_SPEC:
 *   0–20%   ENTER   (content fades in, staggered)
 *  20–60%   HOLD    (fully visible, reading window)
 *  60–85%   EXIT    (content fades out, reverse stagger)
 *  85–100%  BUFFER  (clean slate before next section)
 */
export const SCROLL_HIJACK_CONFIG = {
  pinExtraScrollVh: {
    bridge: "180vh",     // centered text needs generous hold time
    aiWriting: "200vh",  // needs hold time for card + bullet list
    smartSync: "200vh",
    focusMode: "200vh",
  },

  // Scrub smoothing (higher = more inertia/smoothing, 0 = instant)
  scrub: 0.6,

  // Timeline phase boundaries (0–1 normalized)
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
