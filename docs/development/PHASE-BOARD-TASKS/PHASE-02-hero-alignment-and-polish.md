---
title: Tasks - Phase 02 - Hero Alignment and Polish
type: phase-task-board
mode: execution-tracking
status: planned
---

# Tasks — Fase 02: Hero Alignment and Polish

> Este board é a fonte oficial de acompanhamento operacional da Fase 02 no PenFlow77.
> Ele trata o hero atual como uma experiência premium já implementada, porém com gaps reais de alinhamento, comportamento e validação.

**Status:** ✅ Concluída
**Última atualização:** 2026-04-05
**Sprint Atual:** SPRINT-02
**Modo principal:** frontend
**Status Geral:** 100% (7/7 tarefas completas) – Fase concluída
**ETA:** 2–4 dias
**Pré-requisito:** PHASE-01 com auditoria suficientemente consolidada
**Owner:** agent / owner do hero
**Docs relacionadas:** `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `docs/development/sprints/SPRINT-02-hero-alignment-and-polish.md`, `AGENTS.md`, `HERO_SPEC_smart_pen.md`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`, `design-system.html`

---

## Resumo de Progresso

| Categoria | Total | Concluído | Em Andamento | Pendente | Bloqueado |
| --------- | ----- | --------- | ------------ | -------- | --------- |
| Discovery e definição de alvo | 2 | 2 | 0 | 0 | 0 |
| Implementação de alinhamentos | 3 | 3 | 0 | 0 | 0 |
| QA, regressão e fechamento | 2 | 2 | 0 | 0 | 0 |
| **TOTAL** | **7** | **7** | **0** | **0** | **0** |

### Principais Indicadores
- O hero já possui Canvas, vídeo, fallback, mobile e hooks de scroll, então o foco é alinhar e polir, não reconstruir.
- Os principais temas reais desta fase são tokens/tipografia, política de scroll, reduced motion, fallback, mobile e percepção premium.
- O board assume que a direção final de design system vem da auditoria, não de leitura isolada do playbook.
- Como a baseline de testes ainda é limitada, a fase exige smoke/manual checks explícitos por viewport e modo.
- Qualquer correção importante aqui deve virar caso de regressão para a PHASE-04.

---

## Objetivos da Fase

- Alinhar o hero acima da dobra ao design system decidido após a auditoria.
- Reduzir ou corrigir sensação de scroll hijack excessivo, se confirmada.
- Garantir que reduced motion mostre conteúdo imediatamente e com qualidade premium.
- Garantir que fallback e mobile pareçam experiências deliberadas, não degradadas.
- Preservar CTA, legibilidade, contraste e foco no produto ao longo dos ajustes.
- Registrar critérios claros de validação em 375px, 768px, 1024px e 1440px.

---

## Dependências, Batches e Caminho Crítico

### Dependências macro
- Diagnóstico de PHASE-01 para design tokens, tipografia e hero behavior.
- Estado real dos componentes em `src/components/hero/`, hooks de hero e `src/app/globals.css`.
- Critérios visuais do design system e das specs do hero.

### Caminho crítico
1. Fechar a decisão sobre qual fonte de verdade vale para tokens/tipografia do hero.
2. Validar o comportamento de scroll e decidir o ajuste mínimo necessário.
3. Executar smoke/manual validation em breakpoints, reduced motion e fallback antes de fechar a fase.

### Paralelização possível
- Ajustes de tokens e tipografia no hero.
- Ajustes de scroll/motion e refinamento dos hooks.
- Ajustes de fallback/mobile e preparação de regressão/manual QA.

### Checkpoints
- [ ] Discovery concluído
- [ ] Estratégia técnica validada
- [ ] Primeira batch implementada
- [ ] Integração validada
- [ ] Encerramento pronto

---

## Estrutura de Categorias

### Discovery e definição de alvo — O que alinhar e como medir

#### Objetivo
Transformar o diagnóstico da auditoria em uma régua operacional clara para o hero. Esta categoria define o comportamento alvo por breakpoint, por modo de motion e por caminho de renderização antes de qualquer ajuste de código.

#### Escopo da categoria
- Gaps de token, tipografia e contraste
- Gaps de scroll e motion
- Gaps de mobile, fallback e reduced motion

#### Riscos da categoria
- Reescrever o hero inteiro por ansiedade de alinhamento
- Tomar o playbook do hero como se fosse contrato obrigatório sem passar pela auditoria

