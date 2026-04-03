# Mobile Pen Poses Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile-specific 3D pen poses so the pen model stays visible and centered on narrow viewports (≤767px) without affecting desktop or tablet behavior.

**Architecture:** A parallel `MOBILE_PEN_POSES` object (same keys, same type as `PEN_POSES`) is added to `penPoses.ts`. The two hooks that write `penTargetRef` — `useSnapScroll` and `useScrollHijack` — receive an `isMobile` flag and select between pose sets. `HeroScene` and `HeroCanvas` are untouched.

**Tech Stack:** TypeScript, React Three Fiber, GSAP, Next.js App Router, `bun` as package manager.

---

## File Map

| File | Change |
|------|--------|
| `lib/three/penPoses.ts` | Add `MOBILE_PEN_POSES` export |
| `hooks/useSnapScroll.ts` | Add `isMobile` prop; use mobile poses in `updatePenPose` |
| `hooks/useScrollHijack.ts` | Add `isMobile` prop; use mobile poses in `playEnter` + focusMode→cta |
| `components/hero/HeroSection.tsx` | Pass `isMobile` to both hooks |

---

## Task 1 — Add `MOBILE_PEN_POSES` to `lib/three/penPoses.ts`

**Files:**
- Modify: `lib/three/penPoses.ts`

- [ ] **Step 1: Open the file and read current `PEN_POSES`**

  File: `lib/three/penPoses.ts`. Note: `PenPose` type and `PEN_POSES` are already exported. `MOBILE_PEN_POSES` uses the same `PenPose` type. It needs exactly 5 keys (same as the `data-scroll-section` values used in the product intro): `bridge`, `aiWriting`, `smartSync`, `focusMode`, `cta`. The `hero` key is deliberately omitted — the hero section is fine on mobile and uses `null` in `penTargetRef`.

- [ ] **Step 2: Append `MOBILE_PEN_POSES` after the existing `PEN_POSES` block**

  Rotations are **identical** to desktop — only `pen.position` and `camera` change.

  ```typescript
  /**
   * Mobile-specific pen poses (viewport ≤767px).
   * Rotations match desktop — only position and camera are adjusted
   * to keep the pen fully visible on narrow screens.
   * Hero pose omitted: hero uses null (scroll-driven defaults).
   */
  export const MOBILE_PEN_POSES = {
    bridge: {
      pen: { rotation: [0.0, 0.3, 0.0], position: [0, 0.1, -0.5] },
      camera: { position: [0, 0.2, 5.0], fov: 26 },
      lighting: { accent: null },
    },
    aiWriting: {
      pen: { rotation: [0.5, -0.4, 0.15], position: [-0.3, -0.1, 0] },
      camera: { position: [0.05, 0.25, 4.0], fov: 30 },
      lighting: {
        accent: { position: [0.5, 0.5, 1], color: "#ffbb33", intensity: 0.6 },
      },
    },
    smartSync: {
      pen: { rotation: [0.05, 1.2, 0.0], position: [0.3, 0, 0] },
      camera: { position: [-0.05, 0.1, 4.2], fov: 30 },
      lighting: {
        accent: { position: [-1, 1, -2], color: "#00bfff", intensity: 0.7 },
      },
    },
    focusMode: {
      pen: { rotation: [0.03, 0.0, 0.0], position: [0, 0.5, -0.3] },
      camera: { position: [0, 0.15, 4.0], fov: 27 },
      lighting: { accent: null },
    },
    cta: {
      pen: { rotation: [0.15, 0.5, 0.05], position: [0.25, 0.2, -0.3] },
      camera: { position: [0, 0.1, 4.5], fov: 28 },
      lighting: { accent: null },
    },
  } satisfies Record<string, PenPose>;
  ```

- [ ] **Step 3: Verify the build compiles**

  ```bash
  bun run build
  ```

  Expected: `✓ Compiled successfully` with no TypeScript errors. If you see a type error on the array literals, add `as [number, number, number]` casts to the tuple fields.

---

## Task 2 — Update `hooks/useSnapScroll.ts`

**Files:**
- Modify: `hooks/useSnapScroll.ts`

- [ ] **Step 1: Add `MOBILE_PEN_POSES` import**

  At the top of the file, update the import from `penPoses.ts`:

  ```typescript
  import { PEN_POSES, MOBILE_PEN_POSES, PenPose } from "@/lib/three/penPoses";
  ```

- [ ] **Step 2: Add `isMobile` to the props type**

  ```typescript
  type UseSnapScrollProps = {
    heroRef: RefObject<HTMLElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    penTargetRef: MutableRefObject<PenPose | null>;
    reducedMotion: boolean;
    isMobile: boolean;
  };
  ```

