---
phase: 7
slug: fallbacks-and-reduced-motion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `bun run lint` |
| **Full suite command** | `bun run build && bun run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bun run lint`
- **After every plan wave:** Run `bun run build && bun run lint`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | WebGL fallback | — | N/A | manual | visual check in browser with WebGL disabled | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | Video fallback premium | — | N/A | manual | visual check video opacity/visibility | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 2 | Reduced motion CSS | — | N/A | unit | `bun run lint` | ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 2 | GSAP matchMedia | — | N/A | manual | test with OS reduced-motion enabled | ❌ W0 | ⬜ pending |
| 07-02-03 | 02 | 2 | HeroMobile entrance | — | N/A | manual | check no animation flicker on mobile | ❌ W0 | ⬜ pending |
| 07-03-01 | 03 | 3 | WCAG AA contrast | — | N/A | manual | axe/browser devtools contrast check | ❌ W0 | ⬜ pending |
| 07-03-02 | 03 | 3 | ARIA attributes | — | N/A | unit | `bun run build` (no TS errors) | ❌ W0 | ⬜ pending |
| 07-03-03 | 03 | 3 | Keyboard focus | — | N/A | manual | tab through hero with keyboard | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements — vitest + ESLint + tsc already in place.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| WebGL disabled fallback renders | 07-01 | No automated WebGL capability detection test | Open browser DevTools → Disable WebGL → Reload → Verify HeroFallback shows with premium video |
| prefers-reduced-motion compliance | 07-02 | OS-level setting required | Enable "Reduce motion" in OS settings → Reload → Verify no animations play, content immediately visible |
| Keyboard tab order | 07-03 | Interactive browser testing | Tab through hero → Verify CTA buttons receive focus in logical order with visible focus ring |
| Contrast ratios | 07-03 | Visual/computed check | Use browser DevTools accessibility panel → Verify all text meets WCAG AA 4.5:1 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