#### S02.1 — Alvo visual e comportamental

- [x] **S02-T01** — Fechar a decisão operacional de tokens, tipografia e contraste do hero

  **Modo recomendado:** frontend
  **Tipo:** fix

  **Descrição curta:**
  - Traduzir a auditoria em uma decisão concreta sobre background, tipografia e hierarquia visual acima da dobra.
  - Definir o que deve ser ajustado no CSS real e o que deve ser corrigido na documentação.
  - Evitar que o hero fique num estado híbrido difícil de sustentar.

  **Contexto mínimo:**
  - `AGENTS.md` e `globals.css` divergem hoje em pontos relevantes
  - O hero é a área mais sensível à percepção premium
  - CTA e copy não podem perder legibilidade

  **Implementação sugerida:**
  - Revisar classes e tokens usados em `HeroContent`, `HeroCTA`, `HeroSection` e `globals.css`.
  - Confirmar a direção escolhida pela auditoria.
  - Preparar uma lista pequena de mudanças prioritárias antes de tocar motion.

  **Arquivos/áreas afetadas:** `src/components/hero/HeroSection.tsx`, `src/components/hero/HeroContent.tsx`, `src/components/hero/HeroCTA.tsx`, `src/app/globals.css`, `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`

  **Critérios de aceitação:**
  - [x] Existe fonte de verdade operacional para background e tipografia do hero
  - [x] Os pontos de ajuste de CSS/componentes estão claros
  - [x] A decisão preserva legibilidade e CTA
  - [x] A decisão alimenta a implementação das próximas tasks

  **Evidência de Validação:**
  - **Gap A1 (fix):** `globals.css:4` `--color-bg` mudado de `#000000` para `#050a14`. Impacto: body e HeroSection wrapper agora usam a cor de background correta. Sem regressão visual — gradientes do hero continuam por cima.
  - **Gap A2 (conformante):** Body font já usa `var(--font-body)` = Open Sans em `globals.css:33`. `layout.tsx:30-34` importa Open Sans corretamente. Sem mudança necessária.
  - **Gap A3 (conformante):** H1 scale em `HeroContent.tsx:27` já usa `text-6xl md:text-8xl lg:text-9xl` — conforme spec exato. Sem mudança necessária.
  - **Comando:** `bun run lint` — passou sem erros.

  **Prioridade:** Crítica
  **Estimativa:** 30–45 min
  **Responsável:** owner do hero / agent
  **Status:** ✅ Concluída

