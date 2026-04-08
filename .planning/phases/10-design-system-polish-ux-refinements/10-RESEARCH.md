2# Phase 10: Design System Polish & UX Refinements — Research

**Researched:** 2026-04-07
**Domain:** TailwindCSS design system, React Three Fiber pointer events, GSAP scroll interception, Next.js dynamic imports
**Confidence:** HIGH (all findings verified from live codebase + official HTML reference)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Plan Split:** 3 plans, 1 wave each — 10-01 (design system), 10-02 (scroll fix + about pose), 10-03 (alias pen UX)
- **Background:** `bg-black` (pure black — NOT #050a14)
- **Accent:** `#007bff` (NOT #ef233c — that's only for `role="alert"` error text in /auth)
- **Border base:** `border-zinc-800 border-dashed`
- **Corner markers:** `absolute w-2 h-2 border-t border-l border-[#007bff]` (and t/r, b/l, b/r variants)
- **Cards:** `bg-black border border-zinc-800 rounded-none`
- **Buttons:** `rounded-none uppercase tracking-widest`
- **Section labels:** `font-mono text-[10px] uppercase tracking-widest text-[#007bff]`
- **Headings:** `font-manrope`
- **Body:** `font-sans` (Inter)
- **Stats:** `font-manrope text-5xl font-medium text-white` / label `text-xs text-zinc-400`
- **Auth Error text exception:** `role="alert"` paragraph keeps `text-[#ef233c]` — DO NOT change
- **Snap scroll release:** When `currentIndex === targets.length - 1` AND `deltaY > 0` → skip `e.preventDefault()`, return early
- **AboutSection pen pose `about`:** rotation `[0.35, -0.2, 0.08]`, position `[-0.5, -0.3, 0]`; camera `[0, 0.05, 5.0]` fov 26; accent `#00e5ff` intensity 0.5; ScrollTrigger `#about` start `top 60%`
- **Drag refs:** `isDragging`, `lastPointerX`, `lastPointerY`, `dragRotX`, `dragRotY` — all `useRef<number>`
- **Drag sensitivity:** `dragRotY += deltaX * 0.008`; `dragRotX += deltaY * 0.006`; clamp `dragRotX ∈ [-0.8, 0.8]`
- **Idle rotation pauses** when `isDragging.current === true`
- **Cursor state:** One `useState` for CSS cursor class is acceptable (CSS-only, not animation path)
- **Pointer capture:** `e.currentTarget.setPointerCapture(e.pointerId)` on pointerDown
- **Container fix:** Change `h-[500px]` → `flex-1 self-stretch min-h-[500px]` in AliasLayout right column
- **Canvas overflow:** `absolute inset-0 overflow-visible` (not overflow-hidden)
- **VideoBackground:** Import dynamically `{ssr: false}` inside AliasLayout; `z-index: 0`; content columns at `z-10`
- **HeroSection / HeroScene / HeroCanvas / HeroContent: NO CHANGES**
- **Zero useState in animation path** — drag rotation uses useRef only

### Agent's Discretion
_(None specified — all implementation details are locked)_

### Deferred Ideas (OUT OF SCOPE)
- Deep "aura" animated gradient background (UnicornStudio)
- Full navigation redesign
- Orbit controls (drei's OrbitControls)
</user_constraints>

---

## Summary

Phase 10 has three self-contained concern areas. All implementation decisions are locked in CONTEXT.md; this research focuses on verifying the exact state of each file to be changed, documenting the precise delta (what changes vs. what stays), and flagging integration risks.

**Design system work (Plan 10-01):** The alias route pages (/beta, /auth) already use correct color tokens (`#007bff`, `font-manrope`, uppercase tracking-widest buttons) but still rely on the `glass-panel` CSS utility (frosted glass with backdrop-blur, rounded corners, shimmer hover). The switch to DS2 editorial style means replacing `glass-panel` with `bg-black border border-zinc-800 rounded-none` + corner marker divs. `AboutSection` needs the most work — it uses `bg-[#050a14]`, `rounded-xl/2xl/full`, and `glass-panel` throughout. `/dashboard` has no AliasLayout wrapper and must be restyled independently.

**Scroll fix (Plan 10-02):** A 2-line change in `useSnapScroll.ts` — move the `e.preventDefault()` call below a guard that returns early when at last section scrolling down. The `about` pose adds to `PEN_POSES` and `MOBILE_PEN_POSES` (same `PenPose` shape, no type changes needed). The ScrollTrigger for `#about` follows the identical pattern already used for each `[data-scroll-section]` in `useScrollHijack.ts`.

**Alias pen UX (Plan 10-03):** Drag rotation refs live in `AliasPenCanvas` and are passed as props to `AliasPenScene`. The container height fix is a one-line change. VideoBackground is a pure addition to `AliasLayout` — no structural refactor needed beyond adding `relative` to `<main>` and two `z-10` wrappers.

**Primary recommendation:** Implement in plan order (10-01 → 10-02 → 10-03); each plan is independent.

---

## Design Pattern Inventory

> Source: `creative-agency-template.aura.build/design-system2.html` lines 186–244. All classes verified by reading the file. [VERIFIED: codebase read]

### Design Tokens (DS2 → PenFlow77 blue adaptation)

| Element | DS2 Original (red) | PenFlow77 Adaptation (blue) |
|---------|-------------------|------------------------------|
| Background | `bg-black` | `bg-black` (identical) |
| Accent color | `#ef233c` | `#007bff` |
| Border base | `border border-zinc-800` | `border border-zinc-800` |
| Card variant | `border-dashed` | `border-dashed` |
| Hover border | `hover:border-[#ef233c]/50` | `hover:border-[#007bff]/50` |
| Corner marker | `border-[#ef233c]` | `border-[#007bff]` |
| Label color | `text-[#ef233c]` | `text-[#007bff]` |
| Status dot | `bg-[#ef233c]` | `bg-[#007bff]` |
| Left-border accent | `border-l-4 border-[#ef233c]` | `border-l-4 border-[#007bff]` |
| Button border/text | `border-[#ef233c] text-[#ef233c]` | `border-[#007bff] text-[#007bff]` |
| Button hover fill | `hover:bg-[#ef233c] hover:text-white` | `hover:bg-[#007bff] hover:text-white` |

### Component Class Inventory (exact DS2 classes)

**Card shell (with corner markers):**
```html
<section class="flex-1 bg-black border border-zinc-800 border-dashed relative p-8 flex flex-col justify-between group hover:border-[#007bff]/50 transition-all duration-500 rounded-none">
  <!-- Corner markers (4 per card) -->
  <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#007bff]"></div>
  <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#007bff]"></div>
  <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#007bff]"></div>
  <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#007bff]"></div>
```

**Section label with brackets:**
```html
<span class="font-mono text-[10px] text-[#007bff] tracking-widest uppercase font-bold">[ Section Name ]</span>
```

**Section label without brackets (simpler variant):**
```html
<span class="uppercase text-sm font-medium text-[#007bff] tracking-widest">Section Name</span>
```

**Status indicator bar (top of card):**
```html
<div class="flex items-center justify-between border-b border-zinc-800 pb-4 border-dashed">
  <span class="font-mono text-[10px] text-[#007bff] tracking-widest uppercase font-bold">[ Status ]</span>
  <div class="flex gap-1.5">
    <div class="w-1.5 h-1.5 bg-[#007bff] animate-pulse rounded-none"></div>
    <div class="w-1.5 h-1.5 bg-zinc-800 rounded-none"></div>
    <div class="w-1.5 h-1.5 bg-zinc-800 rounded-none"></div>
  </div>
</div>
```

**Stat display:**
```html
<h3 class="text-zinc-500 text-[10px] font-mono mb-2 uppercase tracking-wider">Label</h3>
<div class="flex items-baseline gap-2">
  <p class="text-5xl font-medium text-white font-manrope tracking-tighter">46</p>
  <span class="text-[#007bff] text-xs font-mono">LIVE</span>
</div>
<p class="text-xs text-zinc-400 mt-2 font-sans">Supporting text.</p>
```

**Button (primary):**
```html
<button class="w-full bg-transparent border border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white transition-all uppercase text-[11px] font-bold tracking-widest py-4 px-4 flex items-center justify-center gap-3 rounded-none">
  <span>Button Label</span>
</button>
```

**Capabilities/list row (hover slide):**
```html
<a class="flex-1 border-b border-zinc-800 p-6 flex items-center justify-between group hover:bg-zinc-900/30 transition-colors relative overflow-hidden" href="#">
  <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#007bff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
  <div>
    <span class="block text-[10px] text-zinc-600 font-mono mb-1 group-hover:text-[#007bff] transition-colors">01</span>
    <h4 class="text-lg text-white font-manrope font-normal tracking-tight group-hover:translate-x-2 transition-transform duration-300">Item Title</h4>
  </div>
</a>
```

**Left-border callout:**
```html
<div class="bg-black/90 backdrop-blur border-l-4 border-[#007bff] p-5 max-w-md">
  <p class="text-zinc-300 text-sm leading-relaxed font-sans">Quote / callout text.</p>
</div>
```

**Inline tabs:**
```html
<div class="flex gap-0 border border-zinc-800 w-fit bg-black">
  <span class="px-4 py-2 border-r border-zinc-800 text-[10px] text-zinc-300 uppercase font-mono hover:text-[#007bff] hover:bg-white/5 transition-colors cursor-default">Tab One</span>
  <span class="px-4 py-2 text-[10px] text-zinc-300 uppercase font-mono hover:text-[#007bff] hover:bg-white/5 transition-colors cursor-default">Tab Two</span>
</div>
```

**Entrance animation:**
```html
<div class="[animation:fadeSlideIn_1s_ease-out_0.2s_both] animate-on-scroll">...</div>
```

---

## Per-Component Change Delta

### `glass-panel` class — THE key element to replace

[VERIFIED: codebase read — `src/app/globals.css` lines 196–232]

`glass-panel` provides:
- `backdrop-filter: blur(16px) saturate(180%)` (frosted glass)
- Variable-opacity white borders (hierarchy: top 0.15, sides 0.08, bottom 0.05)
- `box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3)`
- `overflow: hidden`
- Hover shimmer `::before` animation

**DS2 replacement:** `bg-black border border-zinc-800 rounded-none` + 4 corner marker divs. The `backdrop-filter` and shimmer are dropped. Cards get hover via `hover:border-[#007bff]/50 transition-all duration-500`.

**⚠ Do NOT remove `glass-panel` from `globals.css`** — it's used by `[data-scroll-section] .glass-panel` in the HeroSection scroll context (line 312). Only replace it at the component level.

### `/beta` (BetaPage + BetaContent)

[VERIFIED: `src/app/beta/page.tsx` read]

**Current:** Uses `glass-panel` wrapper on the content `<section>`. Queue stats grid has `border border-zinc-800 bg-black/40` (already close). Buttons already use `border-[#007bff] rounded-none uppercase tracking-widest`. 

**Changes needed:**
1. `<section className="glass-panel w-full p-8 md:p-10">` → `bg-black border border-zinc-800 border-dashed rounded-none relative` + 4 corner markers
2. Queue stats grid: add `rounded-none`, add `border-dashed`, add DS2 header bar with `[ Queue Status ]` label + pulse dots
3. Success "joined" state: `rounded-sm border border-emerald-800/50 bg-emerald-950/30` — **keep this** (it's a success state, not a design-system card)
4. Section label `<p>`: change from generic `text-[10px] uppercase tracking-[0.2em] text-[#007bff]` to DS2 `font-mono text-[10px] uppercase tracking-widest text-[#007bff] font-bold` with `[ Private Beta ]` brackets
5. Stats numbers: upgrade from `text-4xl` to `text-5xl font-manrope tracking-tighter` + `text-[#007bff] text-xs font-mono` sublabel
6. Add `AliasLayout` wrapping `<main>` needs `relative` class (for VideoBackground in Plan 10-03)

### `/auth` (AuthContent)

[VERIFIED: `src/app/auth/page.tsx` read]

**Current:** Uses `glass-panel` wrapper, `rounded-sm` on input field, buttons already mostly correct.

**⚠ Exception:** Line 111 — `<p className="font-inter mt-2 text-xs text-[#ef233c]" role="alert">` — **MUST keep `text-[#ef233c]`**, locked decision.

**Changes needed:**
1. `<section className="glass-panel ...">` → editorial shell with corner markers (same as /beta)
2. Input: `rounded-sm` → remove (rely on `border border-zinc-700`, `rounded-none` isn't needed explicitly since it's already no longer `rounded-sm` if removed)
3. Input focus: keep `focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff]` — matches DS2 focus pattern
4. Section label: same bracket pattern as /beta
5. Main submit button: already correct (`border-[#007bff] bg-[#007bff] rounded-none`-ish) — verify no `rounded-sm` or `rounded` present

### `/dashboard` (DashboardPage)

[VERIFIED: `src/app/dashboard/page.tsx` read]

**Current:** NO `AliasLayout` wrapper. Has its own `<main>`. Uses `glass-panel` on article cards. Has `rounded-full` badge (beta member) and `rounded-sm` in some places.

**Changes needed:**
1. Both `<main>` variants: add `bg-black` (currently inherits from body which is `bg-[#050a14]`)
2. Articles using `glass-panel p-5` / `glass-panel p-6`: → `bg-black border border-zinc-800 rounded-none relative p-6` + corner markers
3. "Beta member" badge: `rounded-full border border-emerald-800/50 bg-emerald-950/40` → since this is a status badge (not a design card), keep `rounded-full` OR convert to `rounded-none border border-emerald-800/50 bg-emerald-950/40` per `rounded-none` rule — **apply rounded-none** (design system is strict)
4. Queue section: `border border-zinc-800 bg-black/30 p-5` → add `rounded-none` (remove any implicit rounding), add corner markers, add DS2 header bar
5. No 3D pen on /dashboard (not using AliasLayout) — no video background needed for this phase (decision was video in AliasLayout only)

### `AboutSection`

[VERIFIED: `src/components/about/AboutSection.tsx` read]

**Current:** `bg-[#050a14]`, `rounded-full` chip, `rounded-xl` tech cards, `rounded-2xl` stats panel, `rounded-full` CTA buttons, `glass-panel` on tech cards and stats panel.

**This is the most extensive restyling target.**

**Changes needed:**
1. Section root: `bg-[#050a14]` → `bg-black`
2. Chip tag: `glass-panel rounded-full border border-[#007bff]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest` → DS2 label: `font-mono text-[10px] uppercase tracking-widest text-[#007bff] font-bold` (or a `[ Smart Pen Platform ]` bracket label)
3. H2 gradient span: `text-[#007bff]` stays — correct
4. Product highlights list: `rounded-full bg-[#007bff]/20` check icon → DS2 numbered list with `text-[10px] text-zinc-600 font-mono` row number + sliding left-border hover
5. Tech stack cards: `glass-panel rounded-xl border border-[#007bff]/20` → `bg-black border border-zinc-800 rounded-none relative` + 4 corner markers
6. Stats panel: `glass-panel rounded-2xl border border-[#007bff]/20 p-6` → `bg-black border border-zinc-800 rounded-none border-dashed relative p-6` + DS2 header bar
7. Stat values: `text-2xl font-bold` → `text-5xl font-medium font-manrope tracking-tighter` (or keep 2xl for the denser grid — **match DS2 exactly: `text-5xl`**)
8. CTA buttons: `rounded-full bg-[#007bff]` / `rounded-full border border-[#007bff]/60` → `rounded-none border border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white transition-all uppercase text-[11px] font-bold tracking-widest py-4 px-6`

---

## Architecture Patterns

### Design System Token Map

```
DS2 element → Tailwind class(es)
─────────────────────────────────────────────────────────
Section background       bg-black
Card shell               bg-black border border-zinc-800 rounded-none
Card + dashed            bg-black border border-zinc-800 border-dashed rounded-none
Card hover               group hover:border-[#007bff]/50 transition-all duration-500
Corner marker (TL)       absolute top-0 left-0 w-2 h-2 border-t border-l border-[#007bff]
Corner marker (TR)       absolute top-0 right-0 w-2 h-2 border-t border-r border-[#007bff]
Corner marker (BL)       absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#007bff]
Corner marker (BR)       absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#007bff]
Section label            font-mono text-[10px] text-[#007bff] tracking-widest uppercase font-bold
Stat number              text-5xl font-medium text-white font-manrope tracking-tighter
Stat sublabel            text-[#007bff] text-xs font-mono
Stat helper text         text-xs text-zinc-400 font-sans
Pulse dot (active)       w-1.5 h-1.5 bg-[#007bff] animate-pulse rounded-none
Pulse dot (inactive)     w-1.5 h-1.5 bg-zinc-800 rounded-none
Button (primary)         bg-transparent border border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white transition-all uppercase text-[11px] font-bold tracking-widest py-4 px-4 rounded-none
Button (ghost)           border border-zinc-700 text-zinc-300 hover:border-[#007bff] hover:text-white transition-colors uppercase text-[11px] font-bold tracking-widest py-4 px-4 rounded-none
Left-border callout      bg-black/90 backdrop-blur border-l-4 border-[#007bff] p-5
List row number          text-[10px] text-zinc-600 font-mono group-hover:text-[#007bff] transition-colors
List row heading         text-lg text-white font-manrope font-normal tracking-tight group-hover:translate-x-2 transition-transform duration-300
Row left accent bar      absolute left-0 top-0 bottom-0 w-1 bg-[#007bff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200
Card header divider      border-b border-zinc-800 pb-4 border-dashed
Indicator bars (3)       w-0.5 h-3 bg-[#007bff] / w-0.5 h-3 bg-zinc-800 (2×)
```

### Project Structure (no changes)

```
src/
├── app/
│   ├── auth/page.tsx          # Plan 10-01: restyle glass-panel → DS2 editorial
│   ├── beta/page.tsx          # Plan 10-01: restyle glass-panel → DS2 editorial
│   └── dashboard/page.tsx     # Plan 10-01: restyle glass-panel → DS2 editorial
├── components/
│   ├── about/
│   │   └── AboutSection.tsx   # Plan 10-01: full DS2 restyling
│   └── alias/
│       ├── AliasLayout.tsx    # Plan 10-03: add VideoBackground + z-index + relative
│       ├── AliasPenCanvas.tsx # Plan 10-03: add pointer events + drag refs
│       └── AliasPenScene.tsx  # Plan 10-03: consume drag refs in useFrame
├── hooks/
│   └── useSnapScroll.ts       # Plan 10-02: release lock at last section
└── lib/
    └── three/
        └── penPoses.ts        # Plan 10-02: add 'about' pose
        # useScrollHijack.ts   # Plan 10-02: add #about ScrollTrigger
```

### Snap Scroll Release Pattern

[VERIFIED: `src/hooks/useSnapScroll.ts` read — exact current code confirmed]

**Exact change:** In `handleWheel`, add early-return guard BEFORE `e.preventDefault()`:

```typescript
// CURRENT (lines 101-107):
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (isTransitioning) return;
  const { deltaY } = e;
  if (Math.abs(deltaY) < threshold) return;
  navigateTo(currentIndex + (deltaY > 0 ? 1 : -1));
};

// FIXED:
const handleWheel = (e: WheelEvent) => {
  const { deltaY } = e;
  // Release scroll when at last section and scrolling down — let browser reach AboutSection
  if (currentIndex === targets.length - 1 && deltaY > 0) return;
  e.preventDefault();
  if (isTransitioning) return;
  if (Math.abs(deltaY) < threshold) return;
  navigateTo(currentIndex + (deltaY > 0 ? 1 : -1));
};
```

**Why this order matters:** The early return must come BEFORE `e.preventDefault()`. If we check `isTransitioning` first and it's true, we'd still call `preventDefault()` and block scroll. The guard must be the first thing evaluated.

**Touch events:** `handleTouchEnd` does NOT call `e.preventDefault()` (it's `passive: true`), so touch scroll to AboutSection already works. No change needed there.

### About Pen Pose Addition

[VERIFIED: `src/lib/three/penPoses.ts` read — PenPose type + existing pose structure confirmed]

`PenPose` type requires:
```typescript
{
  pen: { rotation: [number, number, number]; position: [number, number, number] };
  camera: { position: [number, number, number]; fov: number };
  lighting: { accent: { position: [number, number, number]; color: string; intensity: number } | null };
}
```

**New pose to add** (locked in CONTEXT.md):
```typescript
// Add to PEN_POSES:
about: {
  pen: { rotation: [0.35, -0.2, 0.08], position: [-0.5, -0.3, 0] },
  camera: { position: [0, 0.05, 5.0], fov: 26 },
  lighting: {
    accent: { position: [0, 1, 2], color: "#00e5ff", intensity: 0.5 },
  },
},

// Add to MOBILE_PEN_POSES:
about: {
  pen: { rotation: [0.35, -0.2, 0.08], position: [0, 0.5, -0.2] },
  camera: { position: [0, 0.05, 5.0], fov: 30 },
  lighting: {
    accent: { position: [0, 1, 2], color: "#00e5ff", intensity: 0.5 },
  },
},
```

**`PoseName` type:** Currently `keyof typeof PEN_POSES`. Adding `about` automatically expands this union — no type change needed.

**`SECTION_TO_POSE` in useSnapScroll.ts:** Does NOT need updating — `about` is NOT a `[data-scroll-section]` snap target. It's triggered only by ScrollTrigger when `#about` enters viewport.

### ScrollTrigger for AboutSection

[VERIFIED: `src/hooks/useScrollHijack.ts` read — pattern confirmed]

Add after the existing `sections.forEach` block in `useGSAP`:

```typescript
// Add after all existing ScrollTrigger.create calls:
ScrollTrigger.create({
  trigger: "#about",
  start: "top 60%",
  onEnter: () => {
    const poses: Record<string, PenPose> = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
    penTargetRef.current = poses.about ?? null;
  },
  onEnterBack: () => {
    const poses: Record<string, PenPose> = isMobile ? MOBILE_PEN_POSES : PEN_POSES;
    penTargetRef.current = poses.about ?? null;
  },
});
```

**Scope note:** `useScrollHijack` uses `useGSAP({ scope, ... })`. The `#about` section lives OUTSIDE the `scope` ref (which is `productIntroContainerRef`). To trigger on `#about`, the selector must work globally. In GSAP, `ScrollTrigger.create` with a string `trigger` is always global regardless of `useGSAP` scope. This is safe. [VERIFIED: GSAP scope only affects `gsap.set/to/from` calls within the scoped context, not ScrollTrigger.create — [ASSUMED: GSAP scoped context behavior for ScrollTrigger]]

### Drag Rotation Implementation

[VERIFIED: `src/components/alias/AliasPenCanvas.tsx` + `AliasPenScene.tsx` read]

**Component data flow:**
```
AliasLayout
  └── AliasPenCanvas        ← owns drag refs + pointer handlers on wrapper div
        └── Canvas (R3F)
              └── AliasPenScene  ← reads drag refs in useFrame
```

**AliasPenCanvas additions:**

```typescript
// New refs (defined in AliasPenCanvas, passed to AliasPenScene):
const isDragging = useRef(0);      // useRef<number> — 1 when dragging, 0 when not
const lastPointerX = useRef(0);
const lastPointerY = useRef(0);
const dragRotX = useRef(0);
const dragRotY = useRef(0);

// Cursor state (useState OK — CSS only, not in animation path):
const [grabbing, setGrabbing] = useState(false);

// Pointer handlers on the wrapper div:
const handlePointerDown = (e: React.PointerEvent) => {
  e.currentTarget.setPointerCapture(e.pointerId);  // locked in CONTEXT.md
  isDragging.current = 1;
  lastPointerX.current = e.clientX;
  lastPointerY.current = e.clientY;
  setGrabbing(true);
};

const handlePointerMove = (e: React.PointerEvent) => {
  if (!isDragging.current) return;
  const deltaX = e.clientX - lastPointerX.current;
  const deltaY = e.clientY - lastPointerY.current;
  lastPointerX.current = e.clientX;
  lastPointerY.current = e.clientY;
  dragRotY.current += deltaX * 0.008;
  dragRotX.current = Math.max(-0.8, Math.min(0.8, dragRotX.current + deltaY * 0.006));
};

const handlePointerUp = () => {
  isDragging.current = 0;
  setGrabbing(false);
};
```

**Updated wrapper div:**
```tsx
<div
  className={`absolute inset-0 overflow-visible ${grabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
  aria-hidden="true"
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerLeave={handlePointerUp}  // safety — release if pointer leaves
>
```

**AliasPenScene additions:**

```typescript
// New props:
type AliasPenSceneProps = {
  reducedMotion: boolean;
  motionScale: number;
  tier: DeviceTier;
  isDragging: MutableRefObject<number>;
  dragRotX: MutableRefObject<number>;
  dragRotY: MutableRefObject<number>;
};

// Modified useFrame:
useFrame((state, delta) => {
  if (!penGroupRef.current || reducedMotion) return;
  const t = state.clock.elapsedTime;

  // Float: always applies
  penGroupRef.current.position.y =
    py + Math.sin(t * aliasSceneConfig.pen.idle.yFrequency) * aliasSceneConfig.pen.idle.yAmplitude * motionScale;

  if (isDragging.current) {
    // Drag mode: apply drag rotation directly
    penGroupRef.current.rotation.x = rx + dragRotX.current;
    penGroupRef.current.rotation.y = aliasSceneConfig.pen.rotation[1] + dragRotY.current;
  } else {
    // Idle mode: continuous Y spin
    penGroupRef.current.rotation.y += delta * aliasSceneConfig.pen.idle.rotationYSpeed * motionScale;
  }
});
```

**Note on `useReducedMotion` gate for drag:** CONTEXT.md requires `useReducedMotion` gate. When `reducedMotion === true`, `useFrame` already returns early — so drag rotation is implicitly gated. No separate check needed.

### Container Height Fix

[VERIFIED: `src/components/alias/AliasLayout.tsx` line 32]

**Current:** `className="relative hidden h-[500px] md:block"`

**Fixed:** `className="relative hidden md:flex flex-1 self-stretch min-h-[500px]"`

**Why this works:** The parent `<main>` uses `grid-cols-1 md:grid-cols-2 items-center`. In a CSS Grid with `items-center`, rows stretch to the tallest cell by default. `self-stretch` overrides `items-center` alignment to fill the available row height. `flex-1` allows the column to grow. The `AliasPenCanvas` wrapper `absolute inset-0` fills 100% of the right column.

**AliasPenCanvas wrapper fix:** Current code: `<div className="absolute inset-0" ...>`. This doesn't need changing — it has no `overflow-hidden`. The pen floating beyond the bounds will be visible as long as the parent is `overflow-visible` (the default). No change needed to `AliasPenCanvas.tsx` for overflow.

**However:** `glass-panel` CSS has `overflow: hidden` on `.glass-panel` class. The right column does NOT use `glass-panel` — it's a plain div. Safe.

### VideoBackground Integration

[VERIFIED: `src/components/hero/VideoBackground.tsx` read]

**VideoBackground props:** `{ className?: string }` — accepts optional className.

**VideoBackground structure:**
```
div (absolute inset-0 overflow-hidden pointer-events-none)
  └── video (absolute inset-0 h-full w-full object-cover, filter blur/opacity/scale)
  └── div (absolute inset-0 bg-black/50) ← overlay
```

**Why dynamic import:** `VideoBackground` uses `useReducedMotion` hook → it's already `'use client'`. Since it's imported inside a `'use client'` component (`AliasLayout`), direct import is technically fine. But CONTEXT.md locks `{ssr: false}` dynamic import. Reason: the `<video>` element produces a hydration warning when SSR attempts to render it (autoPlay attribute varies by reducedMotion, and media state is browser-only). [ASSUMED: SSR hydration warning rationale — but the decision is locked regardless]

**AliasLayout changes:**
```tsx
// Add at top:
const VideoBackground = dynamic(
  () => import('@/components/hero/VideoBackground'),
  { ssr: false, loading: () => null }
);

// Updated <main>:
<main className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-0 px-6 pt-28 pb-12 md:grid-cols-2 md:gap-8">
  {/* Video background — z-0, behind all content */}
  <VideoBackground className="z-0" />

  {/* Left column: content — z-10 */}
  <div className="relative z-10 w-full max-w-2xl">
    {children}
  </div>

  {/* Right column: 3D pen — z-10 */}
  <div
    className="relative z-10 hidden md:flex flex-1 self-stretch min-h-[500px]"
    aria-hidden="true"
  >
    ...
  </div>
</main>
```

**VideoBackground className prop:** `VideoBackground` spreads `className` into its root div `className={absolute inset-0 overflow-hidden pointer-events-none ${className}}`. Passing `className="z-0"` ensures it stays behind. The `main` element is `relative` — so `absolute inset-0` on VideoBackground fills the `main` area correctly.

**Stacking context:** No explicit stacking context conflict. `main` does not have `isolation: isolate`. The z-index order `z-0` (video) → `z-10` (columns) is simple and unambiguous.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Pointer capture / drag release | Custom mouse tracking | `e.currentTarget.setPointerCapture(e.pointerId)` | Browser handles capture even if pointer leaves element |
| Scroll interception | Custom rAF scroll loop | GSAP `gsap.to(window, { scrollTo })` (already in use) | Already implemented; just release the preventDefault |
| 3D pose lerp | Manual interpolation in useFrame | Existing `penTargetRef` + lerp system (already in HeroScene/AliasPenScene) | The pattern already works |
| Corner markers | CSS pseudo-elements | Plain `<div>` absolute children | CSS pseudo can't be targeted by Tailwind JIT easily; explicit divs are simpler |

---

## Common Pitfalls

### Pitfall 1: e.preventDefault() order in handleWheel
**What goes wrong:** Adding the guard AFTER `e.preventDefault()` — the browser still blocks scroll to AboutSection.
**Why it happens:** Easy to miss that `e.preventDefault()` was the first line.
**How to avoid:** The new guard `if (currentIndex === targets.length - 1 && deltaY > 0) return;` must be LINE 1 of the handler, before any `preventDefault`.
**Verification:** After fix, scrolling down from the last product intro section should naturally scroll to AboutSection. Test by reaching the CTA section and scrolling down.

### Pitfall 2: `glass-panel` left in globals.css
**What goes wrong:** Deleting or modifying `glass-panel` CSS breaks HeroSection's editorial cards (which use `[data-scroll-section] .glass-panel` CSS rules in globals.css).
**How to avoid:** Replace `glass-panel` only in component classNames. DO NOT remove the CSS utility from `globals.css`.

### Pitfall 3: Drag rotation racing with idle rotation
**What goes wrong:** When drag ends, `penGroupRef.current.rotation.y` has accumulated from drag. The idle `+= delta * speed` loop resumes from that position but may visually jump if `dragRotY` reference is not properly reset.
**How to avoid:** Keep `dragRotY.current` accumulating freely — the idle loop adds to `rotation.y` via `+=` which means the pen continues from wherever it is. The Y rotation doesn't need resetting on drag-end. Only the `dragRotX` is clamped (pitch doesn't accumulate idle rotation). **Critical:** In idle mode, do NOT reset `rotation.x` to `rx` each frame — or if you do, also apply `dragRotX.current` so pitch persists.
**Pattern:**
```typescript
// In idle mode:
penGroupRef.current.rotation.x = rx + dragRotX.current; // always apply drag pitch
penGroupRef.current.rotation.y += delta * speed;         // always accumulate idle spin
```

### Pitfall 4: `self-stretch` not working in grid context
**What goes wrong:** `self-stretch` only works as an override on grid items, not flex items. If the parent `<main>` is switched to flex at some point, this breaks.
**How to avoid:** Keep `<main>` as `grid` (current — uses `grid-cols-1 md:grid-cols-2`). `self-stretch` works correctly in grid context. The `flex-1` is for the right column to fill the cell's full width.

### Pitfall 5: VideoBackground `absolute inset-0` escaping `<main>` bounds
**What goes wrong:** If `<main>` loses its `relative` class (e.g., a linter auto-removes it thinking it's redundant), the `absolute inset-0` VideoBackground will fill the nearest positioned ancestor instead.
**How to avoid:** Ensure `relative` is the first class on `<main>`. Add a comment: `{/* relative required for VideoBackground absolute positioning */}`.

### Pitfall 6: AboutSection `#about` id — scroll target conflict
**What goes wrong:** `useSnapScroll.ts` only targets `[data-scroll-section]` elements. `AboutSection` has `id="about"` but NOT `data-scroll-section`. So it's NOT added to snap targets — this is intentional. BUT if someone adds `data-scroll-section="about"` to AboutSection trying to add it to snap behavior, the fix in Pitfall 1 breaks (targets.length increases, last CTA section is no longer last).
**How to avoid:** AboutSection intentionally has NO `data-scroll-section` attribute. Only the ScrollTrigger in `useScrollHijack.ts` fires on `#about`. Do not add `data-scroll-section` to it.

### Pitfall 7: DS2 `rounded-none` on `/auth` input
**What goes wrong:** The existing input has `rounded-sm`. Removing it and not adding `rounded-none` explicitly in Tailwind v4 may keep default browser input styles.
**How to avoid:** Explicitly add `rounded-none` to the input className when removing `rounded-sm`.

### Pitfall 8: Pointer events on R3F Canvas stealing drag
**What goes wrong:** The R3F Canvas element itself captures pointer events for its own event system. If `onPointerDown` etc. are placed on the `<Canvas>` component directly, they may conflict.
**How to avoid:** Attach all pointer handlers to the **wrapper div** (the `absolute inset-0` div that contains the Canvas), not on `<Canvas>` itself. The wrapper div is a plain DOM element that handles events in the standard browser event model.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (config: `vitest.config.ts`) |
| Config file | `vitest.config.ts` — test dir: `tests/` |
| Quick run command | `bun run vitest tests/unit --run` |
| Full suite command | `bun run vitest --run` |

### Phase Requirements → Test Map

| Area | Behavior | Test Type | Automated Command | File Exists? |
|------|----------|-----------|-------------------|-------------|
| Design system | `AboutSection` module importable after restyling | module smoke | `bun run vitest tests/unit/aboutSection.test.ts --run` | ✅ `tests/unit/aboutSection.test.ts` |
| Design system | `aliasSceneConfig` shape unchanged | unit | `bun run vitest tests/unit/aliasSceneConfig.test.ts --run` | ✅ `tests/unit/aliasSceneConfig.test.ts` |
| Pen poses | `about` pose exists with correct shape | unit | new test in `tests/unit/penPoses.test.ts` | ❌ Wave 0 gap |
| Snap scroll | release logic — last index + deltaY>0 does not call preventDefault | unit | new test in `tests/unit/snapScrollRelease.test.ts` | ❌ Wave 0 gap |
| Drag rotation | clamp logic: dragRotX clamped to [-0.8, 0.8] | unit | new test in `tests/unit/dragRotation.test.ts` | ❌ Wave 0 gap |

### Wave 0 Gaps
- [ ] `tests/unit/penPoses.test.ts` — verifies `about` pose exists in both `PEN_POSES` and `MOBILE_PEN_POSES`, has correct shape
- [ ] `tests/unit/snapScrollRelease.test.ts` — unit test for the guard logic (pure function extraction or logic test)
- [ ] `tests/unit/dragRotation.test.ts` — verifies clamp behavior for dragRotX

**Existing tests to verify still pass:**
- `tests/unit/aboutSection.test.ts` — module import smoke (must pass after AboutSection restyling)
- `tests/unit/aliasSceneConfig.test.ts` — shape tests (untouched, must still pass)

---

## Environment Availability

Step 2.6: Phase is code/config-only. No external service dependencies beyond Node/bun/browser. Bun is confirmed available (bun.lock present).

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| bun | build/test | ✓ | — (bun.lock present) | — |
| GSAP ScrollTrigger | scroll + pose trigger | ✓ | ^3.14.2 (package.json) | — |
| @react-three/fiber | 3D canvas | ✓ | ^9.5.0 (package.json) | — |
| next/dynamic | VideoBackground SSR bypass | ✓ | Next.js 16.2.2 | — |
| /videos/animation.mp4 | VideoBackground | ✓ | already used by HeroSection | — |

---

## Security Domain

> These changes are purely UI/styling + client-side interaction. No authentication, data handling, or API surface changes.

| ASVS Category | Applies | Note |
|---------------|---------|------|
| V2 Authentication | No | No auth logic changes |
| V3 Session Management | No | No session changes |
| V4 Access Control | No | No access control changes |
| V5 Input Validation | Minimal | `/auth` input unchanged — existing `type="email"` + non-empty check stays |
| V6 Cryptography | No | — |

No new security surface introduced.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | GSAP ScrollTrigger with string `trigger` selector is global even when used inside `useGSAP({ scope })` | Architecture Patterns — ScrollTrigger for AboutSection | ScrollTrigger may not find `#about` if scope restricts selection; workaround: use `document.getElementById('about')` as trigger |
| A2 | SSR hydration warning is the reason for `{ssr: false}` on VideoBackground | Architecture Patterns — VideoBackground | Decision is locked in CONTEXT.md regardless of true reason; no risk |

---

## Sources

### Primary (HIGH confidence)
- `creative-agency-template.aura.build/design-system2.html` lines 95–371 — Design pattern HTML reference (read in full)
- `src/components/alias/AliasLayout.tsx` — Current layout structure
- `src/components/alias/AliasPenScene.tsx` — Current 3D scene + useFrame pattern
- `src/components/alias/AliasPenCanvas.tsx` — Current canvas wrapper
- `src/lib/three/aliasSceneConfig.ts` — Current scene constants
- `src/hooks/useSnapScroll.ts` — Current scroll hook (exact bug confirmed)
- `src/hooks/useScrollHijack.ts` — ScrollTrigger pattern for pose updates
- `src/lib/three/penPoses.ts` — PenPose type + existing poses
- `src/components/hero/VideoBackground.tsx` — Component API
- `src/app/beta/page.tsx`, `src/app/auth/page.tsx`, `src/app/dashboard/page.tsx` — Current page state
- `src/components/about/AboutSection.tsx` — Current about section state
- `src/app/globals.css` — `glass-panel` CSS definition
- `vitest.config.ts` + `tests/unit/` — Existing test infrastructure
- `.planning/phases/10-design-system-polish-ux-refinements/10-CONTEXT.md` — All locked decisions

### Tertiary (LOW confidence — flagged in Assumptions Log)
- GSAP scoped context + ScrollTrigger interaction behavior (A1)

---

## Metadata

**Confidence breakdown:**
- Design system delta (what to change per component): HIGH — all files read, exact classes inventoried
- Snap scroll fix: HIGH — exact code confirmed, fix is 2 lines
- Drag rotation pattern: HIGH — R3F pointer event pattern is standard, refs approach confirmed by existing AliasPenScene use of refs in useFrame
- Container height fix: HIGH — exact class identified, grid behavior confirmed
- VideoBackground integration: HIGH — component API confirmed, no edge cases

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stable stack, no external API dependencies)
