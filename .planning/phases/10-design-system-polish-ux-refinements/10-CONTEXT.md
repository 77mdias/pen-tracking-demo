# Phase 10: Design System Polish & UX Refinements — Context

**Gathered:** 2026-04-07
**Status:** Ready for planning
**Source:** User conversation (explicit requirements)

<domain>
## Phase Boundary

This phase has three distinct concern areas:

### 1. Design System Standardization (Alias Routes + AboutSection)
Apply the visual language from `creative-agency-template.aura.build/design-system2.html` to ALL non-Home routes:
- `/beta` (BetaPage + BetaContent)
- `/auth` (AuthContent)
- `/dashboard` (DashboardPage)
- `AboutSection` component (used on `/` and `/beta`)

The Home Page (Hero section) already uses this design system and is **not to be touched**.

**Key design-system2.html visual patterns to adopt (adapting red → #007bff blue for brand):**
- Background: `bg-black` (pure black, not #050a14)
- Sharp/angular borders: `rounded-none` — NO rounded corners on cards/buttons
- Corner accent markers: absolute positioned `w-2 h-2 border-t/b border-l/r border-[#007bff]` at each corner of cards
- Dashed borders: `border border-zinc-800 border-dashed`
- Mono font labels: `font-mono text-[10px] uppercase tracking-widest` for section labels/tags
- Manrope headings: `font-manrope` for H1/H2/H3
- Editorial card hover: `hover:border-[#007bff]/50 transition-all duration-500`
- Accent line: `border-l-4 border-[#007bff]` on key quotes/callouts
- Stat display: large `font-manrope text-5xl font-medium` numbers, `text-xs text-zinc-400 font-sans` labels
- Buttons: `rounded-none`, uppercase tracking-widest, border-based, no border-radius
- Status indicators: `w-1.5 h-1.5 bg-[#007bff] animate-pulse rounded-none`

### 2. Home Page Scroll Fix + AboutSection Pen Animation
**Bug:** `useSnapScroll` captures ALL wheel events on the page via `window.addEventListener("wheel", ..., {passive:false})` with `e.preventDefault()`. When the user is on the last snap section (index = targets.length - 1) and scrolls down, the event is blocked and natural scroll to AboutSection (which lives outside `productIntroContainerRef`) never happens.

**Fix:** In `useSnapScroll.ts` — when `currentIndex === targets.length - 1` AND `deltaY > 0` (user trying to scroll FURTHER down), skip `e.preventDefault()` to let the browser scroll naturally to AboutSection.

**New pen animation for AboutSection fold:** Add a new `about` pose to `penPoses.ts` and `MOBILE_PEN_POSES`. When the AboutSection enters the viewport (visible on screen), transition the pen to the "about" pose. Use a `ScrollTrigger` in `useScrollHijack.ts` triggered by `#about` (the section's `id`). The "about" pose should show the pen laid more horizontally/resting, with a soft cyan accent light — conveying "this is the platform overview, not the hero action shot."

### 3. Alias Routes 3D Pen UX Improvements
Three independent improvements to alias routes (/beta, /auth):

**a) Mouse-drag rotation:**
- User can click+drag on the 3D pen canvas to rotate it
- Use pointer events on the Canvas wrapper div: `onPointerDown`, `onPointerMove`, `onPointerUp`
- Track drag delta X → increment pen Y rotation; drag delta Y → increment pen X rotation
- Clamp total rotation to ±1.2 radians so pen doesn't flip over
- The idle continuous rotation should PAUSE when user is dragging; resume when drag ends
- All state for drag tracking must be `useRef` — no `useState` in animation path

**b) Container overflow/clipping fix:**
- Current: `AliasLayout` right column = `className="relative hidden h-[500px] md:block"` — fixed 500px height clips the pen when it floats up
- Fix: Remove the `h-[500px]` constraint; use `min-h-[500px] flex-1` or match the full column height. The canvas inside (`absolute inset-0`) should expand to fill its parent naturally.
- Ensure pen can float up/down within the column without being visually cut off

**c) Video background:**
- Add `VideoBackground` component (`src/components/hero/VideoBackground.tsx`) as the background of AliasLayout
- Style identical to the Hero: blurred, darkened, low-opacity video loop
- The video must be behind all content layers (z-0) and respect `prefers-reduced-motion`

</domain>

<decisions>
## Implementation Decisions

### Plan Split (3 plans, 1 wave each)
- **10-01**: Design system — visual restyling of alias routes + AboutSection
- **10-02**: Home scroll fix — useSnapScroll bug fix + new `about` pen pose
- **10-03**: Alias pen UX — drag rotation + overflow fix + video background

