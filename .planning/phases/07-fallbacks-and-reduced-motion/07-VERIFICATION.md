---
phase: 07-fallbacks-and-reduced-motion
verified: 2026-04-06T00:00:00Z
status: passed
score: 14/14 must-haves verified
re_verification: false
---

# Phase 07: Fallbacks and Reduced Motion — Verification Report

**Phase Goal:** Graceful degradation — non-WebGL HeroFallback, full prefers-reduced-motion compliance, keyboard accessibility
**Verified:** 2026-04-06
**Status:** ✅ PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | HeroFallback video visible at opacity-70 without mix-blend-screen | ✓ VERIFIED | `HeroFallback.tsx` line 21: `className="absolute inset-0 h-full w-full object-cover opacity-70"` — no `mix-blend-screen` class |
| 2 | Abstract glass circle removed, pen spotlight glow present | ✓ VERIFIED | Lines 14–17: `from-[#007bff]/20` radial gradient glow; no glass-circle div |
| 3 | `preload` is conditional on `reducedMotion` | ✓ VERIFIED | Line 27: `preload={reducedMotion ? "metadata" : "auto"}` |
| 4 | `HeroCanvas` wrapper has `aria-hidden="true"` | ✓ VERIFIED | `HeroCanvas.tsx` line 31: `<div className="absolute inset-0" aria-hidden="true">` |
| 5 | `globals.css` reduced motion block has universal transition kill-switch | ✓ VERIFIED | Lines 294–299: `*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` |
| 6 | `HeroMobile` has `useGSAP` entrance animation | ✓ VERIFIED | `HeroMobile.tsx` lines 15–38: full GSAP stagger (CTA → headline → subheadline) |
| 7 | When `reducedMotion=true`: `gsap.set()` makes content immediately visible | ✓ VERIFIED | Lines 16–22: `if (reducedMotion) { gsap.set([...], { opacity: 1, y: 0 }); return; }` |
| 8 | `void reducedMotion` removed from HeroMobile | ✓ VERIFIED | Prop is fully consumed via the `useGSAP` gate; no `void` expression in file |
| 9 | `useGSAP` used with `scope: containerRef` and `revertOnUpdate: true` | ✓ VERIFIED | Line 38: `{ scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true }` |
| 10 | `HeroCTA.tsx` disclaimer uses `text-zinc-400` | ✓ VERIFIED | Line 31: `<p className="font-inter text-center text-xs text-zinc-400 uppercase tracking-widest">` |
| 11 | `<section id="experience">` has `aria-label` | ✓ VERIFIED | `HeroSection.tsx` line 113: `aria-label="Hero — Join the Private Beta"` |
| 12 | `HeroScrollCue` root has `aria-hidden="true"` | ✓ VERIFIED | `HeroScrollCue.tsx` line 5: `aria-hidden="true"` on root div |
| 13 | CTA buttons have `focus-visible:ring-*` and `focus-visible:outline-none` | ✓ VERIFIED | Primary (line 15): `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef233c] focus-visible:ring-offset-2 focus-visible:ring-offset-black`; Secondary (line 24): `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black` |
| 14 | Both CTA buttons have `type="button"` | ✓ VERIFIED | `HeroCTA.tsx` lines 14 and 23: `type="button"` present on both |