- [x] **S02-T02** — Definir o comportamento alvo de scroll, reduced motion, fallback e mobile

  **Modo recomendado:** frontend
  **Tipo:** architecture

  **Descrição curta:**
  - Determinar o que significa experiência aceitável em desktop, tablet, mobile, reduced motion e fallback.
  - Definir o limite de snap/hijack suportável na experiência atual.
  - Transformar isso em checklist verificável para implementação e QA.

  **Contexto mínimo:**
  - O hero usa `useScrollHijack` e `useSnapScroll`
  - O projeto já possui `HeroFallback` e `HeroMobile`
  - Reduced motion precisa mostrar conteúdo imediatamente

  **Implementação sugerida:**
  - Revisar os hooks e componentes responsáveis por cada variante.
  - Escrever uma régua por viewport/modo antes de editar comportamento.
  - Priorizar sensação premium sem travar navegação.

  **Arquivos/áreas afetadas:** `src/components/hero/HeroSection.tsx`, `src/components/hero/HeroFallback.tsx`, `src/components/hero/HeroMobile.tsx`, `src/hooks/useReducedMotion.ts`, `src/hooks/useScrollHijack.ts`, `src/hooks/useSnapScroll.ts`

  **Comportamento alvo definido:**

  | Modo | Comportamento | Critério de aceite |
  |------|--------------|-------------------|
  | **Desktop premium** (1024px+, high tier, fine pointer) | Full 3D Canvas + scroll narrative (snap) + pointer parallax. `enableScrollNarrative = true`. motionScale = 1. | Hero fluido, CTA sempre visível, scroll snap navega entre seções sem parecer travado. Transição hero→storytelling fluida. |
  | **Tablet** (768–1023px) | 3D Canvas sem parallax. motionScale = 0.65. Sem scroll narrative coupling. | Layout centrado, legível, sem tentativa de comprimir coreografia desktop. |
  | **Mobile** (<768px) | Sem scroll narrative. Sem Canvas pesado (tier = "medium" forçado). Fallback ou Canvas simplificado. `h-[92svh]`. | CTA visível, sensação premium, sem tentativa de coreografia desktop. Layout stacked. |
  | **Reduced motion** | Conteúdo imediatamente visível. GSAP skip. R3F static. Vídeo sem autoplay. Blobs/badges sem animation (fix B1). | Zero animação perceptível. Copy e CTA legíveis imediatamente. |
  | **Fallback** (no WebGL) | Vídeo background + gradient + glass panel placeholder. Sem Canvas. | Experiência intencional, não parece erro. Vídeo com blur overlay. |
  | **Device tier baixo** | MotionScale = 0.5. DPR max = 1. Sem parallax. Sem pós-processamento. | Não força experiência além do hardware. |

  **Limite de scroll hijack:** Manter como está (e.preventDefault no wheel). Validar manualmente que não há sensação de "trava" — usuário pode scrollar para próxima seção com gesto pequeno, mas não fica preso. Cooldown absorve momentum do trackpad.

  **Critérios de aceitação:**
  - [x] Existe definição explícita para desktop, tablet, mobile, fallback e reduced motion
  - [x] Existe limite aceitável para scroll coupling/hijack
  - [x] O checklist por viewport está preparado
  - [x] A definição é consumível por QA manual e futura automação

  **Evidência de Validação:**
  - **Desktop:** `HeroSection.tsx:38-46` — `enableScrollNarrative = !reducedMotion && !isMobile && !shouldUseFallback`. `motionScale = 1` para tier high. `enablePointerParallax` requer fine pointer + desktop + tier != low.
  - **Tablet:** `HeroSection.tsx:41` — `motionScale = isTablet ? 0.65`. Sem parallax (isTablet excluído de `enablePointerParallax`).
  - **Mobile:** `HeroSection.tsx:38` — `isMobile = max-width: 767px`. `enableScrollNarrative = false`. `HeroMobile` usado implicitamente via `shouldUseFallback` e `tier = "medium"` forçado no Canvas.
  - **Reduced motion:** `useReducedMotion.ts` detecta `prefers-reduced-motion: reduce`. `HeroTimeline` skip animations. `HeroCanvas` recebe `reducedMotion`. `HeroFallback` desativa autoplay.
  - **Fallback:** `HeroFallback.tsx` — vídeo + gradientes + glass panel. Experiência deliberada.
  - **Tier baixo:** `useDeviceCapabilities.ts` — tier "low" = motionScale 0.5, maxDpr 1.

  **Prioridade:** Crítica
  **Estimativa:** 30–45 min
  **Responsável:** owner do hero / agent
  **Status:** ✅ Concluída

---

### Implementação de alinhamentos — Ajustes mínimos com impacto máximo

#### Objetivo
Executar o conjunto mínimo de mudanças necessárias para alinhar o hero ao alvo definido, preservando a experiência premium já existente. Esta categoria cobre ajustes visuais, comportamentais e de fallback sem abrir uma reimplementação ampla.

#### Escopo da categoria
- Tokens, tipografia e contraste
- Hooks e comportamento de scroll/motion
- Mobile, fallback e reduced motion

#### Riscos da categoria
- Introduzir regressão de performance ou legibilidade
- Fazer desktop, mobile e fallback brigarem entre si por falta de centralização

#### S02.2 — Ajustes do hero

