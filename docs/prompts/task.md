# Visual & Design System Overhaul

## 1. Design System Merge
- [ ] Add Inter + Manrope fonts to [layout.tsx](file:///home/jeandias/projects/penflow77/app/layout.tsx) (keep Montserrat/Open Sans as secondary)
- [ ] Update [globals.css](file:///home/jeandias/projects/penflow77/app/globals.css): new accent `#ef233c`, black bg, dashed border utilities, editorial corner styles, gradient-blur nav effect
- [ ] Update design tokens (CSS variables) to reflect the merged Creative DS palette
- [ ] Create new button component styles (conic-gradient border, editorial look)

## 2. Section Transition Indicators
- [ ] Create `SectionDivider.tsx` component — visual gradient line + animated progress dot between folds
- [ ] Add section dividers between each scroll-hijacked section in [ProductIntroSection.tsx](file:///home/jeandias/projects/penflow77/components/product-intro/ProductIntroSection.tsx)
- [ ] Add "static lock" snap feeling via refined hold zones and visible section progress cue

## 3. Video Background Layer
- [ ] Create `VideoBackground.tsx` — full-viewport video with glass blur overlay
- [ ] Integrate in [HeroSection.tsx](file:///home/jeandias/projects/penflow77/components/hero/HeroSection.tsx) behind the 3D canvas, with blend/opacity for pen prominence
- [ ] Ensure video loops, is muted, and plays inline on all platforms

## 4. Mobile 3D Pen
- [ ] Remove [HeroMobile.tsx](file:///home/jeandias/projects/penflow77/components/hero/HeroMobile.tsx) static fallback gating in [HeroSection.tsx](file:///home/jeandias/projects/penflow77/components/hero/HeroSection.tsx)
- [ ] Render [HeroCanvas](file:///home/jeandias/projects/penflow77/components/hero/HeroCanvas.tsx#19-56) on mobile with reduced DPR and simpler settings
- [ ] Adjust mobile pen pose (smaller, centered) for touch viewports

## 5. Component Restyling (Creative DS)
- [ ] Restyle [HeroContent.tsx](file:///home/jeandias/projects/penflow77/components/hero/HeroContent.tsx) — Manrope headings, gradient text, editorial badge
- [ ] Restyle [HeroCTA.tsx](file:///home/jeandias/projects/penflow77/components/hero/HeroCTA.tsx) — conic-gradient border buttons matching Creative DS
- [ ] Restyle feature cards (AI Writing, Smart Sync, Focus Mode) — dashed borders, corner accents, editorial layout
- [ ] Restyle [ProductIntroBridge.tsx](file:///home/jeandias/projects/penflow77/components/product-intro/ProductIntroBridge.tsx) — editorial typography + red accent
- [ ] Restyle [ProductIntroCTA.tsx](file:///home/jeandias/projects/penflow77/components/product-intro/ProductIntroCTA.tsx) — editorial CTA with border animation

## 6. Verification
- [ ] Visual check at 375px, 768px, 1024px, 1440px viewports
- [ ] Confirm 3D pen renders on mobile
- [ ] Confirm video background is visible but blurred behind pen
- [ ] Confirm section transitions have visible indicators
- [ ] Run `bun run build` for compile check
