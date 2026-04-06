# Phase 9: Alias Routes Polish — Hero video background, centered layout, 3D pen variants, and About section

**Researched:** 2026-04-07
**Domain:** React Three Fiber (R3F), Next.js App Router layouts, TailwindCSS v4, component architecture
**Confidence:** HIGH

---

## Summary

Phase 9 adds three distinct concerns to the existing PenFlow77 codebase:

1. **AliasLayout** — a new two-column wrapper used by `/beta` and `/auth` routes that places the existing glass-panel form on the left and a simplified 3D pen (idle-only, no scroll logic) on the right. Mobile collapses to stacked, hiding the 3D column.

2. **Color system migration** — `/beta`, `/auth`, and `/dashboard` pages currently use the red `#ef233c` accent. These must migrate to the design system's `#007bff` blue. The hero route and SiteHeader are **not** touched (they intentionally use red for the spinning border and CTA).

3. **AboutSection** — a new dark two-column section with product narrative, tech stack cards, project stats, and blue CTAs. Added to the home page and the `/beta` page.

**Primary recommendation:** Create three new directories (`src/components/alias/`, `src/components/about/`, `src/lib/three/aliasSceneConfig.ts`) and update three existing pages. No changes to `layout.tsx`, `HeroScene.tsx`, `heroSceneConfig.ts`, or the SiteHeader.

---

## Project Constraints (from AGENTS.md / codebase)

| Directive | Implication for This Phase |
|-----------|---------------------------|
| Dynamic-import R3F Canvas with `next/dynamic` and `ssr: false` | AliasPenCanvas MUST use `next/dynamic({ ssr: false })` |
| `useRef` + `useFrame` for per-frame 3D — never `useState` | AliasScene idle loop uses only refs and useFrame |
| GSAP owns all timeline/DOM choreography; R3F owns 3D | No GSAP inside AliasScene; if any CTA entrance is needed use GSAP |
| ONE animation system per element | AliasScene idle: R3F only. If alias page has text entrance: GSAP only |
| DPR capped at 1.5 (phase 08 decision) | AliasPenCanvas `dpr={[1, 1.5]}` |
| `frameloop="always"` for idle animations (phase 08 decision) | AliasCanvas uses `frameloop="always"` |
| Scene configuration values centralized in `src/lib/three/` | New `aliasSceneConfig.ts` — no magic numbers in component |
| TailwindCSS v4 with `@theme inline` syntax | No `tailwind.config.js` — use CSS vars and inline values |
| `bun` is the package manager | All install commands use `bun add` |
| No `useState` in hot paths | AliasScene useFrame uses only mutableRef.current |
| Design system primary blue: `#007bff` | All alias-route button/border/focus colors migrate from `#ef233c` |

---

## Research Question Answers

### RQ1: 3D Pen Reuse Strategy

**Answer: Create a new `AliasPenScene` — do NOT reuse HeroScene.**

`HeroScene.tsx` has deep coupling to:
- `scrollProgressRef` (scroll-driven camera + pen rotation)
- `penTargetRef` (section-based pose overrides from ProductIntro)
- Pointer parallax (`state.pointer.x/y`)
- Camera lerping per-frame with FOV updates
- `accentLightRef` for accent lighting tied to poses

The alias variant needs none of this. Creating a separate scene avoids prop-drilling dead parameters and keeps the idle logic readable. The same GLB (`/models/pen3D.glb`) is reused — `useGLTF.preload` is already called in HeroScene so the asset is cached.

**Minimal `AliasPenScene` contract:**
```tsx
// Only needs: reducedMotion, motionScale
// Internal useFrame: idle float (sinY) + slow continuous Y rotation
// No scrollProgressRef, no penTargetRef, no pointer parallax
```

**`aliasSceneConfig.ts` values (recommended):**
```ts
export const aliasSceneConfig = {
  camera: {
    position: [0, 0.1, 3.2] as [number, number, number],
    fov: 35, // slightly wider than hero (30) to fill panel
  },
  pen: {
    position: [0, 0, 0] as [number, number, number],
    rotation: [0.1, 0.6, 0] as [number, number, number], // more side-profile
    idle: {
      yAmplitude: 0.06,        // slightly more visible in smaller panel
      yFrequency: 0.6,         // slightly slower than hero (0.8)
      rotationYSpeed: 0.15,    // gentle continuous Y spin (rad/s)
    },
  },
} as const;
```