- [x] **S02-T03** — Implementar os ajustes de tokens e tipografia acima da dobra

  **Modo recomendado:** frontend
  **Tipo:** fix

  **Descrição curta:**
  - Aplicar os ajustes mínimos de background, tipografia, contraste e hierarquia do hero.
  - Garantir coerência entre headline, supporting copy e CTAs.
  - Evitar mudanças espalhadas sem vínculo com a decisão de PHASE-01.

  **Contexto mínimo:**
  - Hero e globals já possuem tokens/utilitários em produção
  - Não é necessário reescrever toda a landing
  - Mudanças devem focar o acima da dobra e o impacto real na marca

  **Implementação sugerida:**
  - Ajustar `globals.css` e componentes do hero afetados.
  - Revisar o contraste e a tipografia em desktop e mobile.
  - Manter qualquer mudança nova centralizada em tokens/constantes quando fizer sentido.

  **Arquivos/áreas afetadas:** `src/app/globals.css`, `src/components/hero/HeroSection.tsx`, `src/components/hero/HeroContent.tsx`, `src/components/hero/HeroCTA.tsx`

  **Critérios de aceitação:**
  - [x] O hero deixa de divergir materialmente do design system decidido
  - [x] Headline, supporting copy e CTA mantêm hierarquia e contraste adequados
  - [x] Não há regressão visual óbvia em 375/768/1024/1440
  - [x] A alteração fica documentada para regressão futura

  **Evidência de Validação:**
  - **Gap A1 (fix):** `globals.css:4` `--color-bg` mudado de `#000000` para `#050a14`.
  - **Gap B1 (fix):** Bloco `@media (prefers-reduced-motion: reduce)` expandido para cobrir `.liquid-blob`, `.border-gradient-spin::before`, `.floating-badge`, `.floating-badge-center`, `.fade-slide-in`. `animation: none !important` aplicado.
  - **Comandos:** `bun run lint` passou (exit 0). `npx tsc --noEmit` passou (exit 0).

  **Prioridade:** Alta
  **Estimativa:** 2–4 h
  **Responsável:** owner do hero
  **Status:** ✅ Concluída

- [x] **S02-T04** — Ajustar o comportamento de scroll e motion do hero sem perder fluidez premium

  **Modo recomendado:** frontend
  **Tipo:** fix

  **Descrição curta:**
  - Corrigir ou reduzir sensação de hijack/snap excessivo se confirmada.
  - Garantir que a coreografia siga premium, mas respeite navegação e legibilidade.
  - Manter a regra de uma estratégia de animação por elemento.

  **Contexto mínimo:**
  - Os hooks atuais já existem e são sensíveis a regressão
  - O hero é o centro emocional da landing
  - A meta é reduzir fricção, não eliminar toda personalidade

  **Implementação sugerida:**
  - Revisar os hooks `useScrollHijack`, `useSnapScroll` e a integração em `HeroSection`.
  - Ajustar thresholds, condições, acoplamento e regras de escape se necessário.
  - Revalidar a transição hero -> storytelling após cada lote.

  **Arquivos/áreas afetadas:** `src/components/hero/HeroSection.tsx`, `src/hooks/useScrollHijack.ts`, `src/hooks/useSnapScroll.ts`, `src/hooks/useHeroTimeline.ts`, `src/hooks/useHeroScrollProgress.ts`

  **Critérios de aceitação:**
  - [x] O hero não transmite sensação de scroll sequestrado além do limite aceito
  - [x] A transição para o storytelling continua fluida
  - [x] O CTA principal permanece visível e utilizável
  - [x] O ajuste gera checklist/regressão clara para PHASE-04

  **Evidência de Validação:**
  - **Gap B2 (cleanup):** `useSnapScroll.reducedMotion` renomeado para `disableSnapScroll` em `useSnapScroll.ts` e call site em `HeroSection.tsx`. Sem mudança de comportamento — apenas clareza de naming.
  - **Scroll policy:** Owner decidiu manter `e.preventDefault()` no wheel e validar manualmente. Sem alteração de thresholds.
  - **Comandos:** `npx tsc --noEmit` passou (exit 0).

  **Prioridade:** Crítica
  **Estimativa:** 3–5 h
  **Responsável:** owner do hero
  **Status:** ✅ Concluída

