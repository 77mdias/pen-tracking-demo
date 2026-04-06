# Phase 6: Responsive and Mobile — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-05
**Phase:** 06-responsive-and-mobile
**Areas discussed:** Architecture HeroMobile

---

## Architecture HeroMobile

| Option | Description | Selected |
|--------|-------------|----------|
| Opção A — Componente separado | HeroMobile substitui HeroContent no mobile; tem próprio headline + CTA + layout; HeroContent fica só tablet/desktop | ✓ |
| Opção B — Expandir HeroContent | Sem novo componente, refinar isMobile props dentro do existente | |

**User's choice:** Opção A — Componente separado
**Notes:** HeroSection routeia `isMobile → <HeroMobile>`, HeroContent limpo de lógica mobile

---

## Visual Background do HeroMobile

| Option | Description | Selected |
|--------|-------------|----------|
| Canvas 3D (atual) | R3F canvas continua no mobile com motionScale reduzido | ✓ |
| Video fallback | HeroMobile usa /videos/animation.mp4 como background, sem canvas | |

**User's choice:** Canvas 3D — manter R3F no mobile
**Notes:** Canvas já roda corretamente com tier:"medium" + DPR cap 1.5

---

## Layout CTA-first

| Option | Description | Selected |
|--------|-------------|----------|
| CTA primário no topo, headline abaixo | True CTA-first reorder | ✓ |
| Headline no topo, CTA mais proeminente abaixo | Layout atual melhorado | |
| CTA e headline lado a lado centrados | Horizontal layout | |

**User's choice:** CTA primário no topo — true CTA-first
**Notes:** Ordem: badge → CTA → headline → subheadline

---

## Agent's Discretion

- Tablet behavior: motionScale=0.65 já implementado, planner audita gaps se houver
- Mobile 3D settings: tier, DPR, motionScale mantidos como estão
- Copy do subheadline mobile: planner pode manter texto atual

## Deferred Ideas

- Mobile video fallback — usuário preferiu manter canvas; ideia registrada
- Mobile scroll cue / progress indicator — Phase 8
- CTA animada no mobile — Phase 7/8 polish
