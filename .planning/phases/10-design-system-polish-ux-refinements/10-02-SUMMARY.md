---
plan: 10-02
phase: 10
subsystem: scroll-ux, 3d-scene
tags: [snap-scroll, pen-poses, scroll-trigger, gsap, three-js]
dependency_graph:
  requires: []
  provides: [snap-scroll-release, about-pen-pose, about-scroll-trigger]
  affects: [useSnapScroll, penPoses, useScrollHijack]
tech_stack:
  added: []
  patterns: [early-return guard before preventDefault, GSAP ScrollTrigger.create for out-of-scope element]
key_files:
  modified:
    - src/hooks/useSnapScroll.ts
    - src/lib/three/penPoses.ts
    - src/hooks/useScrollHijack.ts
decisions:
  - Guard placed as FIRST line of handleWheel (before e.preventDefault()) to allow native browser scroll passthrough
  - MOBILE_PEN_POSES cast to Record<string, PenPose> for TypeScript satisfies narrowing compatibility
metrics:
  duration: ~5 minutes
  completed: 2026-04-06T21:13:25Z
  tasks_completed: 3
  files_modified: 3
---

# Phase 10 Plan 02: Home Scroll Fix + About Pen Pose Summary

## One-liner

Early-return wheel guard in useSnapScroll releases natural scroll past last section; `about` pen pose (cyan accent #00e5ff) added to PEN_POSES + MOBILE_PEN_POSES; GSAP ScrollTrigger wires pen transition on `#about` section entry.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix useSnapScroll.ts to release on last section | 6ec32a9 | src/hooks/useSnapScroll.ts |
| 2 | Add `about` pose to penPoses.ts | 6ec32a9 | src/lib/three/penPoses.ts |
| 3 | Wire AboutSection ScrollTrigger in useScrollHijack.ts | 6ec32a9 | src/hooks/useScrollHijack.ts |

## Changes Made

### Task 1 — useSnapScroll.ts fix

Added guard as the very first line of `handleWheel`, before `e.preventDefault()`:

```typescript
const handleWheel = (e: WheelEvent) => {
  // If at last section and scrolling down, release to natural scroll
  if (currentIndex === targets.length - 1 && e.deltaY > 0) return;
  e.preventDefault();
  ...
```

This allows the native browser wheel event to propagate when the user is at the last snap section and scrolls down, enabling natural scroll to `AboutSection`. Placing it before `preventDefault()` is critical — after would be a no-op.

### Task 2 — penPoses.ts: `about` pose

Added to `PEN_POSES`:
- `pen: { rotation: [0.35, -0.2, 0.08], position: [-0.5, -0.3, 0] }` — tilted forward, platform-overview energy
- `camera: { position: [0, 0.05, 5.0], fov: 26 }` — pulled back slightly
- `lighting.accent: { position: [-1, 0.5, 2], color: "#00e5ff", intensity: 0.5 }` — cyan accent

Added to `MOBILE_PEN_POSES`:
- `pen: { rotation: [0.3, -0.15, 0.06], position: [0, 0.5, -0.2] }` — mobile variant
- `camera: { position: [0, 0.1, 4.8], fov: 30 }` — standard mobile FOV
- `lighting.accent: { position: [-1, 0.5, 2], color: "#00e5ff", intensity: 0.45 }` — slightly softer

`PoseName = keyof typeof PEN_POSES` auto-includes `about` — no type change needed.

### Task 3 — useScrollHijack.ts: About ScrollTrigger

Added after the existing `focusMode` ScrollTrigger block:

```typescript
const aboutEl = document.getElementById('about');
if (aboutEl) {
  ScrollTrigger.create({
    trigger: aboutEl,
    start: "top 60%",
    onEnter: () => {
      penTargetRef.current = isMobile ? (MOBILE_PEN_POSES as Record<string, PenPose>).about : PEN_POSES.about;
    },
    onLeaveBack: () => {
      penTargetRef.current = isMobile ? MOBILE_PEN_POSES.cta : PEN_POSES.cta;
    },
  });
}
```

Uses `document.getElementById('about')` (out of snap scope) rather than `querySelectorAll("[data-scroll-section]")`. Cast needed for mobile because `satisfies Record<string, PenPose>` causes TypeScript to narrow `MOBILE_PEN_POSES` type to only its literal keys.

## Validation Results

- `bun run tsc --noEmit` → 0 errors ✅
- `bun run lint` → 0 errors (104 warnings only in pre-existing third-party minified file) ✅
- `bun run vitest --run` → 27/27 tests pass ✅

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None — no new network endpoints, auth paths, or security surface introduced.

## Self-Check: PASSED

- src/hooks/useSnapScroll.ts — modified ✅
- src/lib/three/penPoses.ts — modified ✅
- src/hooks/useScrollHijack.ts — modified ✅
- Commit 6ec32a9 — confirmed ✅