### Design System Tokens (alias routes + AboutSection)
- Background: `bg-black` (pure black — NOT #050a14)
- Accent: `#007bff` (brand blue — adapts design-system2.html's #ef233c)
- Border base: `border-zinc-800 border-dashed`
- Corner markers: absolute `w-2 h-2 border-t border-l border-[#007bff]` etc.
- Cards: `bg-black border border-zinc-800 rounded-none` (no rounded corners)
- Buttons: `rounded-none uppercase tracking-widest`
- Section labels: `font-mono text-[10px] uppercase tracking-widest text-[#007bff]`
- Headings: `font-manrope`
- Body: `font-sans` (Inter)
- Stats: `font-manrope text-5xl font-medium text-white` / label `text-xs text-zinc-400`

### Auth Error Text Exception
The `role="alert"` error paragraph in `/auth` MUST keep its red color — it's a semantic validation indicator. All other accents in /auth use #007bff.

### Snap Scroll Release Strategy
When `currentIndex === targets.length - 1` AND `deltaY > 0`: do NOT call `e.preventDefault()`. Let the browser naturally scroll. The scroll lock is released without killing the snap behavior for upward scrolls.

### AboutSection Pen Pose
- Name: `about` (added to both `PEN_POSES` and `MOBILE_PEN_POSES`)
- Visual idea: pen tilted slightly forward/resting — `rotation: [0.35, -0.2, 0.08]`, `position: [-0.5, -0.3, 0]`
- Camera: pull back slightly — `position: [0, 0.05, 5.0]`, `fov: 26`
- Accent light: soft cyan `#00e5ff`, intensity 0.5
- Mobile: `position: [0, 0.5, -0.2]`, camera `fov: 30`
- ScrollTrigger: `trigger: "#about"`, `start: "top 60%"` — fires on enter/enterBack

### Drag Rotation (AliasPenScene)
- Refs: `isDragging`, `lastPointerX`, `lastPointerY`, `dragRotX`, `dragRotY` — all `useRef<number>`
- dragRotY += (deltaX * 0.008); dragRotX += (deltaY * 0.006)
- Clamp: dragRotX in [-0.8, 0.8]; dragRotY unlimited (continuous spin OK on drag axis)
- Idle Y-rotation PAUSES when `isDragging.current === true`
- Cursor: `cursor-grab` / `cursor-grabbing` via canvas wrapper className state (OK to use useState for CSS only)
- Pointer capture: `e.currentTarget.setPointerCapture(e.pointerId)` on pointerDown

### Container Fix
- Change `h-[500px]` to `flex-1 self-stretch min-h-[500px]` in AliasLayout right column
- The grid parent (`grid-cols-2`) already stretches both columns to equal height — no height needed
- `AliasPenCanvas` wrapper: `absolute inset-0 overflow-visible` (not overflow-hidden)

### Video Background in AliasLayout
- Import `VideoBackground` dynamically `{ssr:false}` inside AliasLayout (VideoBackground is already 'use client' + uses useReducedMotion)
- Place before all other children in the `<main>`: `z-index: 0`, content at `z-index: 10`
- Same styling as hero: blur(24px), opacity 0.28, scale(1.05), black/50 overlay

### No changes to HeroSection, HeroScene, HeroCanvas, HeroContent
Only `useSnapScroll.ts` is touched for the scroll fix. The pen pose addition goes in `penPoses.ts` + `useScrollHijack.ts`.

### Architecture Compliance
- Zero useState in animation path (drag rotation uses useRef)
- useReducedMotion gate on drag animation
- No two systems fighting same DOM node
- DPR cap maintained

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System Reference
- `creative-agency-template.aura.build/design-system2.html` (lines 95–371) — Visual patterns to adopt (background, cards, typography, borders, corner markers)

### Current Alias Components
- `src/components/alias/AliasLayout.tsx` — Layout shell (to be restyled + extended with video + overflow fix)
- `src/components/alias/AliasPenScene.tsx` — 3D scene (add drag rotation)
- `src/components/alias/AliasPenCanvas.tsx` — Canvas wrapper (pass drag handlers)
- `src/lib/three/aliasSceneConfig.ts` — Scene constants

### Current Alias Route Pages
- `src/app/beta/page.tsx` — BetaPage (restyling, uses AliasLayout)
- `src/app/auth/page.tsx` — AuthContent (restyling, keep error text red)
- `src/app/dashboard/page.tsx` — DashboardPage (restyling)

### About + Home
- `src/components/about/AboutSection.tsx` — AboutSection (restyling to design-system2.html patterns)
- `src/lib/about/aboutData.ts` — Data config (unchanged)
- `src/app/page.tsx` — Home page (ONLY context: AboutSection lives here)

### Scroll/Animation Hooks
- `src/hooks/useSnapScroll.ts` — Snap scroll (bug fix: release on last section)
- `src/hooks/useScrollHijack.ts` — Section enter animations (add AboutSection scroll trigger)
- `src/lib/three/penPoses.ts` — Pen poses (add `about` pose)

### Video Background
- `src/components/hero/VideoBackground.tsx` — VideoBackground component (reuse in AliasLayout)

### Architecture Rules
- `CLAUDE.md` — Stack rules (ONE animation system per element, useRef in useFrame)
- `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md` — Animation architecture (GSAP owns DOM, R3F owns 3D)

</canonical_refs>

<specifics>
## Specific Ideas

- Reference image `demo-project.png` described by user: editorial/agency style layout with sharp cards, corner markers, mono labels, stat displays
- design-system2.html hero card: `bg-black border border-zinc-800 border-dashed` + absolute corner markers `w-2 h-2 border-t border-l border-[#ef233c]` (use #007bff) + large stat number `text-5xl font-manrope`
- design-system2.html capabilities list: numbered items with `text-[10px] text-zinc-600 font-mono` row numbers + `hover:translate-x-2` heading + red accent left border
- design-system2.html button: `rounded-none uppercase tracking-widest px-6 py-4 border border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white`
- Video background in alias routes: identical to VideoBackground.tsx (blur 24px, opacity 0.28, black/50 overlay)
- "About" pen pose: resting/tilted forward pose, conveying "foundation/overview" energy
</specifics>

<deferred>
## Deferred Ideas

- Deep "aura" animated gradient background (UnicornStudio) — alias routes can use the video background which is simpler and consistent with the hero
- Full navigation redesign — out of scope for this phase
- Orbit controls (drei's OrbitControls) — user wants drag rotation but OrbitControls adds complexity and conflicts with idle animation; use raw pointer events instead
</deferred>

---

*Phase: 10-design-system-polish-ux-refinements*
*Context gathered: 2026-04-07*