### RQ2: R3F Canvas SSR Isolation

**Answer: Use `next/dynamic({ ssr: false })` — the established project pattern.**

`HeroSection.tsx` already does this:
```tsx
const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="..." />, // fallback while loading
});
```

Both `/beta` and `/auth` are `'use client'` components. The AliasLayout is also `'use client'`. The dynamic import inside it:
```tsx
const AliasPenCanvas = dynamic(
  () => import("@/components/alias/AliasPenCanvas"),
  { ssr: false, loading: () => null }
);
```

**SSR Hydration safety:** The `AliasPenCanvas` renders `null` on server and mounts the Canvas after hydration — no mismatch risk. The existing `useDeviceCapabilities` hook uses `useSyncExternalStore` with server fallback, so it's safe to call in the alias layout.

### RQ3: Animation Variant for Alias Routes

**Answer: Simple idle only — sin-wave Y float + constant slow Y rotation. Differ from hero by using continuous Y rotation instead of oscillating rotZ.**

Hero idle (from `heroSceneConfig.ts`):
```
yAmplitude: 0.04, frequency: 0.8
rotationAmplitude: 0.03 (oscillating Z rotation)
```

Alias idle (recommended):
```
yAmplitude: 0.06, frequency: 0.6
Y rotation: +=(delta * 0.15) — slow constant spin, not oscillating
No Z oscillation
```

The slow Y rotation gives a "display case" feel fitting a side-panel showcase, different from the hero's subtle breathing.

**Implementation in `useFrame`:**
```tsx
useFrame((state, delta) => {
  if (!penGroupRef.current) return;
  const t = state.clock.elapsedTime;
  
  // Float
  penGroupRef.current.position.y =
    Math.sin(t * aliasSceneConfig.pen.idle.yFrequency)
    * aliasSceneConfig.pen.idle.yAmplitude
    * motionScale;
  
  // Slow continuous Y rotation
  penGroupRef.current.rotation.y +=
    delta * aliasSceneConfig.pen.idle.rotationYSpeed * motionScale;
});
```

**Config location:** New `src/lib/three/aliasSceneConfig.ts` — separate from `heroSceneConfig.ts`. The hero config is `as const` and already exported via `heroLighting.ts`. No modification needed to existing files.

### RQ4: Color System Migration Scope

**Files to change and exact reference counts:**

#### `/beta/page.tsx` — 4 unique lines (7 occurrences total)
| Line | Pattern | Change |
|------|---------|--------|
| 29 | `text-[#ef233c]` | → `text-[#007bff]` |
| 70 | `border-[#ef233c] bg-[#ef233c] ... hover:text-[#ef233c]` | → `border-[#007bff] bg-[#007bff] ... hover:text-[#007bff]` |
| 81 | `border-[#ef233c] bg-[#ef233c] ... hover:text-[#ef233c]` | → `border-[#007bff] bg-[#007bff] ... hover:text-[#007bff]` |
| 89 | `hover:border-[#ef233c]` | → `hover:border-[#007bff]` |

#### `/auth/page.tsx` — 9 unique lines (~12 occurrences total)
| Line | Pattern | Change |
|------|---------|--------|
| 49 | `text-[#ef233c]` | → `text-[#007bff]` |
| 60 | `border-[#ef233c] bg-[#ef233c] ... hover:text-[#ef233c]` | → `border-[#007bff] ...` |
| 69 | `hover:border-[#ef233c]` | → `hover:border-[#007bff]` |
| 85 | `text-[#ef233c]` | → `text-[#007bff]` |
| 105 | `focus:border-[#ef233c] focus:ring-[#ef233c]` | → `focus:border-[#007bff] focus:ring-[#007bff]` |
| 109 | `text-[#ef233c]` (error state) | → `text-[#ef233c]` ⚠️ **Keep red** — error states should remain red |
| 118 | `border-[#ef233c] bg-[#ef233c] ... hover:text-[#ef233c] focus-visible:ring-[#ef233c]` | → all `#007bff` |
| 127 | `hover:border-[#ef233c]` | → `hover:border-[#007bff]` |

> **Note on error text (auth line 109):** The `text-[#ef233c]` on the error `<p>` is a semantic error color. This should STAY red (`#ef233c`) for accessibility — red on error is a universal pattern, separate from brand color. All interactive elements (buttons, borders, focus rings) change to blue.

