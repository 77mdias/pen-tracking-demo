# Phase 6: Responsive and Mobile - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning
**Source:** discuss-phase session

<domain>
## Phase Boundary

Phase 6 delivers a correct and premium hero experience across all device sizes. The existing desktop experience (Phase 1–5) is preserved. New work is:

1. A separate `HeroMobile` component for mobile (≤767px)
2. Routing logic in `HeroSection` to serve the mobile variant
3. Tablet behavior audit — confirm motionScale=0.65 is sufficient

**In scope:**
- `HeroMobile` component: separate, CTA-first layout, R3F canvas still active on mobile
- `HeroSection` routing: `isMobile → <HeroMobile>` instead of `<HeroContent>`
- Tablet audit: verify motionScale=0.65 coverage across all animation axes

**Out of scope (Phase 7+):**
- `prefers-reduced-motion` compliance (Phase 7)
- `HeroFallback` (non-WebGL path) improvements (Phase 7)
- Performance profiling (Phase 8)

</domain>

<decisions>
## Implementation Decisions

### HeroMobile Architecture

**Decision: Separate component — HeroMobile replaces HeroContent when isMobile**

- `HeroSection` routes: `isMobile ? <HeroMobile> : <HeroContent isTablet={isTablet} />`
- `HeroContent` becomes tablet+desktop only (clean, no mobile cruft)
- `HeroMobile` is a fully self-contained component with its own layout

### HeroMobile Visual Background

**Decision: Keep R3F canvas on mobile (current)**

- R3F canvas already renders on mobile with `tier:"medium"` and `maxDpr: min(1.5, recommendedMaxDpr)`
- `HeroMobile` does NOT add its own video background (canvas is still the bg layer from HeroSection)
- `HeroCanvas` continues to render via `HeroSection`'s existing canvas layer (no routing change there)
- `HeroMobile` provides ONLY the text/CTA DOM layer (replaces the role of `HeroContent` for mobile)

### HeroMobile Layout — CTA-first

**Decision: True CTA-first — CTA button at top, headline below**

Target layout (top-to-bottom, vertically centered in the mobile hero):
1. **Editorial badge** — "Smart Pen Premium Demo" (keep, brand element)
2. **CTA button** — "Join the Private Beta" (primary, large/full-width on mobile)
3. **Headline** — "The pen, reimagined." (below CTA, smaller than desktop)
4. **Subheadline** — short mobile copy (below headline)

No secondary CTA button on mobile (already excluded in HeroCTA — keep this).

### Tablet Behavior

**Decision: Planner's discretion — motionScale=0.65 is already fully applied**

`motionScale` already propagates to all 3D axes in HeroScene (idle Y, idle rotZ, pointer tilt, scroll rotation, scroll camera drift). No user-requested changes.

Planner should audit whether any content/DOM animations (GSAP in useHeroTimeline) are missing tablet-specific treatment. If gaps exist, planner decides the fix.

</decisions>

<code_context>
## Existing Code Relevant to Phase 6

### Already Implemented (do NOT rewrite)
- `src/hooks/useMediaQuery.ts` — `isMobile`, `isTablet`, `isDesktop` detection ✅
- `src/hooks/useDeviceCapabilities.ts` — `tier`, `supportsWebGL`, `recommendedMaxDpr` ✅
- `motionScale = isTablet ? 0.65 : tier === "medium" ? 0.82 : tier === "low" ? 0.5 : 1` in HeroSection ✅
- `HeroCanvas` renders on mobile with `tier:"medium"`, `maxDpr: min(1.5, recommendedMaxDpr)` ✅
- `enableScrollNarrative = !reducedMotion && !isMobile && !shouldUseFallback` (mobile scroll disabled ✅)
- `enablePointerParallax = !reducedMotion && !isMobile && hasFinePointer && isDesktop && tier !== "low"` ✅
- `useMobilePenPoses` — IntersectionObserver pen pose changes for mobile feature sections ✅