**Score:** 14/14 truths verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/hero/HeroFallback.tsx` | Premium video fallback | ✓ VERIFIED | 34 lines, opacity-70, spotlight glow, preload gate |
| `src/components/hero/HeroCanvas.tsx` | aria-hidden on wrapper | ✓ VERIFIED | Line 31 wrapper div has `aria-hidden="true"` |
| `src/components/hero/HeroMobile.tsx` | GSAP entrance with reduced-motion gate | ✓ VERIFIED | useGSAP, containerRef, revertOnUpdate |
| `src/app/globals.css` | Universal transition kill-switch | ✓ VERIFIED | Lines 291–299 in `@media (prefers-reduced-motion: reduce)` |
| `src/components/hero/HeroCTA.tsx` | Accessible contrast + focus rings | ✓ VERIFIED | text-zinc-400, focus-visible rings, type="button" |
| `src/components/hero/HeroSection.tsx` | Section aria-label | ✓ VERIFIED | Line 113 aria-label present |
| `src/components/hero/HeroScrollCue.tsx` | aria-hidden on decorative cue | ✓ VERIFIED | Line 5 aria-hidden="true" |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| HeroSection → HeroFallback | reducedMotion prop | `reducedMotion={reducedMotion}` | ✓ WIRED | Line 95 passes reducedMotion correctly |
| HeroMobile → containerRef | useGSAP scope | `scope: containerRef` | ✓ WIRED | containerRef applied to root div and passed as scope |
| globals.css reduce block → transitions | `*` selector | `transition-duration: 0.01ms` | ✓ WIRED | Universal selector covers all elements |
| HeroSection → section aria-label | aria-label attr | `aria-label="Hero — Join the Private Beta"` | ✓ WIRED | Line 113 |

---

## Data-Flow Trace (Level 4)

Not applicable — no components with external data sources. All components consume props passed from HeroSection, which reads device/motion state from hooks. No API/DB queries.

---

## Behavioral Spot-Checks

| Behavior | Check | Result | Status |
|----------|-------|--------|--------|
| opacity-70 on video, no mix-blend | grep in HeroFallback.tsx | `opacity-70` present, `mix-blend-screen` absent | ✓ PASS |
| preload conditional | grep HeroFallback.tsx | `preload={reducedMotion ? "metadata" : "auto"}` | ✓ PASS |
| Universal transition kill-switch | grep globals.css | `transition-duration: 0.01ms !important` in @media block | ✓ PASS |
| HeroMobile reducedMotion gate | grep HeroMobile.tsx | `if (reducedMotion) { gsap.set(..., { opacity: 1, y: 0 }); return; }` | ✓ PASS |
| aria-hidden on canvas | grep HeroCanvas.tsx | `aria-hidden="true"` on wrapper | ✓ PASS |
| aria-label on section | grep HeroSection.tsx | `aria-label="Hero — Join the Private Beta"` | ✓ PASS |
| aria-hidden on scroll cue | grep HeroScrollCue.tsx | `aria-hidden="true"` | ✓ PASS |
| text-zinc-400 on disclaimer | grep HeroCTA.tsx | `text-zinc-400` at line 31 | ✓ PASS |
| type="button" on both CTAs | grep HeroCTA.tsx | Both buttons have `type="button"` | ✓ PASS |

---

## Build Quality

```
bun run lint: ✅ 0 errors (106 pre-existing warnings, unrelated to this phase)
bun run build: ✅ Build succeeds — OpenNext Cloudflare build complete
```

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status |
|-------------|------------|-------------|--------|
| Non-WebGL HeroFallback premium visual | 07-01 | Video opacity-70, spotlight glow | ✓ SATISFIED |
| HeroCanvas aria-hidden | 07-01 | Decorative 3D canvas hidden from AT | ✓ SATISFIED |
| CSS transition kill-switch | 07-02 | Universal 0.01ms transition/animation duration | ✓ SATISFIED |
| HeroMobile GSAP entrance with gate | 07-02 | CTA→headline→subheadline stagger, reducedMotion guard | ✓ SATISFIED |
| WCAG AA contrast on disclaimer | 07-03 | text-zinc-400 = 7.73:1 ratio | ✓ SATISFIED |
| Section aria-label | 07-03 | Meaningful landmark name for screen readers | ✓ SATISFIED |
| Decorative scroll cue aria-hidden | 07-03 | Pointer-events-none element hidden from AT | ✓ SATISFIED |
| Focus-visible rings on CTA buttons | 07-03 | Keyboard-visible focus indicators | ✓ SATISFIED |

---

## Anti-Patterns Found

None. No TODO/FIXME/placeholder comments or empty implementations found in the modified files.

---

## Human Verification Required

None — all criteria verifiable by code inspection and build output.

---

## Gaps Summary

None. All 14 must-have truths are verified, all artifacts are substantive and wired, build passes with 0 errors.

---

_Verified: 2026-04-06_
_Verifier: gsd-verifier (automated code inspection)_