- [ ] **Step 3: Receive `isMobile` in the function signature**

  ```typescript
  export default function useSnapScroll({
    heroRef,
    containerRef,
    penTargetRef,
    reducedMotion,
    isMobile,
  }: UseSnapScrollProps) {
  ```

- [ ] **Step 4: Update `updatePenPose` to select the correct pose set**

  Replace the existing `updatePenPose` function body:

  ```typescript
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
  ```

- [ ] **Step 5: Verify the build compiles**

  ```bash
  bun run build
  ```

  Expected: `✓ Compiled successfully`. No changes to the hook's event logic.

---

## Task 3 — Update `hooks/useScrollHijack.ts`

**Files:**
- Modify: `hooks/useScrollHijack.ts`

- [ ] **Step 1: Add `MOBILE_PEN_POSES` import**

  At the top of the file, update the import from `penPoses.ts`:

  ```typescript
  import { PEN_POSES, MOBILE_PEN_POSES, PenPose } from "@/lib/three/penPoses";
  ```

- [ ] **Step 2: Add `isMobile` to the props type**

  ```typescript
  type UseScrollHijackProps = {
    scope: RefObject<HTMLElement | null>;
    penTargetRef: MutableRefObject<PenPose | null>;
    reducedMotion: boolean;
    isMobile: boolean;
  };
  ```

- [ ] **Step 3: Receive `isMobile` in the function signature**

  ```typescript
  export default function useScrollHijack({ scope, penTargetRef, reducedMotion, isMobile }: UseScrollHijackProps) {
  ```

- [ ] **Step 4: Update `playEnter` inside the `useGSAP` callback**

  Inside `useGSAP`, at the start of the `sections.forEach` loop, `playEnter` sets the pen pose. Replace the pose lookup line:

  ```typescript
  const playEnter = () => {
    // Update pen pose when section enters
    if (sectionId) {
      // Cast to Record<string, PenPose> to avoid TypeScript narrowing issues
      // caused by MOBILE_PEN_POSES not having the "hero" key.
      const poses: Record<string, PenPose> = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
      if (poses[sectionId]) penTargetRef.current = poses[sectionId];
    }
    // ... rest of the timeline animations (unchanged)
  ```

- [ ] **Step 5: Update the focusMode → CTA pen pose transition**

  At the bottom of `useGSAP`, the focusMode trigger sets `PEN_POSES.cta` on leave. Update it:

  ```typescript
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
  ```

- [ ] **Step 6: Verify the build compiles**

  ```bash
  bun run build
  ```

  Expected: `✓ Compiled successfully`.

---

## Task 4 — Wire `isMobile` in `components/hero/HeroSection.tsx`

**Files:**
- Modify: `components/hero/HeroSection.tsx`

- [ ] **Step 1: Pass `isMobile` to `useScrollHijack`**

  Find the existing `useScrollHijack` call and add `isMobile`:

  ```typescript
  useScrollHijack({
    scope: productIntroContainerRef,
    penTargetRef,
    reducedMotion: !enableScrollNarrative,
    isMobile,
  });
  ```

- [ ] **Step 2: Pass `isMobile` to `useSnapScroll`**

  Find the existing `useSnapScroll` call and add `isMobile`:

  ```typescript
  useSnapScroll({
    heroRef: sectionRef,
    containerRef: productIntroContainerRef,
    penTargetRef,
    reducedMotion: !enableScrollNarrative,
    isMobile,
  });
  ```

- [ ] **Step 3: Final build check**

  ```bash
  bun run build
  ```

  Expected output:
  ```
  ✓ Compiled successfully
  ✓ Generating static pages (4/4)
  ```

  If TypeScript reports an error about `isMobile` not being in the props type, double-check Tasks 2 and 3 were saved correctly.

---

## Verification Checklist

After the build passes:

- [ ] Open `http://localhost:3000` with DevTools → Device Toolbar → iPhone SE (375×667)
- [ ] Snap through each section and confirm:
  - **Bridge** — pen centered, slightly receded into the background, fully visible
  - **AI Writing** — pen lightly left (~¼ from center), no clipping on left edge
  - **Smart Sync** — pen lightly right (~¼ from center), no clipping on right edge
  - **Focus Mode** — pen centered vertically, not floating above the fold
  - **CTA** — pen slightly right, fully in frame
- [ ] Switch to desktop (1440px) — confirm all poses unchanged (pen still shifts hard left/right per section)
- [ ] Switch to 768px tablet — confirm desktop poses used (mobile breakpoint is `≤767px`)
- [ ] Enable `prefers-reduced-motion` in DevTools — confirm no animation regressions
