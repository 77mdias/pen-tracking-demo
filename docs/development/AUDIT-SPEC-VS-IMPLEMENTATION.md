---
title: Audit — Spec vs Implementation
type: audit
status: published
sprint: SPRINT-01
date: 2026-04-04
---

# Audit — Spec vs Implementation

> Artefato canônico da Fase 01. Identifica divergências reais entre specs e código, classifica cada uma por ação necessária e alimenta PHASE-02 a PHASE-04 com insumos objetivos.

**Legenda de classificação:**
- `update code` — o código deve ser corrigido para alinhar com o spec
- `update spec` — o spec deve ser atualizado para refletir a implementação real
- `pending decision` — decisão de owner necessária antes de agir
- `conformant` — código e spec estão alinhados

---

## Resumo Executivo

| Categoria | Gaps | Conformantes | Decisões Pendentes |
|-----------|------|--------------|-------------------|
| A: Design System & Tipografia | 2 + 1 update code | 4 conformantes | 2 pending decisions |
| B: Hero UX (scroll, motion, fallback, mobile) | 1 update code + 1 clarity | 8 conformantes | 0 |
| C: Escopo Funcional (rotas placeholder) | 0 gaps — tudo confirmado como placeholder | — | 0 |
| D: Stack & Spec Currency | 5 update spec | — | 0 |
| E: Naming de Deploy | 0 gaps no código | — | 1 pending decision |

**Ação imediata mais crítica:** B1 (acessibilidade — CSS reduced-motion) e E2 (risco operacional de deploy).

---

## A — Design System & Tipografia

### A1 — Background base: `#000000` vs `#050a14`

| | |
|---|---|
| **Spec** | `AGENTS.md:105` — Page Background: `#050a14` |
| **Código** | `src/app/globals.css:4` — `--color-bg: #000000` |
| **Inconsistência** | A variável raiz do CSS usa preto puro. O hero sobrescreve localmente com `#050a14` em gradientes (`HeroSection.tsx:87`), mas o `body` usa `var(--color-bg)` = `#000000`. |
| **Classificação** | `update code` |
| **Ação** | Mudar `globals.css:4` de `#000000` para `#050a14` para alinhar a variável raiz com o spec e eliminar a sobreposição inconsistente. |
| **Sprint** | PHASE-02 |

---

### A2 — Fonte do body: Open Sans vs Inter

| | |
|---|---|
| **Spec** | `AGENTS.md:114` — Body: Open Sans — regular/light |
| **Código** | `src/app/globals.css:35` — `font-family: var(--font-inter), sans-serif` |
| **Contexto** | Open Sans é importada em `layout.tsx:30-34` como `--font-body`, mas **nunca usada como fonte padrão do body**. Inter é a fonte efetiva do body. |
| **Classificação** | `pending decision` |
| **Decisão necessária** | (a) Mudar `globals.css:35` para usar `var(--font-body)` e tornar Open Sans o padrão conforme spec; ou (b) Atualizar `AGENTS.md:114` para refletir Inter como fonte do body; ou (c) Documentar uso contextual de ambas. |
| **Sprint** | PHASE-02 (após decisão do owner) |

---

### A3 — Escala do H1: `lg:text-9xl` vs implementação conservadora

| | |
|---|---|
| **Spec** | `AGENTS.md:115` — H1: `text-6xl md:text-8xl lg:text-9xl` |
| **Código** | `src/components/hero/HeroContent.tsx:27` — `text-4xl md:text-6xl lg:text-7xl` |
| | `src/components/product-intro/ProductIntroBridge.tsx:16` — `text-5xl md:text-7xl lg:text-8xl` |
| **Contexto** | Ambas as implementações ficam abaixo de `lg:text-9xl`. Hero H1 usa `font-display` (Plus Jakarta Sans). Bridge usa `font-manrope`. Nenhuma usa `font-heading` (Montserrat) para o H1. |
| **Classificação** | `pending decision` |
| **Decisão necessária** | (a) Escalar para `lg:text-9xl` conforme spec; ou (b) Atualizar spec para refletir escala mais conservadora e diferenciar H1 (hero) de H2 (bridge) explicitamente. |
| **Sprint** | PHASE-02 (após decisão do owner) |

---

### A — Conformantes

