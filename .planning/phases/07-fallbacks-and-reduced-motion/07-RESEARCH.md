# Phase 7: Fallbacks and Reduced Motion — Research

**Researched:** 2026-04-06
**Domain:** Accessibility, progressive enhancement, CSS/GSAP/R3F motion gating
**Confidence:** HIGH — all findings verified directly in source code; no external library research needed

---

## Summary

Phase 7 delivers graceful degradation across three dimensions: a premium non-WebGL HeroFallback visual, full `prefers-reduced-motion` compliance, and a keyboard/ARIA accessibility pass. The codebase from Phases 1–6 already does substantial work in all three areas — this phase is primarily gap-closing, not greenfield.

**WebGL fallback** is already gated correctly (`shouldUseFallback = !supportsWebGL`), but the `HeroFallback.tsx` component it shows is a stub-quality abstract glass circle. The text/CTA layer renders correctly on top (HeroContent/HeroMobile is independent of the scene layer), so only the background visual needs upgrading. The `animation.mp4` video exists at `/public/videos/` and is already wired into HeroFallback — it just needs more prominent visual treatment (currently opacity-40 + mix-blend-screen makes it invisible).

**Reduced motion** is largely complete: GSAP timeline immediately sets all elements to final state, R3F `frameloop="demand"` freezes the 3D, scroll progress returns 0, VideoBackground and HeroFallback `autoPlay` are gated, HeroAmbientDetails/HeroScrollCue are hidden, and CSS decorative animations (`border-gradient-spin`, `liquid-blob`, `floating-badge`) are all stopped via `@media (prefers-reduced-motion: reduce)`. The primary gap is CSS `transition` properties on interactive elements (button hover states) — these are NOT disabled in the media query block.

**Accessibility** has focus rings on both CTA buttons (`focus-visible:ring-2`), `aria-hidden` on decorative layers, and correct semantic structure. Two gaps: (1) the disclaimer text in HeroCTA uses `text-zinc-600` which fails WCAG AA contrast (2.56:1 on `#050a14`, needs ≥4.5:1 for normal text); (2) the hero `<section>` element lacks an `aria-label`; (3) `HeroScrollCue` renders visible text "Scroll Down" without `aria-hidden`, meaning it's announced to screen readers but is not interactive.

**Primary recommendation:** Work plan-by-plan: 07-01 upgrades HeroFallback's visual layer; 07-02 adds the CSS transition kill-switch and validates HeroMobile `reducedMotion` gate; 07-03 fixes the zinc-600 contrast failure and adds missing ARIA attributes.

---

## Standard Stack

No new libraries needed. Phase 7 uses only existing stack.

| System | Already In Use | Phase 7 Role |
|--------|---------------|-------------|
| CSS `@media (prefers-reduced-motion: reduce)` | `globals.css` line 271 | Extend to cover `transition` kill-switch |
| GSAP `reducedMotion` guard in `useHeroTimeline` | `useHeroTimeline.ts` line 20 | Verified complete — no changes |
| R3F `frameloop="demand"` | `HeroCanvas.tsx` | Verified complete — no changes |
| `useReducedMotion` hook | All consumers | Verified correct and SSR-safe |
| `useDeviceCapabilities.supportsWebGL` | `HeroSection.tsx` | Verified complete — no changes |

---

## Architecture Patterns

### Existing Architecture: Two-Layer Hero

The hero is composed of two independent layers:

```
HeroSection
├── hero-scene-layer (absolute, z-1, pointer-events: auto)
│   └── sticky top-0 h-screen
│       ├── VideoBackground (blurred bg video, opacity 0.28, aria-hidden)
│       └── shouldUseFallback
│           ├── TRUE → HeroFallback (class="absolute inset-0 z-1")
│           └── FALSE → HeroCanvas (R3F 3D scene)
│
└── <section id="experience"> (relative, z-10)
    └── isMobile
        ├── TRUE → HeroMobile (text+CTA layer)
        └── FALSE → HeroContent (text+CTA layer, desktop+tablet)
```

**Critical insight for Plan 07-01:** `HeroFallback` is the **background/visual layer only**. The text and CTA always render in the section layer regardless of WebGL support. The fallback only needs to improve the pen visual representation — not add content.

### Pattern: Reduced Motion Guard (Verified Pattern)