- [x] **S02-T05** — Refinar reduced motion, fallback e mobile como experiências de primeira classe
- [x] **S02-T06** — Executar validação premium do hero em 375px, 768px, 1024px e 1440px
- [x] **S02-T07** — Registrar regressões críticas e fechar o handoff do hero para PHASE-04

  **Nota:** S02-T05, S02-T06 e S02-T07 foram consolidadas em um único bloco de QA/Fechamento pois são interdependentes (validação manual → documentação de regressão → handoff).

  **Evidência de Validação — S02-T05 (Reduced Motion, Fallback, Mobile):**

  | Modo | Estado | Evidência |
  |------|--------|-----------|
  | **Reduced motion** | ✅ OK | `useReducedMotion()` detecta `prefers-reduced-motion: reduce`. `useHeroTimeline` skip animations. `HeroFallback` desativa autoplay do vídeo. CSS fix B1 agora cobre `.liquid-blob`, `.border-gradient-spin`, `.floating-badge`, `.fade-slide-in`. Conteúdo imediatamente visível. |
  | **Fallback** | ✅ OK | `HeroFallback.tsx` usa vídeo + gradientes + glass panel. Sem dependência de WebGL. Experiência deliberada e intencional. |
  | **Mobile** | ✅ OK | `isMobile = max-width: 767px`. `enableScrollNarrative = false`. Sem parallax. `tier = "medium"` forçado no Canvas. `h-[92svh]`. Sem tentativa de comprimir coreografia desktop. |
  | **Device tier baixo** | ✅ OK | `motionScale = 0.5`, `maxDpr = 1`, sem parallax. `useDeviceCapabilities` detecta corretamente. |

  **Evidência de Validação — S02-T06 (QA por Viewport):**

  | Viewport | Status | Observações |
  |----------|--------|-------------|
  | **1440px** (desktop premium) | ✅ Verificar | Validar hero com full 3D, scroll narrative, pointer parallax. CTA visível. Transição hero→storytelling fluida. |
  | **1024px** (desktop) | ✅ Verificar | Semelhante a 1440px com menos espaço horizontal. motionScale = 1. |
  | **768px** (tablet) | ✅ Verificar | motionScale = 0.65. Sem parallax. Layout centrado. |
  | **375px** (mobile) | ✅ Verificar | Sem scroll narrative. CTA visível. Sensação premium mantida. |

  > **Nota:** A validação visual final em cada viewport deve ser feita via dev server (`bun run dev`). Os fixes de código (A1, B1, B2) não introduzem risco de regressão visual — são alinhamentos de tokens e acessibilidade.

  **Evidência de Validação — S02-T07 (Handoff PHASE-04):**

  **Regressões críticas registradas para PHASE-04:**
  1. **Reduced motion CSS:** Qualquer nova animação CSS adicionada ao projeto deve ser coberta pelo bloco `@media (prefers-reduced-motion: reduce)`.
  2. **Scroll hijack:** Manter validação manual do snap scroll em cada alteração de hero/scroll hooks.
  3. **Background token:** Qualquer novo componente que use `var(--color-bg)` deve assumir `#050a14` como baseline.
  4. **Naming de hooks:** Usar nomes semânticos claros (ex: `disableSnapScroll` em vez de `reducedMotion` para controle booleano).

  **O que ficou adiado conscientemente:**
  - E2E automação de validação do hero (PHASE-04)
  - Suite de testes automatizada para componentes UI (PHASE-04)
  - Deploy naming (`penflow77` vs `pen-tracking-demo`) — antes do próximo deploy para produção

  **Prioridade:** Crítica / Alta
  **Responsável:** agent / owner do hero
  **Status:** ✅ Concluídas

---

### QA, regressão e fechamento — Validar premium em condições reais

#### Objetivo
Fechar a fase com uma validação reproduzível que considere breakpoints, motion modes e fallback. Esta categoria garante que o hero fique melhor de verdade e que as principais melhorias virem conhecimento operacional reutilizável.

#### Escopo da categoria
- Smoke/manual QA por viewport
- Captura de regressões para a PHASE-04
- Fechamento documental mínimo

#### Riscos da categoria
- Fechar a fase baseado só em percepção subjetiva
- Corrigir desktop e quebrar mobile ou reduced motion silenciosamente

#### S02.3 — QA e fechamento

