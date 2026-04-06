---
plan: 07-01
phase: 7
subsystem: hero-fallback
tags: [fallback, accessibility, webgl, video, aria]
dependency_graph:
  requires: []
  provides: [premium-hero-fallback, accessible-canvas]
  affects: [HeroFallback, HeroCanvas, HeroSection]
tech_stack:
  added: []
  patterns: [video-fallback, aria-hidden-decorative, gradient-glow-layer]
key_files:
  created: []
  modified:
    - src/components/hero/HeroFallback.tsx
    - src/components/hero/HeroCanvas.tsx
decisions:
  - "Video opacity raised from 40% to 70% without mix-blend-screen for clear visibility"
  - "Abstract glass circle replaced with soft blue gradient glow to match R3F rim lighting aesthetic"
  - "aria-hidden=true added to HeroCanvas wrapper — 3D canvas is decorative, not interactive"
metrics:
  duration: "~5 minutes"
  completed: "2026-04-06"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 2
---

# Phase 7 Plan 01: HeroFallback — Premium Non-WebGL Visual Summary

**One-liner:** Upgraded HeroFallback from stub-quality opacity-40 blended video to a premium opacity-70 pen animation with spotlight glow, plus aria-hidden on HeroCanvas wrapper.

## What Was Built

Two targeted improvements to the hero fallback path:

1. **HeroFallback visual upgrade** (`HeroFallback.tsx`): The video was nearly invisible at `opacity-40 mix-blend-screen`. Removed the blend mode and raised opacity to `opacity-70`, making the pen animation prominently visible. Removed the abstract glass circle placeholder. Added a soft blue radial gradient glow (`from-[#007bff]/20`) that mimics the R3F scene's rim lighting, creating visual continuity between the WebGL and fallback paths. Added `preload="auto"` when motion is enabled for faster first-frame load.

2. **HeroCanvas accessibility** (`HeroCanvas.tsx`): Added `aria-hidden="true"` to the outermost wrapper div, marking the 3D canvas as decorative content that screen readers should skip entirely.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Upgrade HeroFallback video + replace glass circle | c0b46dc |
| 2 | Add aria-hidden to HeroCanvas wrapper | da2a011 |

## Deviations from Plan

None — plan executed exactly as written.

## Acceptance Criteria Check

- [x] `HeroFallback` video is visible at `opacity-70` without `mix-blend-screen`
- [x] Abstract glass circle is removed, replaced by soft blue gradient glow
- [x] Video does not autoplay when `reducedMotion=true` (existing behavior preserved)
- [x] `HeroCanvas` outer div has `aria-hidden="true"`
- [x] `className` prop still applied to HeroFallback root div (not broken)
- [x] `bun run lint` passes with 0 errors
- [x] `bun run build` succeeds

## Self-Check: PASSED
