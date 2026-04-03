# Mobile Pen Poses — Design Spec

**Date:** 2026-04-03  
**Status:** Approved

---

## Problem

The 3D pen model is displaced off-screen on mobile viewports (≤767px) when navigating through product-intro sections. The hero section is fine (pen centered at x=0). The issue is confined to the section poses in `PEN_POSES`, which use large x offsets (±1.2) designed for desktop layouts where a content card occupies one side.

On a narrow viewport, x=±1.2 pushes the pen fully or partially outside the canvas.

---

## Goal

Mobile-specific pen poses for all product-intro sections: pen stays within the visible frame with a light directional offset (±0.25–0.35) that preserves each section's distinct character, without affecting desktop or tablet behavior.

---

## Approach

**`MOBILE_PEN_POSES`** — a parallel pose object in `penPoses.ts` with the same keys as `PEN_POSES`. The two hooks that write to `penTargetRef` (`useSnapScroll`, `useScrollHijack`) select between pose sets based on `isMobile`. `HeroScene` and `HeroCanvas` require zero changes.

---

## File Changes

### 1. `lib/three/penPoses.ts`

Add `MOBILE_PEN_POSES` export (same type as `PEN_POSES`). Rotations are identical to desktop — only position and camera are adjusted for the narrower viewport.

| Section | Desktop pos | Mobile pos | Camera change |
|---------|-------------|------------|---------------|
| bridge | [0, 0.15, -1.0] | [0, 0.1, -0.5] | z: 5.5→5.0 |
| aiWriting | [-1.2, -0.1, 0] | [-0.3, -0.1, 0] | fov: 28→30, cam x: 0.1→0.05 |
| smartSync | [1.2, 0, 0] | [0.3, 0, 0] | cam x: -0.1→-0.05 (slight centering) |
| focusMode | [0, 1.1, -0.5] | [0, 0.5, -0.3] | z: 3.8→4.0, fov: 25→27 |
| cta | [1.0, 0.6, -0.5] | [0.25, 0.2, -0.3] | unchanged |

All lighting configs are inherited unchanged from `PEN_POSES`.

### 2. `hooks/useSnapScroll.ts`

Add `isMobile: boolean` to `UseSnapScrollProps`. In `updatePenPose`, select:

```typescript
const poses = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
penTargetRef.current = poses[SECTION_TO_POSE[sectionId]];
```

### 3. `hooks/useScrollHijack.ts`

Add `isMobile: boolean` to `UseScrollHijackProps`. In `playEnter` and the focusMode→cta transition, select:

```typescript
const poses = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
penTargetRef.current = poses[sectionId];
```

### 4. `components/hero/HeroSection.tsx`

Pass `isMobile` (already available) to both hooks:

```typescript
useScrollHijack({ scope: productIntroContainerRef, penTargetRef, reducedMotion: !enableScrollNarrative, isMobile });
useSnapScroll({ heroRef: sectionRef, containerRef: productIntroContainerRef, penTargetRef, reducedMotion: !enableScrollNarrative, isMobile });
```

---

## What Does NOT Change

- `HeroCanvas.tsx` — no new props
- `HeroScene.tsx` — no new props, no logic change
- All section components — no changes
- `heroSceneConfig.ts` — hero base pose unchanged
- Desktop and tablet behavior — unaffected

---

## Verification

1. `bun run build` — no compile errors
2. DevTools mobile emulation at 375px:
   - Bridge: pen centered, slightly receded
   - AI Writing: pen lightly left, fully visible
   - Smart Sync: pen lightly right, fully visible
   - Focus Mode: pen centered, not floating above frame
   - CTA: pen slightly right, not clipped
3. Desktop 1440px — all poses unchanged
4. Tablet 768px — all poses unchanged (not mobile breakpoint)
5. `prefers-reduced-motion` — no regressions
