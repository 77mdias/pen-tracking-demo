<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# PenFlow77 — Smart Pen Premium Demo

## Product Overview

PenFlow77 is a **premium, Apple-like product demo website** for a fictional smart pen ecosystem (hardware + AI software). The goal is to maximize conversion and perceived value through cinematic storytelling, premium motion, and a strong private beta CTA funnel.

**Narrative:** "Write. Think. Evolve." — a pen that augments thinking with AI-assisted writing and seamless sync.

**Primary Conversion Goal:** Get users to **Join the Private Beta**.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript (strict) | ^5 |
| UI | React | 19.2.4 |
| Styling | TailwindCSS | ^4 (v4 syntax with `@theme inline`) |
| 3D Rendering | React Three Fiber + drei | (to be installed) |
| Animation (timelines) | GSAP + @gsap/react | (to be installed) |
| Animation (UI micro) | Framer Motion (optional) | only if needed |
| Package Manager | bun | — |

### Stack Rules
- **GSAP** owns all timeline, scroll, and DOM choreography
- **R3F/useFrame** owns all per-frame 3D updates (idle, parallax, interpolation)
- **Framer Motion** is optional and restricted to small UI transitions NOT already covered by GSAP
- **ONE animation system per element** — never let two systems fight over the same node
- Use `useGSAP` from `@gsap/react` — never raw `useEffect` for GSAP
- Use `useRef` + `useFrame` for per-frame 3D — never `useState`
- Dynamic-import R3F Canvas with `next/dynamic` and `ssr: false`

---

## Project Structure

```
penflow77/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles + Tailwind + design tokens
│   │   ├── page.tsx              # Landing page (marketing)
│   │   └── favicon.ico
│   ├── components/
│   │   └── hero/                 # Hero section components
│   │       ├── HeroSection.tsx       # Layout shell, responsive gate
│   │       ├── HeroCanvas.tsx        # R3F Canvas wrapper (dynamic, ssr:false)
│   │       ├── HeroScene.tsx         # 3D scene (model, lighting, camera, idle)
│   │       ├── HeroContent.tsx       # Headline, subheadline, text layer
│   │       ├── HeroCTA.tsx           # Primary + secondary CTA buttons
│   │       ├── HeroAmbientDetails.tsx # Optional premium ambient UI hints
│   │       ├── HeroScrollCue.tsx     # Subtle scroll indicator
│   │       ├── HeroFallback.tsx      # Non-WebGL static/video fallback
│   │       └── HeroMobile.tsx        # Mobile-specific hero variant
│   ├── hooks/
│   │   ├── useHeroTimeline.ts        # GSAP intro + scroll timeline
│   │   ├── useHeroScrollProgress.ts  # Normalized scroll 0→1 via ScrollTrigger
│   │   ├── useReducedMotion.ts       # prefers-reduced-motion detection
│   │   ├── useDeviceCapabilities.ts  # Device tier detection (high/med/low)
│   │   └── useMediaQuery.ts          # Responsive breakpoint detection
│   └── lib/
│       ├── gsap/
│       │   └── registerGsap.ts      # One-time GSAP plugin registration
│       ├── three/
│       │   ├── heroSceneConfig.ts    # All tunable 3D constants
│       │   ├── heroLighting.ts       # Lighting configuration
│       │   ├── heroMaterials.ts      # Material definitions
│       │   └── heroCamera.ts         # Camera configuration
│       └── utils/
│           ├── lerp.ts               # Linear interpolation
│           ├── clamp.ts              # Value clamping
│           └── rafThrottle.ts        # RAF-based throttling
├── public/
│   ├── models/                   # 3D assets (.glb)
│   └── videos/
│       └── animation.mp4         # Reference/fallback animation
├── HERO_SPEC_smart_pen.md        # Creative direction source of truth
├── HERO_TECHNICAL_BUILD_PLAN_smart_pen.md  # Architecture source of truth
├── HERO_IMPLEMENTATION_PLAYBOOK.md # Task-by-task implementation guide
├── design-system.html            # Living design system reference
├── PRD_production.md             # Product requirements
├── TECH_SPEC_production.md       # Technical specification
├── UI_SPEC_production.md         # UI/UX specification
└── package.json
```

---

## Design System

The design system is defined in `design-system.html`. All implementations MUST use these tokens:

