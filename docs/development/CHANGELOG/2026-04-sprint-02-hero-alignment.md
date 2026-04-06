# 2026-04 Sprint 02 — Hero Alignment and Polish

Data: 2026-04-05
Sprint: SPRINT-02
Fase: PHASE-02
Commits: `db3a6b2` (código), `a18fe7c` (documentação)

## Contexto

Esta entrada registra a conclusão do alinhamento do hero premium ao design system decidido após a auditoria da SPRINT-01.
O objetivo foi corrigir gaps reais de tokens, acessibilidade e naming sem reescrever a experiência existente.

## Mudanças registradas

### Código alterado

| Arquivo | Mudança |
|---------|---------|
| `src/app/globals.css` | `--color-bg` mudado de `#000000` para `#050a14` (gap A1). Bloco `@media (prefers-reduced-motion: reduce)` expandido para cobrir `.liquid-blob`, `.border-gradient-spin::before`, `.floating-badge`, `.floating-badge-center`, `.fade-slide-in` (gap B1) |
| `src/hooks/useSnapScroll.ts` | Parâmetro `reducedMotion` renomeado para `disableSnapScroll` (gap B2 — clareza de naming) |
| `src/components/hero/HeroSection.tsx` | Call site atualizado para usar `disableSnapScroll` |
| `eslint.config.mjs` | `.open-next/**` adicionado aos ignores do ESLint |

### Gaps resolvidos

| ID | Tema | Classificação | Resolução |
|----|------|---------------|-----------|
| A1 | Background `#000000` vs `#050a14` | update code | `globals.css:4` corrigido |
| B1 | CSS reduced-motion incompleto | update code | 5 classes adicionais cobertas |
| B2 | `useSnapScroll` naming confuso | code clarity | Renomeado para `disableSnapScroll` |
| A2 | Body font Inter vs Open Sans | pending decision | Verificado como conformante — já usa `var(--font-body)` |
| A3 | H1 scale conservador | pending decision | Verificado como conformante — já usa `lg:text-9xl` |

### Validação

- `bun run lint`: 0 erros
- `npx tsc --noEmit`: 0 erros
- `bun run build`: sucesso

### Decisões do owner

| Decisão | Resultado |
|---------|-----------|
| Body font | Open Sans (manter spec) — já conformante |
| H1 scale | Escalar para `lg:text-9xl` — já conformante |
| Scroll policy | Manter `e.preventDefault()` no wheel, validar manualmente |

### Regressões registradas para PHASE-04

1. Novas animações CSS devem ser cobertas pelo bloco `prefers-reduced-motion: reduce`
2. Snap scroll deve ser validado manualmente em cada alteração de hooks
3. Componentes novos devem usar `#050a14` como baseline de background
4. Naming de hooks deve ser semântico e claro

### Adiado conscientemente

- Deploy naming (`penflow77` vs `pen-tracking-demo`) — antes do próximo deploy para produção
- E2E automação de validação do hero (PHASE-04)
- Suite de testes automatizada para componentes UI (PHASE-04)