| Token | Status | Evidência |
|-------|--------|-----------|
| Micro text: `text-[10px] tracking-[0.2em]` | ✓ conformant | `HeroContent.tsx:24`, `HeroScrollCue.tsx:15` |
| Glass panel: `rgba(255,255,255,0.03)` + blur(16px) saturate(180%) + border hierarchy | ✓ conformant | `globals.css:196-207` |
| Accent colors: `#007bff`, `#00bfff`, grays, white variants | ✓ conformant | `globals.css:5-13` |
| Fonte de heading: Montserrat `--font-heading` com pesos corretos | ✓ conformant | `layout.tsx:18-21` |

---

## B — Hero UX (scroll, motion, fallback, mobile)

### B1 — CSS reduced-motion: `.liquid-blob` e animações decorativas não cobertas

| | |
|---|---|
| **Spec** | `AGENTS.md:160-164` — "prefers-reduced-motion is first-class — ALL animation disabled" |
| **Código** | `src/app/globals.css:271-281` — bloco `@media (prefers-reduced-motion: reduce)` existe mas **não cobre**: `.liquid-blob` (`animation: hero-float 10s infinite`), `.border-gradient-spin::before` (`animation: border-spin 3s linear infinite`), `.floating-badge` / `.floating-badge-center` (`animation: badge-float 6s`) |
| **Impacto** | Quando reduced-motion está ativo: animações de texto e 3D param (GSAP + R3F tratam corretamente), mas blobs de fundo e badges continuam animando — violando o contrato do spec. |
| **Classificação** | `update code` |
| **Ação** | Adicionar ao bloco `@media (prefers-reduced-motion: reduce)` em `globals.css:281`: `.liquid-blob, .border-gradient-spin::before, .floating-badge, .floating-badge-center { animation: none !important; }` |
| **Sprint** | PHASE-02 (alta prioridade — acessibilidade) |

---

### B2 — `useSnapScroll`: parâmetro `reducedMotion` com nome enganoso

| | |
|---|---|
| **Spec** | — (issue de clareza interna, não de spec) |
| **Código** | `src/hooks/useSnapScroll.ts:8` — prop chamada `reducedMotion` significa "desativar snap scroll", não "prefers-reduced-motion"; `HeroSection.tsx:63-69` passa `reducedMotion: !enableScrollNarrative` (booleano invertido) |
| **Impacto** | Comportamento correto. Risco de manutenção: desenvolvedor futuro pode confundir a semântica do parâmetro. |
| **Classificação** | `code clarity` |
| **Ação** | Renomear para `disableSnapScroll` em `useSnapScroll.ts` e no call site de `HeroSection.tsx`. |
| **Sprint** | PHASE-02 (cleanup) |

---

### B — Conformantes

| Aspecto | Status | Evidência |
|---------|--------|-----------|
| `useGSAP` — nunca `useEffect` para GSAP | ✓ conformant | `useScrollHijack.ts:4`, `useHeroTimeline.ts:4`, `useHeroScrollProgress.ts:4` |
| Scroll hijacking não-agressivo: cooldown + scrub suave + desativado no mobile | ✓ conformant | `HeroSection.tsx:44`, `useSnapScroll.ts:93-97` |
| Reduced motion JS: conteúdo imediatamente visível, 3D estático, vídeo sem autoplay | ✓ conformant | `useHeroTimeline.ts:22-40`, `HeroCanvas.tsx:35`, `HeroFallback.tsx:16` |
| Mobile: separação limpa via `isMobile`, sem acoplamento com scroll narrativo | ✓ conformant | `HeroSection.tsx:38,44` |
| Fallback intencional: gradiente + vídeo blur + glass panel placeholder | ✓ conformant | `HeroFallback.tsx` |
| Config centralizada: sem magic numbers em componentes | ✓ conformant | `HeroScene.tsx:47-52`, `lib/three/*.ts` |
| Um sistema de animação por elemento: GSAP + R3F sem conflito | ✓ conformant | `HeroScene.tsx`, `useHeroTimeline.ts` |
| Parallax desativado em dispositivos coarse/touch | ✓ conformant | `HeroSection.tsx:40,46` |

---

## C — Escopo Funcional (rotas placeholder)

Todas as três rotas são **confirmadas como superfícies visuais sem comportamento funcional real**.

| Rota | Arquivo | Evidência de placeholder |
|------|---------|--------------------------|
| `/auth` | `src/app/auth/page.tsx` | JSX estático; botão `type="button"` sem handler; sem estado ou chamada de API |
| `/beta` | `src/app/beta/page.tsx` | Posição #214 hardcoded; botão sem handler; dados mockados |
| `/dashboard` | `src/app/dashboard/page.tsx` | Comentário explícito: "Simulated dashboard state described in the technical spec." Cards com estados fixos. |