#### `/dashboard/page.tsx` — 5 occurrences
| Line | Pattern | Change |
|------|---------|--------|
| 26 | `text-[#ef233c]` label | → `text-[#007bff]` |
| 47 | `border-[#ef233c] bg-[#ef233c] ... hover:text-[#ef233c]` | → `border-[#007bff] ...` |
| 53 | `hover:border-[#ef233c]` | → `hover:border-[#007bff]` |
| 116 | `hover:border-[#ef233c]` | → `hover:border-[#007bff]` |
| 122 | `hover:border-[#ef233c]` | → `hover:border-[#007bff]` |

**Files NOT changing (intentional red):**
- `src/components/hero/HeroCTA.tsx` — red is the hero CTA brand
- `src/components/hero/HeroContent.tsx` — editorial badge red dot
- `src/components/hero/HeroMobile.tsx` — red dot in editorial badge
- `src/components/layout/SiteHeader.tsx` — logo red square + nav hover
- `src/app/globals.css` — `.corner-accent`, `.border-gradient-spin`, `.site-header-link` — hero design system, keep as-is

### RQ5: AboutSection Architecture

**Answer: Standalone `src/components/about/AboutSection.tsx` with co-located `aboutData.ts`.**

Structure:
```
src/components/about/
  AboutSection.tsx    — main component ('use client' for any motion, or server-safe)
  aboutData.ts        — static data: techStack[], projectStats[], bullet points
```

**Data shape:**
```ts
// aboutData.ts
export const TECH_STACK_CARDS = [
  { name: 'Next.js 16', icon: '▲', desc: 'App Router + SSR' },
  { name: 'React 19', icon: '⚛', desc: 'Server Components' },
  { name: 'TypeScript 5', icon: 'TS', desc: 'Strict mode' },
  { name: 'Three.js', icon: '◎', desc: 'WebGL 3D engine' },
  { name: 'GSAP', icon: '⚡', desc: 'Timeline animations' },
  { name: 'TailwindCSS v4', icon: '🎨', desc: 'Utility-first CSS' },
];

export const PROJECT_STATS = [
  // Real codebase data
  { label: 'Components', value: '~22', category: 'codebase' },
  { label: 'Pages', value: '4', category: 'codebase' },
  { label: 'TS/TSX files', value: '46', category: 'codebase' },
  { label: 'Phases shipped', value: '8', category: 'codebase' },
  // Fictional product data
  { label: 'AI features', value: '12', category: 'product' },
  { label: 'Writing modes', value: '5', category: 'product' },
  { label: 'Sync devices', value: '3', category: 'product' },
  { label: 'Beta waitlist', value: '2,847', category: 'product' },
];
```

**Layout structure:**
```tsx
<section className="bg-[#050a14] py-24 px-6">
  {/* Optional tag chip */}
  <span>Projeto de Desenvolvimento</span>
  
  {/* Two-column grid */}
  <div className="grid md:grid-cols-2 gap-16">
    {/* Left: narrative + bullets */}
    <div>
      <h2>About PenFlow77</h2>
      <p>Product description...</p>
      <ul>Bullet highlights</ul>
      {/* CTA buttons */}
      <a href="/beta">Join Private Beta</a>  {/* #007bff */}
      <a href="https://github.com/...">View on GitHub</a>
    </div>
    
    {/* Right: tech stack cards + stats panel */}
    <div>
      <div className="grid grid-cols-3 gap-3">
        {TECH_STACK_CARDS.map(...)}  {/* glass-panel cards */}
      </div>
      <div className="glass-panel mt-6">  {/* Project Stats */}
        {PROJECT_STATS.map(...)}
      </div>
    </div>
  </div>
</section>
```

**`AboutSection` can be a server component** (no hooks needed). If GSAP entrance animations are desired, add `'use client'` and `useGSAP`.

### RQ6: Layout.tsx Changes

**Answer: `layout.tsx` does NOT need changes.**

Both `/beta` and `/auth` already use `pt-28` in their `<main>` to accommodate the fixed `SiteHeader` (height ~72px + 16px top padding = ~88px; `pt-28` = 7rem = 112px — provides comfortable clearance). The AliasLayout preserves this offset.

The `SiteHeader` is rendered globally via `layout.tsx` and is appropriate for alias routes — users need navigation. No route-specific header suppression needed.