### HeroMobile.tsx — STUB (needs full rewrite)
Current file is a placeholder (video bg + circle). Must be replaced with the CTA-first layout.
File: `src/components/hero/HeroMobile.tsx`

### HeroSection.tsx — routing needs update
Currently passes `isMobile` to `HeroContent`. Target: route to `<HeroMobile>` when `isMobile`.
File: `src/components/hero/HeroSection.tsx` (lines ~117–130 — the content area div)

### HeroContent.tsx — remove isMobile logic after routing change
After `HeroMobile` takes over mobile, `HeroContent` no longer needs `isMobile` prop (cleanup).
File: `src/components/hero/HeroContent.tsx`

### Design tokens to use in HeroMobile
- Background: `#050a14`
- Editorial badge class: `border-gradient-spin inline-flex items-center gap-2 bg-black/60 px-4 py-1.5`
- Headline: `font-display font-semibold text-4xl leading-[0.9] tracking-tight text-white`
- CTA: reuse `<HeroCTA isMobile={true} />` (hides secondary button automatically)
- Use `font-inter` for body text

</code_context>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture
- `src/components/hero/HeroSection.tsx` — routing source of truth (isMobile gate)
- `src/components/hero/HeroMobile.tsx` — stub to replace
- `src/components/hero/HeroContent.tsx` — will need isMobile cleanup after routing change
- `src/components/hero/HeroCTA.tsx` — reuse as-is (`isMobile={true}` hides secondary)

### Design
- `design-system.html` — typography scale, glass panel patterns, gradient tokens
- `HERO_SPEC_smart_pen.md` — brand narrative for copy decisions

### Config
- `src/lib/three/heroSceneConfig.ts` — do not change values
- `src/hooks/useDeviceCapabilities.ts` — tier system

</canonical_refs>

<specifics>
## HeroMobile Target Structure

```tsx
// src/components/hero/HeroMobile.tsx
// CTA-first layout: badge → CTA → headline → subheadline
// No scroll coupling (enableScrollNarrative=false on mobile already)
// Props: { reducedMotion?: boolean }

export default function HeroMobile({ reducedMotion = false }) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center px-6">
      {/* 1. Editorial badge */}
      <div className="border-gradient-spin inline-flex items-center gap-2 bg-black/60 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ef233c] shadow-[0_0_8px_#ef233c]" />
        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-zinc-400">Smart Pen Premium Demo</span>
      </div>

      {/* 2. CTA — first/prominent */}
      <div className="mt-8 w-full">
        <HeroCTA isMobile={true} />
      </div>

      {/* 3. Headline — below CTA */}
      <h1 className="hero-headline font-display mt-8 text-4xl font-semibold leading-[0.9] tracking-tight text-white">
        <span className="block">The pen,</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
          reimagined.
        </span>
      </h1>

      {/* 4. Short subheadline */}
      <p className="hero-subheadline font-inter mt-4 text-base font-normal leading-relaxed text-zinc-300">
        Premium writing precision with an intelligent layer built for focus.
      </p>
    </div>
  );
}
```

### HeroSection routing change (target)
Replace the current content div that renders `<HeroContent isMobile={isMobile} isTablet={isTablet} />`:
```tsx
// Before:
<HeroContent isMobile={isMobile} isTablet={isTablet} />

// After:
{isMobile ? (
  <HeroMobile reducedMotion={reducedMotion} />
) : (
  <HeroContent isTablet={isTablet} />
)}
```

</specifics>

<deferred>
## Deferred Ideas

- "Should mobile have a video background instead of R3F canvas?" — user chose to keep canvas; deferred
- "Mobile progress indicator / scroll cue" — not in scope for Phase 6
- "Animated CTA entrance on mobile" — Phase 7/8 polish

</deferred>

---

*Phase: 06-responsive-and-mobile*
*Context gathered: 2026-04-05 via discuss-phase session*