**Backend:** Não existe diretório `/src/app/api/`. Nenhuma importação de banco de dados, e-mail ou provedor de autenticação encontrada em `src/`.

### C5 — TECH_SPEC_production.md descreve stack não implementada

| | |
|---|---|
| **Spec** | `TECH_SPEC_production.md` — descreve NestJS API, Drizzle ORM + PostgreSQL Neon, Resend email, endpoints REST (`POST /auth/register`, `POST /auth/login`, `GET /user/me`) |
| **Código** | Nada disso existe no repositório |
| **Classificação** | `update spec` — TECH_SPEC deve ser relabelado como roadmap/aspiracional, não como implementação atual |
| **Sprint** | PHASE-03 / PHASE-04 (quando backend for implementado) |

---

## D — Stack & Spec Currency

AGENTS.md marca os principais pacotes de animação/3D como "(to be installed)". Todos já estão instalados.

| Pacote | AGENTS.md | package.json | Classificação |
|--------|-----------|--------------|---------------|
| `gsap` | "(to be installed)" | `^3.14.2` | `update spec` |
| `@gsap/react` | "(to be installed)" | `^2.1.2` | `update spec` |
| `@react-three/fiber` | "(to be installed)" | `^9.5.0` | `update spec` |
| `@react-three/drei` | "(to be installed)" | `^10.7.7` | `update spec` |
| `three` | não mencionado | `^0.183.2` | `update spec` — adicionar ao stack table |

**Ação:** Atualizar a tabela de stack em `AGENTS.md` (linhas 29-30) para refletir versões instaladas e remover status "(to be installed)".

**Sprint:** Imediato (doc hygiene; baixo risco).

---

## E — Naming de Deploy

### E2 — `penflow77` vs `pen-tracking-demo`

| Config | Campo | Valor |
|--------|-------|-------|
| `package.json:2` | `name` | `"penflow77"` |
| `wrangler.jsonc:4` | `name` | `"pen-tracking-demo"` |
| `wrangler.jsonc:14` | `service` | `"pen-tracking-demo"` |
| Docs e brand | — | "PenFlow77" em todo lugar |

| | |
|---|---|
| **Classificação** | `pending decision` |
| **Risco** | Divergência cria ambiguidade em scripts de deploy, DNS/routing no Cloudflare Workers e coerência de marca. |
| **Decisão necessária** | Padronizar para `penflow77` (alinhado com marca e npm) ou `pen-tracking-demo` (nome Cloudflare atual) em todos os configs antes do próximo deploy. |
| **Sprint** | Antes do próximo deploy para produção |

---

## Prioridades e Handoff por Fase

| # | Gap | Impacto | Classificação | Sprint |
|---|-----|---------|---------------|--------|
| 1 | **B1** CSS reduced-motion gap | Alto — acessibilidade | `update code` | PHASE-02 |
| 2 | **E2** Deploy naming divergente | Alto — risco operacional | `pending decision` | Antes do próximo deploy |
| 3 | **C5** TECH_SPEC não reflete realidade | Alto — clareza para contribuidores | `update spec` | PHASE-03/04 |
| 4 | **A1** Background `#000000` vs `#050a14` | Médio — inconsistência visual | `update code` | PHASE-02 |
| 5 | **A2** Body font Inter vs Open Sans | Médio — consistência de marca | `pending decision` | PHASE-02 (após decisão) |
| 6 | **A3** H1 scale conservador vs spec | Médio — polish visual | `pending decision` | PHASE-02 (após decisão) |
| 7 | **D1-D5** Stack "(to be installed)" desatualizado | Baixo — doc hygiene | `update spec` | Imediato |
| 8 | **B2** `useSnapScroll` naming confuso | Baixo — risco de manutenção | `code clarity` | PHASE-02 cleanup |

---

## Decisões Pendentes (requer owner)

1. **Body font default:** Inter ou Open Sans? Impacta `globals.css:35` e `AGENTS.md:114`.
2. **H1 scale:** Escalar para `lg:text-9xl` ou atualizar spec para escala atual? Impacta `HeroContent.tsx:27`.
3. **Deploy naming:** `penflow77` ou `pen-tracking-demo`? Impacta `wrangler.jsonc:4,14` e todos os scripts de deploy.

---

## Fora de Escopo desta Auditoria

- Backend, auth, email, banco de dados — não implementados, classificados como roadmap
- Refatoração do hero além do CSS fix de acessibilidade (B1)
- Novas features ou melhorias estéticas sem âncora documental