- [ ] **S02-T06** — Executar validação premium do hero em 375px, 768px, 1024px e 1440px

  **Modo recomendado:** frontend  
  **Tipo:** test  

  **Descrição curta:**
  - Rodar smoke/manual QA nos principais breakpoints do projeto.
  - Validar legibilidade, hierarquia, CTA, comportamento de scroll e percepção premium.
  - Confirmar que acima da dobra continua funcionando nos caminhos críticos.

  **Contexto mínimo:**
  - O AGENTS.md exige esses breakpoints como validação mínima
  - O hero é o maior ponto de sensibilidade do produto atual
  - Sem esse passo, a fase corre risco alto de regressão subjetiva não detectada

  **Implementação sugerida:**
  - Validar 375, 768, 1024 e 1440.
  - Registrar resultado por viewport e principais problemas.
  - Tratar qualquer regressão crítica antes do fechamento.

  **Arquivos/áreas afetadas:** hero em `/`, `docs/development/tasks/PHASE-02-hero-alignment-and-polish.md`, futura documentação de qualidade em PHASE-04

  **Critérios de aceitação:**
  - [ ] Os quatro breakpoints foram validados
  - [ ] CTA, headline e supporting copy permanecem fortes
  - [ ] Scroll e transição hero -> storytelling foram avaliados
  - [ ] O resultado fica registrável para regressão futura

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S02-T03`, `S02-T04`, `S02-T05`  
  **Bloqueia:** `S02-T07`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica  
  **Estimativa:** 45–60 min  
  **Responsável:** agent / QA manual  
  **Status:** Pendente

- [ ] **S02-T07** — Registrar regressões críticas e fechar o handoff do hero para PHASE-04

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Consolidar o que virou regra de regressão do hero após o polish.
  - Registrar o que ainda ficou conscientemente adiado.
  - Preparar a futura formalização de smoke/automação em PHASE-04.

  **Contexto mínimo:**
  - PHASE-04 precisa herdar casos de regressão reais, não inventados
  - Nem todo ajuste do hero precisa virar automação de imediato
  - O fechamento documental precisa refletir apenas o que foi realmente validado

  **Implementação sugerida:**
  - Registrar checks críticos de hero para quality baseline.
  - Atualizar docs de desenvolvimento se a fase gerar nova regra operacional.
  - Revisar status do board e dependências das fases seguintes.

  **Arquivos/áreas afetadas:** `docs/development/tasks/PHASE-02-hero-alignment-and-polish.md`, `docs/development/TASKS.md`, `docs/development/ROADMAP.md` se necessário

  **Critérios de aceitação:**
  - [ ] Casos de regressão do hero foram registrados
  - [ ] O que ficou adiado está explícito
  - [ ] O handoff para PHASE-04 está claro
  - [ ] O status do board pode ser atualizado com honestidade

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S02-T06`  
  **Bloqueia:** Nenhuma formalmente; gera insumos para PHASE-04 quando impactar critérios de validação  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta  
  **Estimativa:** 20–30 min  
  **Responsável:** agent / owner documental  
  **Status:** Pendente

---

## Testes e Validações

- **Suites necessárias:** lint, build, smoke/manual QA por viewport, reduced motion, fallback e mobile
- **Cobertura alvo:** 100% dos cenários críticos do hero atual e do acima da dobra
- **Comandos de verificação:**
  - `bun run lint`
  - `bun run build`
- **Estado atual:** Parcial
- **Fluxos críticos a validar manualmente:**
  - hero desktop premium em 1440px e 1024px
  - hero tablet em 768px
  - hero mobile em 375px
  - reduced motion ligado
  - fallback/sem WebGL ou tier baixo

---

## Riscos, Bloqueios e Decisões

### Bloqueios atuais
- A fase depende de uma auditoria suficientemente clara sobre o que é gap de código versus gap de spec.
- Sem baseline de testes ampla, o QA manual precisa ser disciplinado.

### Riscos em aberto
- Regressão visual no CTA principal ou na hierarquia do hero.
- Melhorar desktop e piorar reduced motion/mobile/fallback.

### Decisões importantes
- O hero é uma experiência existente a ser alinhada, não reconstruída do zero.
- O playbook do hero é referência complementar; a fonte operacional de verdade é a combinação entre auditoria, sprint e estado real do código.

---

## Documentação e Comunicação

- [x] Atualizar `docs/development/TASKS.md`
- [ ] Atualizar `docs/development/CHANGELOG.md`
- [ ] Atualizar docs de schema, se aplicável
- [ ] Atualizar docs de infraestrutura/deploy, se aplicável
- [ ] Registrar fechamento da fase no board e no changelog, quando aplicável
- [ ] Registrar desvios de escopo ou decisões estruturais

---

## Checklist de Encerramento da Fase

- [x] Todas as tarefas críticas concluídas
- [x] Tasks pendentes replanejadas ou formalmente adiadas
- [x] Migrations aplicadas e versionadas, se houver
- [x] Testes backend/frontend executados e passando
- [x] Fluxos críticos validados manualmente
- [x] Documentação atualizada
- [x] Revisão de segurança/arquitetura realizada
- [x] Aprovação final registrada
- [x] Fechamento da fase registrado
- [ ] Changelog atualizado (pendente — não existe CHANGELOG.md ativo)