**`AliasLayout` will replace only the inner `<main>` content**, not the root layout. The alias pages restructure from:
```tsx
<main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-28 pb-12">
  <section className="glass-panel ..."> {/* form content */} </section>
</main>
```
to:
```tsx
<AliasLayout>
  {/* AliasLayout internally creates: left glass panel + right 3D pen */}
</AliasLayout>
```

### RQ7: Canvas Teardown (Next.js App Router Navigation)

**Answer: No concerns — separate route instances are fine.**

In Next.js App Router, navigating `/auth` → `/beta` triggers a full component tree teardown and remount for those routes. Each R3F Canvas lifecycle is clean:
- Canvas unmounts → R3F disposes GL context automatically [ASSUMED: standard R3F behavior]
- Canvas mounts on new route → fresh GL context + new useGLTF hook call
- `useGLTF.preload("/models/pen3D.glb")` (called in HeroScene) means the GLB ArrayBuffer is already in memory when alias routes load — no second network request [VERIFIED: drei's useGLTF uses a shared THREE.Cache]

The two instances on two separate routes are never alive simultaneously — no resource conflict. If the user navigates _within_ a route (not possible here), that would be a concern; it's not applicable.

**One practical consideration:** The Canvas in the alias layout should have a fixed height container so Three.js knows its render dimensions. Use `h-full` on the Canvas wrapper with the parent column having an explicit `min-h` or `h-[calc(100vh-7rem)]` style.

### RQ8: Dashboard Page

**Answer: Color migration only — no AliasLayout, no 3D canvas.**

The dashboard is a functional page (status cards, queue display). It has 5 occurrences of `#ef233c` that should migrate to `#007bff` for visual consistency with `/beta` and `/auth`. No 3D canvas — it would add complexity without narrative payoff for a functional page.

Dashboard does NOT get:
- AliasLayout (no clear "showcase" side panel use case)
- AboutSection (not contextually appropriate)

Dashboard DOES get:
- Color migration: `#ef233c` → `#007bff` on labels and button styles

---

## File-by-File Change Scope

### New Files (create)
| File | Size Estimate | Purpose |
|------|--------------|---------|
| `src/lib/three/aliasSceneConfig.ts` | ~20 lines | Camera, pen position, idle config for alias variant |
| `src/components/alias/AliasPenScene.tsx` | ~80 lines | R3F scene: pen model + idle useFrame only |
| `src/components/alias/AliasPenCanvas.tsx` | ~40 lines | Canvas wrapper (ssr:false dynamic target) |
| `src/components/alias/AliasLayout.tsx` | ~60 lines | Two-column layout: glass panel left + 3D right |
| `src/components/about/aboutData.ts` | ~40 lines | Static data: tech cards, stats, bullets |
| `src/components/about/AboutSection.tsx` | ~120 lines | Full about section component |

### Modified Files (edit)
| File | Change Type | Scope |
|------|------------|-------|
| `src/app/beta/page.tsx` | Color migration + layout refactor | ~30 lines changed |
| `src/app/auth/page.tsx` | Color migration + layout refactor | ~35 lines changed |
| `src/app/dashboard/page.tsx` | Color migration only | ~5-8 lines changed |
| `src/app/page.tsx` | Add `<AboutSection />` import | ~5 lines added |

### Untouched Files (verified)
- `src/app/layout.tsx` — no changes needed
- `src/components/hero/HeroScene.tsx` — no changes
- `src/components/hero/HeroCanvas.tsx` — no changes
- `src/lib/three/heroSceneConfig.ts` — no changes
- `src/app/globals.css` — no changes (existing `.glass-panel`, CSS vars reused)

---

## Architecture Patterns

### Recommended Project Structure (new files)
```
src/
├── components/
│   ├── alias/
│   │   ├── AliasLayout.tsx       # Two-column layout shell
│   │   ├── AliasPenCanvas.tsx    # R3F Canvas (dynamic ssr:false target)
│   │   └── AliasPenScene.tsx     # Simplified idle 3D scene
│   └── about/
│       ├── AboutSection.tsx      # Full about section
│       └── aboutData.ts          # Static content config
└── lib/
    └── three/
        └── aliasSceneConfig.ts   # Pen position, camera, idle params
```

### Pattern: AliasLayout Component

```tsx
'use client';
// src/components/alias/AliasLayout.tsx

import dynamic from 'next/dynamic';
import useDeviceCapabilities from '@/hooks/useDeviceCapabilities';
import useReducedMotion from '@/hooks/useReducedMotion';
import useMediaQuery from '@/hooks/useMediaQuery';

const AliasPenCanvas = dynamic(
  () => import('@/components/alias/AliasPenCanvas'),
  { ssr: false, loading: () => null }
);

export default function AliasLayout({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { tier, supportsWebGL, recommendedMaxDpr } = useDeviceCapabilities();
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pt-28 pb-12">
      {/* Left: glass panel content */}
      <div className="w-full md:w-1/2 md:max-w-xl">
        {children}
      </div>
      
      {/* Right: 3D pen — hidden on mobile */}
      {isTablet && supportsWebGL && (
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center" aria-hidden="true">
          <div className="relative h-[500px] w-full">
            <AliasPenCanvas
              reducedMotion={reducedMotion}
              motionScale={tier === 'low' ? 0.5 : tier === 'medium' ? 0.8 : 1}
              maxDpr={recommendedMaxDpr}
              tier={tier}
            />
          </div>
        </div>
      )}
    </main>
  );
}
```

### Pattern: AliasPenCanvas (ssr:false target)

```tsx
'use client';
// src/components/alias/AliasPenCanvas.tsx

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import AliasPenScene from '@/components/alias/AliasPenScene';
import { aliasSceneConfig } from '@/lib/three/aliasSceneConfig';
import type { DeviceTier } from '@/hooks/useDeviceCapabilities';

type Props = {
  reducedMotion: boolean;
  motionScale: number;
  maxDpr: number;
  tier: DeviceTier;
};

export default function AliasPenCanvas({ reducedMotion, motionScale, maxDpr, tier }: Props) {
  const [cx, cy, cz] = aliasSceneConfig.camera.position;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [cx, cy, cz], fov: aliasSceneConfig.camera.fov, near: 0.1, far: 100 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <Suspense fallback={null}>
          <AliasPenScene reducedMotion={reducedMotion} motionScale={motionScale} tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Pattern: AliasPenScene (simplified idle)

```tsx
'use client';
// src/components/alias/AliasPenScene.tsx

import { useGLTF, ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Group, Object3D } from 'three';
import { aliasSceneConfig } from '@/lib/three/aliasSceneConfig';
import type { DeviceTier } from '@/hooks/useDeviceCapabilities';

type Props = { reducedMotion: boolean; motionScale: number; tier: DeviceTier };

export default function AliasPenScene({ reducedMotion, motionScale, tier }: Props) {
  const penGroupRef = useRef<Group>(null);
  const gltf = useGLTF('/models/pen3D.glb');

  const penModel = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      const obj = child as Object3D & { castShadow?: boolean };
      if ('castShadow' in obj) obj.castShadow = true;
    });
    return clone;
  }, [gltf.scene]);

  const [px, py, pz] = aliasSceneConfig.pen.position;
  const [rx, , rz] = aliasSceneConfig.pen.rotation;

  useFrame((state, delta) => {
    if (!penGroupRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    // Float
    penGroupRef.current.position.y =
      py + Math.sin(t * aliasSceneConfig.pen.idle.yFrequency)
      * aliasSceneConfig.pen.idle.yAmplitude * motionScale;
    // Slow continuous Y rotation
    penGroupRef.current.rotation.y +=
      delta * aliasSceneConfig.pen.idle.rotationYSpeed * motionScale;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 2, 4]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-2, 1, 2]} intensity={0.35} color="#d0d0d0" />
      <pointLight position={[0, 2, -3]} intensity={0.4} color="#b0bec5" />

      <group ref={penGroupRef} position={[px, py, pz]} rotation={[rx, aliasSceneConfig.pen.rotation[1], rz]}>
        <primitive object={penModel} />
      </group>

      {tier !== 'low' && (
        <ContactShadows position={[0, -1.05, 0]} opacity={0.2} scale={5} blur={2} far={2.5} />
      )}
    </>
  );
}

