# Design: Implementação das Decisões da Auditoria Sprint 01

**Data:** 2026-04-04  
**Status:** Aprovado pelo owner  
**Origem:** Decisões pendentes de `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md` (gaps A2, A3, E2)

---

## Contexto

A auditoria Sprint 01 identificou 3 decisões pendentes de owner. Este documento registra as decisões tomadas e o design de implementação.

---

## Decisão 1 — Body font: Open Sans (gap A2)

**Decisão:** Usar Open Sans como fonte padrão do body, conforme o spec original.

### Arquivos afetados

| Arquivo | Linha | Mudança |
|---------|-------|---------|
| `src/app/globals.css` | 35 | `var(--font-inter)` → `var(--font-body)` |
| `src/app/layout.tsx` | 51 | Remover classe `font-inter` do elemento `<body>` |

### Detalhe

`--font-body` está mapeado para Open Sans com pesos 300–700 (`layout.tsx:30-34`). A classe `font-inter` no elemento `<body>` tem especificidade suficiente para sobrescrever a regra CSS base, portanto ambas as mudanças são necessárias.

Elementos que precisam explicitamente de Inter continuam usando a classe `.font-inter` — nenhuma mudança neles.

---

## Decisão 2 — H1 scale `lg:text-9xl` + fix de clipping do descender "g" (gap A3)

**Decisão:** Escalar para `text-6xl md:text-8xl lg:text-9xl` conforme spec. Corrigir o clipping do descender do "g" em "reimagined" causado por `.split-line { overflow: hidden }`.

### Causa do clipping

`.split-line` usa `overflow: hidden` (necessário para a animação GSAP de line-reveal). O hack `pb-[0.24em] -mb-[0.24em]` nos wrappers de linha estende a boundary do clip para baixo, mas é insuficiente para o descender de "g" em Plus Jakarta Sans — especialmente com `leading-[0.85]`.

### Arquivos afetados

| Arquivo | Linha | Mudança |
|---------|-------|---------|
| `src/components/hero/HeroContent.tsx` | 27 | Escalar H1: `text-4xl md:text-6xl lg:text-7xl leading-[1.02] md:leading-[1]` → `text-6xl md:text-8xl lg:text-9xl leading-[0.85]` |
| `src/components/hero/HeroContent.tsx` | 28, 31 | Aumentar padding descender: `pb-[0.24em] -mb-[0.24em]` → `pb-[0.35em] -mb-[0.35em]` |

### Processo

1. Screenshot Playwright do estado atual (confirmar e documentar o clipping)
2. Aplicar mudanças
3. Screenshot Playwright pós-fix (verificar que o "g" aparece completo e o layout está correto)
4. Ajustar `pb` se necessário com base no Playwright

### Preservado

- `.split-line { overflow: hidden }` — não alterar (necessário para GSAP)
- Animação de line-reveal — sem mudança
- `font-display` no H1 — sem mudança (Plus Jakarta Sans mantido)

---

## Decisão 3 — Deploy naming: `pen-tracking-demo` (gap E2)

**Decisão:** Padronizar para `pen-tracking-demo` em todos os configs.

### Arquivos afetados

| Arquivo | Linha | Mudança |
|---------|-------|---------|
| `package.json` | 2 | `"name": "penflow77"` → `"name": "pen-tracking-demo"` |

`wrangler.jsonc` já usa `pen-tracking-demo` — nenhuma mudança necessária.

---

## Fora de Escopo

- Mudanças no AGENTS.md além do que já foi feito (stack table atualizada na Sprint 01)
- Outras divergências da auditoria (A1 background, B1 reduced-motion, B2 naming cleanup) — ficam para PHASE-02
- Mudanças em componentes além do H1 do hero

---

## Verificação

```bash
# Dev server para Playwright
bun run dev

# Playwright screenshots (antes e depois da mudança H1)
# verificar: "g" em "reimagined" aparece completo

# Lint final
bun run lint
```