```typescript
// Source: src/hooks/useHeroTimeline.ts — verified
useGSAP(() => {
  if (reducedMotion) {
    gsap.set([".hero-scene-layer", ".hero-headline-line", /* ... */], {
      opacity: 1, y: 0, yPercent: 0, scale: 1,
    });
    return; // ← no timeline created
  }
  // ... timeline setup
}, { scope, dependencies: [reducedMotion, enableScrollNarrative], revertOnUpdate: true });
```

### Pattern: R3F Reduced Motion Freeze

```typescript
// Source: src/components/hero/HeroCanvas.tsx — verified
<Canvas frameloop={reducedMotion ? "demand" : "always"} ... />
```

With `frameloop="demand"`, R3F only renders when `invalidate()` is called. Since no pointer events or clock-driven callbacks fire, the 3D scene is fully static when `reducedMotion=true`.

### Pattern: CSS Animation Kill-Switch (Partial — Gap Found)

```css
/* Source: src/app/globals.css line 271 — verified */
@media (prefers-reduced-motion: reduce) {
  .liquid-blob,
  .border-gradient-spin::before,
  .floating-badge,
  .floating-badge-center,
  .fade-slide-in {
    animation: none !important;
  }
  /* ❌ GAP: No transition kill-switch for button hover states */
}
```

**Gap:** CSS `transition-all duration-150` on primary CTA button and `transition-all duration-200` on secondary CTA button are not disabled. The fix is a universal kill-switch:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

⚠️ **Note:** This broad selector disables ALL transitions globally including layout/focus ones. If some transitions are critical for usability, use targeted selectors instead. For this project, all transitions are purely decorative (button hover aesthetics), so the broad approach is safe.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WebGL detection | Custom detection code | `useDeviceCapabilities.supportsWebGL` | Already implemented, cached, SSR-safe |
| Reduced motion detection | `useEffect` + `matchMedia` | `useReducedMotion()` hook | Already wraps `useMediaQuery`, reactive, SSR-safe |
| GSAP context cleanup | Manual `ctx.revert()` | `useGSAP` from `@gsap/react` | Auto-cleanup with `revertOnUpdate: true` |
| Per-frame 3D freeze | Custom pause logic | R3F `frameloop="demand"` | R3F native — zero frames when no invalidation |

---

## Current State Audit: What's Done vs. What's Missing

### Reduced Motion — Complete ✅

| System | File | Status |
|--------|------|--------|
| GSAP timeline immediate-set | `useHeroTimeline.ts:20` | ✅ Done |
| R3F frameloop pause | `HeroCanvas.tsx` | ✅ Done |
| Scroll progress frozen at 0 | `useHeroScrollProgress.ts` | ✅ Done |
| Scroll narrative disabled | `HeroSection.tsx:45` | ✅ Done (`enableScrollNarrative = !reducedMotion && ...`) |
| Pointer parallax disabled | `HeroSection.tsx:47` | ✅ Done |
| Idle float disabled in R3F | `HeroScene.tsx` | ✅ Done (`if (!reducedMotion)` guard) |
| VideoBackground autoPlay | `VideoBackground.tsx` | ✅ Done |
| HeroFallback autoPlay | `HeroFallback.tsx` | ✅ Done |
| HeroScrollCue hidden | `HeroSection.tsx:136` | ✅ Done |
| HeroAmbientDetails hidden | `HeroSection.tsx:135` | ✅ Done |
| CSS: border-gradient-spin | `globals.css:284` | ✅ Done |
| CSS: liquid-blob | `globals.css:283` | ✅ Done |
| CSS: floating-badge | `globals.css:285` | ✅ Done |
| CSS: button transitions | `globals.css` | ❌ **MISSING** — button hover transitions not disabled |
| HeroMobile reducedMotion gate | `HeroMobile.tsx` | ⚠️ **STUB** — prop accepted as `void reducedMotion`, no entrance animation yet (Phase 7 will add one) |

### Accessibility — Partially Complete