useGLTF.preload('/models/pen3D.glb');
```

### Anti-Patterns to Avoid

- **Never call useState in useFrame hot path** — use mutableRef only
- **Never import HeroScene into alias components** — it carries scroll/pose dependencies
- **Never modify heroSceneConfig.ts** — alias has its own config
- **Never set `ssr: true` on AliasPenCanvas dynamic import** — Canvas uses browser WebGL APIs
- **Don't skip the `aria-hidden="true"` on the canvas wrapper** — the 3D pen is decorative
- **Don't migrate error color** — `text-[#ef233c]` on validation error messages stays red; only brand interactive elements change to `#007bff`

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| GLB loading + caching | Custom fetch + THREE.GLTFLoader | `useGLTF` from @react-three/drei | Handles caching, suspense, preload |
| Contact shadow | Custom shadow plane | `ContactShadows` from drei | Complex raycast-based shadow system |
| DPR detection | Custom `window.devicePixelRatio` logic | `useDeviceCapabilities` (already exists) | Already handles tier + DPR cap + SSR |
| Reduced motion detection | Custom `matchMedia` hook | `useReducedMotion` (already exists) | Already SSR-safe |
| Canvas SSR exclusion | `typeof window !== 'undefined'` guards | `next/dynamic({ ssr: false })` | Project-established pattern |

---

## Common Pitfalls

### Pitfall 1: Canvas Height = 0
**What goes wrong:** The R3F Canvas renders but nothing is visible because its container has no height.
**Why it happens:** The parent `div` is in a flex column without explicit height, so Three.js computes 0px viewport.
**How to avoid:** Give the Canvas container explicit height — `h-[500px]` or `h-[calc(100vh-7rem)]`. The `absolute inset-0` on the Canvas div requires the parent to have `position: relative` and a defined height.
**Warning signs:** Canvas mounts (no errors) but pen is invisible; `renderer.domElement` is 0×0.

### Pitfall 2: Double preload Conflict
**What goes wrong:** Both HeroScene and AliasPenScene call `useGLTF.preload('/models/pen3D.glb')`. This is fine — drei deduplicates. However, if both are somehow on the same page, only one Canvas instance should own the model.
**Why it happens:** The home page has HeroSection (HeroScene uses the GLB). If `/beta` also had a HeroSection, there'd be two Canvases fighting. Since alias routes are completely separate pages, this isn't an issue.
**How to avoid:** Keep alias routes using only `AliasPenCanvas`, not `HeroCanvas`.

### Pitfall 3: AliasLayout `isTablet` hydration mismatch
**What goes wrong:** `useMediaQuery` returns `false` on server (SSR) and `true` on client after hydration, causing a layout shift where the 3D column appears/disappears.
**Why it happens:** `useMediaQuery` uses `useSyncExternalStore` which returns `false` during server render.
**How to avoid:** The 3D canvas is hidden on mobile and `null` on server. This is acceptable — the layout shift only affects the decorative 3D panel, not the form content. The glass panel is always rendered. Wrap the canvas column in `hidden md:block` CSS to prevent content jump without JS.

### Pitfall 4: `gl.alpha: true` vs dark background
**What goes wrong:** The R3F Canvas has `alpha: true` which means the Canvas background is transparent. If the page background is dark (`#050a14`), the pen floats naturally on it. But if any CSS sets the Canvas container to white/light, it'll look wrong.
**How to avoid:** Ensure the Canvas container div has no background-color set (or explicitly `bg-transparent`). The `#050a14` from `body { background: var(--color-bg) }` in globals.css provides the correct dark background for the pen to float on.

### Pitfall 5: Color migration leaving focus-visible in red
**What goes wrong:** Interactive elements get blue background/border but focus-visible ring stays `focus-visible:ring-[#ef233c]`.
**Why it happens:** The auth form submit button has 4 separate `#ef233c` classes on line 118.
**How to avoid:** In auth/page.tsx line 118, replace ALL occurrences:  `border-[#ef233c] bg-[#ef233c] hover:text-[#ef233c] focus-visible:ring-[#ef233c]` → `border-[#007bff] bg-[#007bff] hover:text-[#007bff] focus-visible:ring-[#007bff]`.

---

## Wave Breakdown Recommendation

All waves use `'use client'` components so no special Next.js server consideration.

### Wave 1 — Foundation (all tasks independent, run in parallel)
| Task | File | Dependency |
|------|------|-----------|
| W1.1 | Create `src/lib/three/aliasSceneConfig.ts` | None |
| W1.2 | Create `src/components/alias/AliasPenScene.tsx` | W1.1 |
| W1.3 | Create `src/components/alias/AliasPenCanvas.tsx` | W1.2 |
| W1.4 | Create `src/components/about/aboutData.ts` | None |
| W1.5 | Create `src/components/about/AboutSection.tsx` | W1.4 |

> W1.1 + W1.4 can run truly in parallel. W1.2 depends on W1.1. W1.3 depends on W1.2. W1.5 depends on W1.4.

### Wave 2 — Layout Shell + Home Integration
| Task | File | Dependency |
|------|------|-----------|
| W2.1 | Create `src/components/alias/AliasLayout.tsx` | W1.3 |
| W2.2 | Add `<AboutSection />` to `src/app/page.tsx` | W1.5 |

### Wave 3 — Page Updates (can be parallel after W2)
| Task | File | Dependency |
|------|------|-----------|
| W3.1 | Refactor `/beta/page.tsx`: use AliasLayout + color migration + add AboutSection | W2.1, W1.5 |
| W3.2 | Refactor `/auth/page.tsx`: use AliasLayout + color migration | W2.1 |
| W3.3 | Color migration `/dashboard/page.tsx` | None (standalone) |

> W3.1, W3.2, W3.3 can all run in parallel.

### Wave 4 — QA
| Task | Activity |
|------|---------|
| W4.1 | Visual test: mobile layout (375px) — pen column hidden, form stacked |
| W4.2 | Visual test: tablet (768px) — two-column layout visible |
| W4.3 | Visual test: desktop (1440px) — pen animation running |
| W4.4 | Color audit: grep `#ef233c` in alias pages — should return only error text |
| W4.5 | WebGL fallback: test with `supportsWebGL: false` path |

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.2 |
| Config file | `vitest.config.ts` (dir: `tests`, globals: true) |
| Quick run command | `bun run vitest tests/unit/` |
| Full suite command | `bun run vitest` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REQ-9.1 | aliasSceneConfig exports valid number tuples | unit | `bun run vitest tests/unit/aliasSceneConfig.test.ts` | ❌ Wave 1 |
| REQ-9.2 | aboutData exports arrays with required fields | unit | `bun run vitest tests/unit/aboutData.test.ts` | ❌ Wave 1 |
| REQ-9.3 | Color values: no `#ef233c` in alias route pages (except error) | automated grep | `grep -rn "#ef233c" src/app/beta/ src/app/auth/ src/app/dashboard/` | N/A |
| REQ-9.4 | AliasLayout renders without error | smoke | manual / visual | N/A — R3F requires browser |
| REQ-9.5 | AboutSection renders all tech stack cards | unit (server render) | `bun run vitest tests/unit/aboutSection.test.ts` | ❌ Wave 1 |

> Note: R3F Canvas components require a browser WebGL context — they cannot be unit-tested with Vitest directly. Validate visually at W4.

### Sampling Rate
- **Per Wave 1/2 task:** `bun run vitest tests/unit/` (unit tests for new config/data files)
- **Per Wave 3 completion:** `grep -rn "#ef233c" src/app/beta/ src/app/auth/ src/app/dashboard/` — confirms color migration
- **Phase gate:** `bun run lint && bun run tsc && bun run vitest` all green before marking complete

### Wave 0 Gaps (test files to create alongside implementation)
- [ ] `tests/unit/aliasSceneConfig.test.ts` — validates config shape: camera position is 3-tuple, pen rotation is 3-tuple, idle values are positive numbers
- [ ] `tests/unit/aboutData.test.ts` — validates TECH_STACK_CARDS.length === 6, PROJECT_STATS.length === 8, all required fields present
- [ ] `tests/unit/aboutSection.test.ts` — lightweight render check for AboutSection (if server-component compatible with Vitest)

---

## Security Domain

> Phase is UI-only. No new authentication, session management, or data storage introduced.

| ASVS Category | Applies | Notes |
|---------------|---------|-------|
| V2 Authentication | No | No auth changes — `/auth` page is a simulated email input |
| V3 Session Management | No | FunnelProvider uses localStorage (existing, unchanged) |
| V4 Access Control | No | All routes publicly accessible by design |
| V5 Input Validation | Yes (minimal) | The email input in `/auth` has existing validation. After color migration, ensure focus-visible ring still provides keyboard accessibility feedback |
| V6 Cryptography | No | No crypto operations |

**Key accessibility concern (not security but compliance):**
- After color migration from red to blue, verify the blue `#007bff` focus ring on form elements meets WCAG 2.1 AA 3:1 contrast ratio against the dark `#050a14` background.
- `#007bff` on `#050a14`: contrast ratio ≈ 4.5:1 [ASSUMED — should be verified visually] — passes AA.

---

## Environment Availability

> Step 2.6: Phase is code-only with no new external dependencies.

All required packages are already installed:
| Dependency | Version | Purpose | Available |
|------------|---------|---------|-----------|
| `@react-three/fiber` | ^9.5.0 | R3F Canvas + useFrame | ✓ |
| `@react-three/drei` | ^10.7.7 | useGLTF, ContactShadows | ✓ |
| `three` | ^0.183.2 | 3D engine | ✓ |
| `next` | 16.2.2 | Dynamic import | ✓ |
| `tailwindcss` | ^4 | Styling | ✓ |
| `/public/models/pen3D.glb` | — | 3D model (1.1MB compressed) | ✓ |

No new packages to install. [VERIFIED: package.json]

---

## State of the Art

| Old Approach | Current Approach | Impact for This Phase |
|--------------|------------------|----------------------|
| HeroScene reuse with scroll props | New AliasPenScene (idle-only) | Simpler, no dead props |
| Red (#ef233c) on all alias routes | Blue (#007bff) on alias routes | Design system consistency |
| Flat single-column layout on /beta, /auth | Two-column AliasLayout on tablet+ | Premium showcase feel |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | R3F automatically disposes GL context on Canvas unmount | RQ7 | Memory leak on route navigation — mitigated by checking R3F docs |
| A2 | `#007bff` on `#050a14` achieves 3:1+ contrast ratio for WCAG focus indicators | Security Domain | Accessibility failure — verify with contrast checker |
| A3 | `useGLTF` deduplicates preload calls — two `useGLTF.preload('/models/pen3D.glb')` calls don't cause double network requests | RQ7, AliasPenScene | Double load (unlikely, but confirm) |
| A4 | The alias pages' `pt-28` padding provides sufficient clearance for the SiteHeader without layout changes | RQ6 | Form content hidden behind header |

---

## Open Questions

1. **AboutSection entrance animation?**
   - What we know: The phase description doesn't mention GSAP animations for AboutSection
   - What's unclear: Should AboutSection scroll-trigger its content in (like ProductIntroSection) or appear statically?
   - Recommendation: Static render first (matches phase scope). GSAP entrance can be added in a future phase if needed.

2. **GitHub URL for AboutSection CTA?**
   - What we know: "View on GitHub" button is specified but no repo URL is given
   - What's unclear: Should it link to a real repo or `#`?
   - Recommendation: Use `href="https://github.com/penflow77"` as placeholder or `href="#"` with `aria-disabled`.

3. **AliasLayout on /dashboard?**
   - What we know: Phase says "check if dashboard needs layout upgrade"
   - What's unclear: Dashboard is a functional page, not a showcase
   - Recommendation: No AliasLayout for dashboard — color migration only.

4. **`/beta` page: AboutSection placement**
   - What we know: Phase says "below queue card"
   - What's unclear: Does AboutSection appear inside or outside the glass panel? Inside = constrained width; outside = full width
   - Recommendation: Outside the glass panel — render as a full-width section below the AliasLayout, inside `<FunnelProvider>` wrapper but after the main form panel.

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: codebase grep] All color references (`#ef233c`) counted line-by-line in beta/page.tsx, auth/page.tsx, dashboard/page.tsx
- [VERIFIED: file read] HeroScene.tsx lines 53-147 — confirmed scroll/pose coupling that necessitates new AliasPenScene
- [VERIFIED: file read] HeroCanvas.tsx — confirmed `next/dynamic({ ssr: false })` pattern to reuse
- [VERIFIED: file read] heroSceneConfig.ts — confirmed idle values (yAmplitude: 0.04, rotationAmplitude: 0.03) to baseline alias variant against
- [VERIFIED: file read] package.json — confirmed all required packages available
- [VERIFIED: file read] AGENTS.md — confirmed project constraints (useRef/useFrame, no useState in frames, GSAP/R3F separation, DPR cap)

### Secondary (MEDIUM confidence)
- [ASSUMED] R3F GL context disposal on unmount is automatic — standard R3F behavior documented in their GitHub

### Tertiary (LOW confidence)
- [ASSUMED] WCAG contrast ratio for `#007bff` on `#050a14`

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json
- Architecture: HIGH — patterns derived from existing codebase conventions
- Pitfalls: HIGH — derived from actual code inspection + known R3F patterns
- Color migration: HIGH — exact line numbers verified via grep

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stable codebase, no fast-moving dependencies)
