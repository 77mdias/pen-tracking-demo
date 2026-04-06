---
phase: 7
plan: 3
title: "Accessibility Pass — Contrast, ARIA, Keyboard"
subsystem: hero
tags: [accessibility, wcag, aria, contrast, keyboard]
dependency_graph:
  requires: ["07-01", "07-02"]
  provides: ["wcag-aa-compliance", "aria-landmarks", "keyboard-navigation"]
  affects: ["HeroCTA", "HeroSection", "HeroScrollCue"]
tech_stack:
  added: []
  patterns: ["WCAG AA contrast", "ARIA landmarks", "aria-hidden decorative elements"]
key_files:
  modified:
    - src/components/hero/HeroCTA.tsx
    - src/components/hero/HeroSection.tsx
    - src/components/hero/HeroScrollCue.tsx
decisions:
  - "text-zinc-400 selected over zinc-500 (6.1:1) to match existing secondary CTA styling and maximise readability"
  - "aria-label wording matches primary CTA action text for consistent screen reader experience"
metrics:
  duration: "3m"
  completed: "2026-04-06"
  tasks_completed: 2
  files_modified: 3
---

# Phase 7 Plan 3: Accessibility Pass — Contrast, ARIA, Keyboard Summary

## One-liner

WCAG AA compliance achieved: contrast fix on disclaimer text (2.56:1→7.73:1), aria-label on section landmark, aria-hidden on decorative scroll cue, keyboard focus rings verified.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Fix contrast failure and add ARIA attributes | f80a540 | HeroCTA.tsx, HeroSection.tsx, HeroScrollCue.tsx |
| 2 | Verify keyboard navigation and focus states | — (no changes) | — |

## Changes Made

### HeroCTA.tsx
- Line 31: `text-zinc-600` → `text-zinc-400` on disclaimer paragraph
  - Contrast ratio: 2.56:1 (FAIL) → 7.73:1 (PASS, WCAG AA requires 4.5:1)
  - Background: `#050a14`, old colour: `#52525b`, new colour: `#a1a1aa`

### HeroSection.tsx
- Line 113: Added `aria-label="Hero — Join the Private Beta"` to `<section id="experience">`
  - Section was previously unnamed in accessibility tree; screen readers now announce a meaningful landmark

### HeroScrollCue.tsx
- Line 5: Added `aria-hidden="true"` to root div
  - Element is `pointer-events-none` and purely decorative
  - Screen readers no longer announce "Scroll Down" text (not actionable for keyboard users)

## Task 2 Verification Results

All focus state checks passed by code inspection (no code changes required):

| Check | File | Status |
|-------|------|--------|
| Primary CTA focus ring: `ring-[#ef233c]` | HeroCTA.tsx:15 | ✅ Present |
| Primary CTA outline suppressed: `focus-visible:outline-none` | HeroCTA.tsx:15 | ✅ Present |
| Secondary CTA focus ring: `ring-white` | HeroCTA.tsx:24 | ✅ Present |
| Secondary CTA outline suppressed: `focus-visible:outline-none` | HeroCTA.tsx:24 | ✅ Present |
| Both buttons have `type="button"` | HeroCTA.tsx:14,23 | ✅ Present |
| No `tabindex` attributes (no keyboard traps) | hero section | ✅ Confirmed |
| Tab order: primary → secondary (desktop) | DOM order | ✅ Correct |
| Mobile: secondary hidden (`{!isMobile ? ... : null}`) | HeroCTA.tsx:21 | ✅ Correct |
| HeroMobile GSAP: only animates `opacity` + `y` | HeroMobile.tsx | ✅ No `visibility`/`pointer-events` changes |
| HeroCanvas `aria-hidden` (from 07-01) | HeroCanvas wrapper | ✅ Present |

## Acceptance Criteria Verification

- [x] `HeroCTA.tsx` disclaimer text uses `text-zinc-400` (7.73:1 contrast ratio, WCAG AA ✅)
- [x] `<section id="experience">` has `aria-label="Hero — Join the Private Beta"`
- [x] `HeroScrollCue` root div has `aria-hidden="true"`
- [x] `HeroCanvas` wrapper has `aria-hidden="true"` (from 07-01, verified)
- [x] Primary and secondary CTA buttons have visible `focus-visible:ring-*` styles
- [x] Both CTA buttons have `focus-visible:outline-none` (no double outline)
- [x] Tab order: primary CTA → secondary CTA (desktop), primary CTA only (mobile)
- [x] No keyboard traps in hero section
- [x] `bun run lint` passes with 0 errors
- [x] `bun run build` succeeds

## Deviations from Plan

None — plan executed exactly as written. Task 2 was verification-only and confirmed no code changes needed.

## Known Stubs

None.

## Threat Flags

None — changes are purely accessibility attribute additions, no new network surfaces or auth paths introduced.

## Self-Check: PASSED

- [x] `src/components/hero/HeroCTA.tsx` — verified `text-zinc-400` at line 31
- [x] `src/components/hero/HeroSection.tsx` — verified `aria-label` at line 113
- [x] `src/components/hero/HeroScrollCue.tsx` — verified `aria-hidden="true"` at line 5
- [x] Commit `f80a540` exists in git log
