# PenFlow77 — Smart Pen Premium Demo

## What This Is

PenFlow77 is a premium, Apple-like product demo website for a fictional smart pen ecosystem (hardware + AI software). The goal is to maximize conversion and perceived value through cinematic storytelling, premium motion, and a strong private beta CTA funnel. Narrative: "Write. Think. Evolve."

## Core Value

A hero section so cinematically premium that visitors feel compelled to join the private beta before scrolling past it.

## Requirements

### Validated

- ✓ Hero section static shell with design system tokens — Phase 1
- ✓ 3D pen rendering with cinematic lighting via React Three Fiber — Phase 2
- ✓ Text hierarchy and CTA layer with conversion focus — Phase 3
- ✓ Polished load choreography and idle animation via GSAP — Phase 4

### Active

- [ ] Scroll-linked 3D transforms and content narrative progression — Phase 5
- [ ] Responsive hero across all device sizes (mobile/tablet/desktop) — Phase 6
- [ ] Graceful degradation: fallbacks and accessibility (reduced motion) — Phase 7
- [ ] Ship-ready: optimized, performant, premium hero section — Phase 8

### Out of Scope

- Backend API or real user auth — this is a demo/marketing site
- Real product data or purchasing flow — conversion goal is beta signup CTA only
- CMS or content management — all copy is hardcoded

## Context

- **Tech stack:** Next.js 16 (App Router), React 19, TypeScript strict, TailwindCSS v4, React Three Fiber + drei + Three.js, GSAP + @gsap/react
- **Animation ownership:** GSAP owns DOM/timeline; R3F/useFrame owns 3D per-frame; Framer Motion optional for micro UI only
- **Design tokens:** Background `#050a14`, Primary blue `#007bff→#00bfff`, glass panels `rgba(255,255,255,0.03) + blur(16px)`, Montserrat headings, Open Sans body
- **Performance target:** 60fps stable on desktop, DPR capped 1.5–2, Draco/Meshopt compressed models
- **Phases 1–4 complete:** All hero components built and integrated in `src/components/hero/` and `src/hooks/`

## Constraints

- **Animation:** ONE motion system per element — GSAP and R3F must never fight over the same node
- **Mobile:** Separate `HeroMobile` path — never compress desktop choreography
- **Accessibility:** `prefers-reduced-motion` is first-class — all animation must have a reduced-motion path
- **Performance:** Never set React state on every frame or pointer tick — use `useRef` + `useFrame`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GSAP ↔ R3F bridge via mutable refs | Prevents jank from direct GSAP→three.js coupling; GSAP sets targets, R3F lerps | ✓ Good |
| Dynamic import R3F Canvas with ssr:false | Next.js SSR incompatibility with WebGL | ✓ Good |
| Separate HeroMobile component | Mobile needs video/still fallback, not compressed desktop 3D | — Pending validation |
| useGSAP from @gsap/react | Auto-cleanup via gsap.context(), prevents stale ScrollTriggers | ✓ Good |

---
*Last updated: 2026-04-05 after Phase 4 completion / GSD initialization*