| Item | File | Status |
|------|------|--------|
| Primary CTA focus ring | `HeroCTA.tsx:15` | ✅ `focus-visible:ring-2 ring-[#ef233c] ring-offset-black` |
| Secondary CTA focus ring | `HeroCTA.tsx:24` | ✅ `focus-visible:ring-2 ring-white ring-offset-black` |
| `aria-hidden` on VideoBackground | `VideoBackground.tsx:15` | ✅ |
| `aria-hidden` on noise-overlay | `HeroSection.tsx:117` | ✅ |
| `aria-hidden` on HeroAmbientDetails | `HeroAmbientDetails.tsx:5` | ✅ |
| `aria-hidden` on HeroCanvas wrapper | `HeroCanvas.tsx` | ❌ **MISSING** — canvas div has no `aria-hidden` |
| `<section>` aria-label | `HeroSection.tsx:119` | ❌ **MISSING** — `<section id="experience">` has no `aria-label` |
| HeroScrollCue aria-hidden | `HeroScrollCue.tsx` | ❌ **MISSING** — "Scroll Down" text exposed to screen readers but non-interactive |
| Disclaimer text contrast | `HeroCTA.tsx:29` | ❌ **FAILS WCAG AA** — see contrast section |

### HeroFallback Visual — Stub Quality

| Item | Current State | Target State |
|------|--------------|-------------|
| Background | Radial gradient + blurred video (opacity-40, mix-blend-screen) | More prominent video (opacity-65+, no blend-screen) or static pen image |
| Pen visual | Abstract glass circle + inner circle | Pen silhouette or more prominent video showing pen |
| Content/CTA | ✅ Renders separately (HeroContent/HeroMobile layer) | No change needed |
| reducedMotion + fallback | Video paused, static circle | Static pen image as `<img>` provides instant value |

---

## Contrast Audit

Computed against `#050a14` (page background):

| Text Color | Hex | Contrast Ratio | WCAG AA Normal (4.5:1) | WCAG AA Large (3:1) | Status |
|-----------|-----|---------------|----------------------|---------------------|--------|
| `text-white` | `#ffffff` | 19.81:1 | ✅ Pass | ✅ Pass | OK |
| `text-zinc-300` | `#d4d4d8` | 13.40:1 | ✅ Pass | ✅ Pass | OK |
| `text-zinc-400` | `#a1a1aa` | 7.73:1 | ✅ Pass | ✅ Pass | OK |
| `text-zinc-600` | `#52525b` | 2.56:1 | ❌ **FAIL** | ❌ FAIL | **Fix needed** |
| Primary red `#ef233c` | — | 4.69:1 | ✅ Pass | ✅ Pass | OK |
| Primary blue `#007bff` | — | 4.98:1 | ✅ Pass | ✅ Pass | OK |

**`text-zinc-600` failure location:** `HeroCTA.tsx:29` — disclaimer paragraph "Limited early access to the demo system."
**Fix:** Change `text-zinc-600` → `text-zinc-500` (still fails at 3.34:1) or `text-zinc-400` (7.73:1 ✅).
**Recommendation: `text-zinc-400`** — sufficient improvement without changing visual hierarchy.

---

## Plan-by-Plan Research Detail

### 07-01: HeroFallback Visual Upgrade

**Context:** `HeroFallback.tsx` renders inside the `hero-scene-layer` when `supportsWebGL=false`. The text/CTA overlay (HeroContent or HeroMobile) renders independently above it. The fallback only needs to provide the pen visual.

**Current visual anatomy:**
```tsx
// HeroFallback.tsx — current
<div className={className}>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,...)]" />
  <video src="/videos/animation.mp4" autoPlay={!reducedMotion} loop muted playsInline ... opacity-40 mix-blend-screen />
  <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/55 to-transparent" />
  <div className="absolute inset-0 flex items-center justify-center px-8">
    <div className="glass-panel ... rounded-full">  {/* Abstract circle — stub */}
      <div className="h-28 w-28 rounded-full border border-white/20" />  {/* Inner circle */}
    </div>
  </div>
</div>
```

**Problem:** `opacity-40 mix-blend-screen` on the video makes the pen animation nearly invisible. The glass circle is an abstract placeholder, not a pen.

**Video asset confirmed:** `/public/videos/animation.mp4` (1.2MB) — exists and is the 3D pen animation used throughout the site.

**Static image available:** `product-intro-bridge.jpeg` in project root — could serve as pen hero image if it shows the pen (not verified, but available).

**Upgrade strategy:**
1. Remove `mix-blend-screen` from video
2. Increase video opacity to ~0.65
3. Replace abstract glass circle with a more defined pen silhouette shape OR a static `<img src="/images/pen-hero.jpg" />` if a suitable pen image is added to public/
4. When `reducedMotion=true`, show a static poster frame (use `poster` attribute on video pointing to a pre-extracted frame, or use the `<img>` fallback)