### Colors
- **Page Background:** `#050a14`
- **Primary Blue:** `#007bff`
- **Primary Gradient:** `#007bff → #00bfff`
- **Glass Panel:** `rgba(255, 255, 255, 0.03)` + `backdrop-filter: blur(16px) saturate(180%)`
- **Glass Border Hierarchy:** top `rgba(255,255,255,0.15)`, sides `0.08`, bottom `0.05`
- **Text White:** `#ffffff`, White 70%: `rgba(255,255,255,0.7)`, Gray 400: `#9ca3af`, Gray 500: `#6b7280`

### Typography
- **Headings:** Montserrat (`font-heading`) — semibold/medium
- **Body:** Open Sans — regular/light
- **H1:** `text-6xl md:text-8xl lg:text-9xl font-semibold leading-[0.85] tracking-tight`
- **Micro:** `text-[10px] uppercase tracking-[0.2em]`

### Motion Timing
- UI entrance: 0.5s–0.9s
- Scene transitions: 1.0s–1.8s
- Text stagger: 60ms–120ms per element
- Button hover: 120ms–180ms
- Easing: premium soft curves (`power2.out`), avoid harsh snappy motion

---

## Key Documentation Files

| File | What It Contains | When to Read |
|------|-----------------|--------------|
| `HERO_SPEC_smart_pen.md` | Creative direction, narrative structure, copy options, visual benchmarks, success criteria | Before any hero visual/UX work |
| `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md` | Component architecture, hook design, animation strategy, performance rules, fallback tiers | Before any hero engineering work |
| `HERO_IMPLEMENTATION_PLAYBOOK.md` | Task-by-task breakdown (30 tasks, 9 phases) for incremental agent execution | Before starting any implementation task |
| `design-system.html` | Design tokens, colors, typography, components, glass-panel patterns | Before any styling work |
| `PRD_production.md` | Product vision, personas, user journey, pages, features | For product context |
| `TECH_SPEC_production.md` | Full stack details, API, database schema, deployment | For backend/infra context |

---

## Implementation Rules

### Architecture
- Components follow single-responsibility principle
- 3D scene logic is completely separate from DOM text/UI logic
- Scene configuration values (positions, intensities, amplitudes) centralized in `src/lib/three/heroSceneConfig.ts`
- No magic numbers scattered across files

### Performance
- Target: stable 60fps on good desktop hardware
- DPR capped at 1.5–2
- Compressed textures and models (Draco/Meshopt)
- No unnecessary post-processing
- Preload only hero-critical assets; lazy-load everything below fold
- Never set React state on every frame or pointer tick

### Accessibility
- Semantic heading hierarchy (single `h1` per page)
- Keyboard-accessible CTAs with visible focus states
- Contrast-safe text over dark backgrounds
- `prefers-reduced-motion` is first-class — when enabled:
  - All animation disabled
  - Content immediately visible
  - Product static
  - CTA prominent

### Responsive Strategy
- **Desktop:** Full 3D + scroll narrative + pointer parallax
- **Tablet:** Reduced motion amplitude, simpler 3D
- **Mobile:** Separate `HeroMobile` component — video/image fallback, stacked layout, no scroll coupling
- Never force-compress desktop choreography into mobile

### Quality Bar
- Hero must feel premium even with ALL animation disabled
- The pen is always the emotional center of the scene
- CTA hierarchy must be immediately obvious
- Copy must be readable at all viewport sizes over any background
- Fallback experiences must feel intentional, not broken

---

## Path Aliases

- `@/*` maps to `src/*` (configured in `tsconfig.json`)
- Example: `import { lerp } from '@/lib/utils/lerp'`

---

## Commands

```bash
bun run dev      # Development server
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint
```

---

## Before You Code — Checklist

1. Read `node_modules/next/dist/docs/` for Next.js 16 specifics
2. Read the relevant spec file for your current task
3. Check `design-system.html` for correct tokens
4. If working on the hero, read your current task in `HERO_IMPLEMENTATION_PLAYBOOK.md`
5. Fetch external library docs (GSAP, R3F, drei) if using unfamiliar APIs
6. Verify `prefers-reduced-motion` behavior for any animation you add
7. Test at 375px, 768px, 1024px, and 1440px viewports