**Premium video fallback pattern** (replacing the glass circle):
```tsx
{/* Replace glass circle with: more prominent video + optional static img */}
<div className="absolute inset-0 flex items-center justify-center">
  {/* Pen spotlight glow — matches R3F lighting feel */}
  <div className="h-72 w-72 rounded-full bg-gradient-to-b from-[#007bff]/20 via-transparent to-transparent blur-2xl" />
</div>
```

**When `reducedMotion=true` + fallback:** Video doesn't autoplay → scene appears as the static radial gradient + glow. This is intentionally minimal and works for accessibility. No fix needed.

### 07-02: Reduced Motion Audit

**What is already complete** (do NOT rewrite): See "Current State Audit" table above.

**Gap 1 — CSS transition kill-switch (MUST FIX):**
HeroCTA buttons have `transition-all duration-150` and `transition-all duration-200` which fire on hover even when reduced motion is preferred. Add to `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Existing animation: none block is fine; ADD: */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Gap 2 — HeroMobile entrance animation (future-proofing):**
`HeroMobile.tsx` currently accepts `reducedMotion` but does nothing with it (`void reducedMotion`). When Phase 7 adds an entrance animation to HeroMobile, the gate is already in place. The task for 07-02 is to:
1. Add a simple entrance animation to HeroMobile (stagger badge → CTA → headline → subheadline via GSAP, same pattern as HeroContent)
2. Gate it with `if (reducedMotion) { gsap.set(...visible...); return; }`

**This is the correct time to add HeroMobile entrance animation** — Phase 6 deferred it as "Phase 7/8 polish."

**Verification for 07-02:**
- Toggle `prefers-reduced-motion: reduce` in Chrome DevTools (Rendering tab)
- Confirm: no GSAP animation plays, no button hover transitions, no border-spin, no floating badges, video paused, R3F static
- Confirm: all text immediately visible, CTA immediately prominent

### 07-03: Accessibility Pass

**Focus rings (already done — verify only):**
- Primary CTA: `focus-visible:ring-2 focus-visible:ring-[#ef233c] focus-visible:ring-offset-2 focus-visible:ring-offset-black` ✅
- Secondary CTA: `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black` ✅
- HeroMobile CTA: uses `<HeroCTA isMobile={true} />` — same rings ✅

**ARIA fixes needed:**
1. `<section id="experience">` → add `aria-label="Hero — Join the Private Beta"`
2. Canvas `div` in `HeroCanvas.tsx` → add `aria-hidden="true"` to the wrapper div (the canvas itself renders WebGL, which is inherently inaccessible to screen readers)
3. `HeroScrollCue` → add `aria-hidden="true"` (it's `pointer-events-none`, decorative, and already hidden for `reducedMotion` users; screen readers shouldn't announce "Scroll Down" since no scroll action is expected via keyboard)

**Contrast fix:**
- `HeroCTA.tsx:29`: `text-zinc-600` → `text-zinc-400`
- No other contrast failures found.

**Tab order (verify only — no changes expected):**
Desktop tab order: badge (non-interactive) → h1 (non-interactive) → p (non-interactive) → [primary CTA button] → [secondary CTA button] → HeroScrollCue (non-interactive). Correct.
Mobile tab order: badge → [CTA button] → h1 → subheadline. Correct (CTA first matches CTA-first layout).

---

## Common Pitfalls

### Pitfall 1: Rewriting What Already Works
**What goes wrong:** Over-scoping Phase 7 by rewriting the reduced-motion system from scratch.
**Why it happens:** The "full audit" description sounds like greenfield work.
**How to avoid:** The audit is brownfield — verify each item against the state table above, only fix actual gaps.
**Warning signs:** If a plan task says "implement useReducedMotion" — that's already done.

### Pitfall 2: HeroFallback Receives className but Has Broken Layout
**What goes wrong:** Changing HeroFallback internals without checking how className is applied externally.
**Why it happens:** `HeroSection.tsx:94` passes `className="absolute inset-0 z-[1]"` to HeroFallback's root div. The fallback's internal absolute-positioned children depend on this outer div being positioned.
**How to avoid:** Never remove or change the `className` prop application on HeroFallback's root div.

### Pitfall 3: CSS `transition: none !important` Breaking Focus Rings
**What goes wrong:** A broad `transition-duration: 0.01ms !important` disables focus ring transitions that appear instantaneously on browser-default focus styling.
**Why it happens:** `focus-visible:ring-2` itself is not a transition — it's an instant style change. So this is safe.
**How to avoid:** Test keyboard navigation after adding the CSS kill-switch. Focus rings appear without transition animation — that's correct behavior.

### Pitfall 4: Video Without Poster Shows Black Frame
**What goes wrong:** When `reducedMotion=true` and video `autoPlay=false`, the video shows a black frame before any data loads.
**Why it happens:** `preload="metadata"` loads enough to show the first frame in most browsers, but initial paint may be black if the browser is slow.
**How to avoid:** Add `poster="/videos/pen-poster.jpg"` attribute to the video element in HeroFallback. This requires either extracting a frame from `animation.mp4` or using an available image. The radial gradient background already provides a fallback if poster is absent.

### Pitfall 5: Two Systems Conflicting on HeroMobile Entrance
**What goes wrong:** Using Framer Motion for HeroMobile entrance while GSAP manages HeroContent entrance — creates two different animation systems for the same role.
**Why it happens:** HeroMobile was built as a component stub (Phase 6) without animation.
**How to avoid:** Use `useGSAP` from `@gsap/react` for HeroMobile entrance, matching the pattern from `useHeroTimeline.ts`. Never use Framer Motion for element-level entrance animations already owned by GSAP.

---

## Code Examples

### Verified Pattern: GSAP Enter with reducedMotion Gate (from useHeroTimeline)
```typescript
// Source: src/hooks/useHeroTimeline.ts — verified
useGSAP(() => {
  if (reducedMotion) {
    gsap.set([".hero-headline-line", ".hero-subheadline", ".hero-cta"], {
      opacity: 1, y: 0, yPercent: 0, scale: 1,
    });
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(".hero-headline-line", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 });
  // ...
}, { scope, dependencies: [reducedMotion], revertOnUpdate: true });
```

### Verified Pattern: HeroMobile Component Signature (Phase 6 output)
```tsx
// Source: src/components/hero/HeroMobile.tsx — verified (Phase 6 stub)
export default function HeroMobile({ reducedMotion = false }) {
  void reducedMotion; // Phase 7: replace void with animation gate
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center px-6">
      {/* 1. badge → 2. CTA → 3. headline → 4. subheadline */}
    </div>
  );
}
```

### Target Pattern: HeroMobile Entrance Animation (Phase 7 implementation)
```typescript
// Pattern to follow in HeroMobile.tsx (matches HeroContent pattern)
const containerRef = useRef<HTMLDivElement>(null);
useGSAP(() => {
  if (reducedMotion) {
    gsap.set([".hero-headline", ".hero-subheadline", ".hero-cta"], {
      opacity: 1, y: 0,
    });
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(".hero-headline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")
    .fromTo(".hero-subheadline", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
}, { scope: containerRef, dependencies: [reducedMotion] });
```

### Target Pattern: CSS Transition Kill-Switch
```css
/* Add INSIDE existing @media (prefers-reduced-motion: reduce) block in globals.css */
*, *::before, *::after {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

### Target Pattern: ARIA on HeroSection
```tsx
// HeroSection.tsx — add aria-label to section
<section
  ref={sectionRef}
  id="experience"
  aria-label="Hero — Join the Private Beta"
  className={`relative z-[10] ...`}
>
```

### Target Pattern: HeroCanvas aria-hidden
```tsx
// HeroCanvas.tsx — add aria-hidden to outer wrapper
<div className="absolute inset-0" aria-hidden="true">
  <Canvas ... />
</div>
```

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.2 |
| Config file | `vitest.config.ts` |
| Quick run command | `bun run test` |
| Full suite command | `bun run test` (same — only unit tests exist) |

### Phase 7 Behavior → Test Map

Phase 7 requirements are primarily visual/behavioral and cannot be unit-tested with Vitest alone. The validation strategy is lint + build + manual verification.

| Behavior | Test Type | Automated Command | Notes |
|----------|-----------|-------------------|-------|
| Lint clean after changes | lint | `bun run lint` | Required after each plan |
| Build clean after changes | build | `bun run build` | Required after each plan |
| Reduced motion CSS | Manual | DevTools Rendering tab | Toggle "Emulate CSS media feature prefers-reduced-motion" |
| Contrast fix | Manual | Browser DevTools accessibility | Inspect computed contrast |
| ARIA attributes | Manual | axe DevTools or VoiceOver | Check announcements |
| Focus tab order | Manual | Tab key navigation | All CTAs reachable via keyboard |
| HeroFallback visual | Manual | Spoof canvas failure in DevTools | Set `supportsWebGL=false` in `useDeviceCapabilities.ts` temporarily |

### Wave 0 Gaps
None — existing test infrastructure (Vitest) covers all automatable requirements. Phase 7 verification is primarily manual/visual.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 7 is code-only changes (TypeScript/CSS/React components). No external tools, services, or databases required beyond the existing `bun` toolchain.

---

## Security Domain

Phase 7 involves no authentication, data handling, cryptography, or API calls. Security enforcement is not applicable to this phase.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `animation.mp4` shows the pen 3D animation (not an abstract motion graphic) | 07-01 HeroFallback | If the video doesn't show the pen, the upgrade strategy must use a different visual approach — either a static pen image extracted from the GLB or a CSS/SVG pen silhouette |
| A2 | `product-intro-bridge.jpeg` (root level) is a suitable pen hero image | 07-01 HeroFallback | If this image doesn't show the pen in a premium way, a dedicated pen poster image must be added to `public/` |

---

## Open Questions

1. **Should HeroFallback video be more prominent, or should a static pen image be added?**
   - What we know: `animation.mp4` exists (1.2MB), likely shows the pen, already wired into HeroFallback
   - What's unclear: Whether the video's visual quality (720p vs 1080p) and content makes a premium impression when shown more prominently
   - Recommendation: Planner should default to "make video more prominent" (remove mix-blend-screen, raise opacity to 0.65, remove the abstract glass circle). If the video shows the pen clearly, this is the premium path. Keep glass circle removal as a firm call.

2. **HeroMobile entrance animation — GSAP scope approach?**
   - What we know: HeroContent uses `useHeroTimeline` hook with `scope: sectionRef` (the whole section). HeroMobile is a child component without its own scope ref.
   - What's unclear: Should HeroMobile entrance be added to `useHeroTimeline` (as a new branch when `isMobile`) or inside HeroMobile itself with its own `useRef` scope?
   - Recommendation: Add a local `useRef` + `useGSAP` inside `HeroMobile` — keeps it self-contained, consistent with the `void reducedMotion` forward-compat stub pattern from Phase 6.

---

## Sources

### PRIMARY (HIGH confidence — verified in source code)
- `src/components/hero/HeroFallback.tsx` — full component analysis
- `src/components/hero/HeroSection.tsx` — fallback gate, reducedMotion propagation
- `src/components/hero/HeroCTA.tsx` — focus ring implementation, contrast values
- `src/hooks/useHeroTimeline.ts` — reduced motion GSAP guard
- `src/hooks/useReducedMotion.ts` — hook implementation
- `src/hooks/useDeviceCapabilities.ts` — WebGL detection and caching
- `src/components/hero/HeroCanvas.tsx` — R3F frameloop pause
- `src/components/hero/HeroScene.tsx` — idle/parallax reducedMotion guards
- `src/app/globals.css:271` — existing `@media (prefers-reduced-motion: reduce)` block
- Contrast ratios calculated programmatically against WCAG 2.1 formula [VERIFIED: computed via node script in this session]

### SECONDARY (MEDIUM confidence)
- `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md` — T7.1/T7.2/T7.3 acceptance criteria
- `HERO_IMPLEMENTATION_PLAYBOOK.md` Phase 7 task breakdown
- `AGENTS.md` — accessibility requirements section

---

## Metadata

**Confidence breakdown:**
- Reduced motion current state: HIGH — every item verified by direct code read
- Accessibility gaps: HIGH — contrast computed, ARIA verified by code inspection
- HeroFallback upgrade strategy: MEDIUM — video content assumed (not watched), `product-intro-bridge.jpeg` suitability assumed
- Architecture patterns: HIGH — traced through full component tree

**Research date:** 2026-04-06
**Valid until:** Phase 8 start (this research covers a closed scope — only 3 files to create/modify)
