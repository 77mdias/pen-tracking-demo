---
title: Tasks - Phase 02 - Hero Alignment and Polish
type: phase-task-board
mode: execution-tracking
status: planned
---

# Tasks — Fase 02: Hero Alignment and Polish

> Este board é a fonte oficial de acompanhamento operacional da Fase 02 no PenFlow77.
> Ele trata o hero atual como uma experiência premium já implementada, porém com gaps reais de alinhamento, comportamento e validação.

**Status:** Planejada  
**Última atualização:** 2026-04-03  
**Sprint Atual:** SPRINT-02  
**Modo principal:** frontend  
**Status Geral:** 0% (0/7 tarefas completas) – Fase planejada  
**ETA:** 2–4 dias  
**Pré-requisito:** PHASE-01 com auditoria suficientemente consolidada  
**Owner:** agent / owner do hero  
**Docs relacionadas:** `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `docs/development/sprints/SPRINT-02-hero-alignment-and-polish.md`, `AGENTS.md`, `HERO_SPEC_smart_pen.md`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`, `design-system.html`

---

## Resumo de Progresso

| Categoria | Total | Concluído | Em Andamento | Pendente | Bloqueado |
| --------- | ----- | --------- | ------------ | -------- | --------- |
| Discovery e definição de alvo | 2 | 0 | 0 | 2 | 0 |
| Implementação de alinhamentos | 3 | 0 | 0 | 3 | 0 |
| QA, regressão e fechamento | 2 | 0 | 0 | 2 | 0 |
| **TOTAL** | **7** | **0** | **0** | **7** | **0** |

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

- [ ] **S02-T01** — Fechar a decisão operacional de tokens, tipografia e contraste do hero

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
  - [ ] Existe fonte de verdade operacional para background e tipografia do hero
  - [ ] Os pontos de ajuste de CSS/componentes estão claros
  - [ ] A decisão preserva legibilidade e CTA
  - [ ] A decisão alimenta a implementação das próximas tasks

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** PHASE-01  
  **Bloqueia:** `S02-T03`, `S02-T06`  
  **Pode rodar em paralelo com:** `S02-T02`

  **Prioridade:** Crítica  
  **Estimativa:** 30–45 min  
  **Responsável:** owner do hero / agent  
  **Status:** Pendente

- [ ] **S02-T02** — Definir o comportamento alvo de scroll, reduced motion, fallback e mobile

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

  **Critérios de aceitação:**
  - [ ] Existe definição explícita para desktop, tablet, mobile, fallback e reduced motion
  - [ ] Existe limite aceitável para scroll coupling/hijack
  - [ ] O checklist por viewport está preparado
  - [ ] A definição é consumível por QA manual e futura automação

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** PHASE-01  
  **Bloqueia:** `S02-T04`, `S02-T05`, `S02-T06`  
  **Pode rodar em paralelo com:** `S02-T01`

  **Prioridade:** Crítica  
  **Estimativa:** 30–45 min  
  **Responsável:** owner do hero / agent  
  **Status:** Pendente

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

- [ ] **S02-T03** — Implementar os ajustes de tokens e tipografia acima da dobra

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
  - [ ] O hero deixa de divergir materialmente do design system decidido
  - [ ] Headline, supporting copy e CTA mantêm hierarquia e contraste adequados
  - [ ] Não há regressão visual óbvia em 375/768/1024/1440
  - [ ] A alteração fica documentada para regressão futura

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S02-T01`  
  **Bloqueia:** `S02-T06`, `S02-T07`  
  **Pode rodar em paralelo com:** `S02-T04`, `S02-T05`

  **Prioridade:** Alta  
  **Estimativa:** 2–4 h  
  **Responsável:** owner do hero  
  **Status:** Pendente

- [ ] **S02-T04** — Ajustar o comportamento de scroll e motion do hero sem perder fluidez premium

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
  - [ ] O hero não transmite sensação de scroll sequestrado além do limite aceito
  - [ ] A transição para o storytelling continua fluida
  - [ ] O CTA principal permanece visível e utilizável
  - [ ] O ajuste gera checklist/regressão clara para PHASE-04

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S02-T02`  
  **Bloqueia:** `S02-T06`, `S02-T07`  
  **Pode rodar em paralelo com:** `S02-T03`, `S02-T05`

  **Prioridade:** Crítica  
  **Estimativa:** 3–5 h  
  **Responsável:** owner do hero  
  **Status:** Pendente

- [ ] **S02-T05** — Refinar reduced motion, fallback e mobile como experiências de primeira classe

  **Modo recomendado:** frontend  
  **Tipo:** fix  

  **Descrição curta:**
  - Garantir que reduced motion entregue conteúdo imediato e convincente.
  - Garantir que fallback e mobile sejam deliberados, legíveis e premium.
  - Evitar comprimir a coreografia desktop em contextos que pedem simplificação.

  **Contexto mínimo:**
  - `HeroFallback` e `HeroMobile` já existem
  - Fallback ruim dá aparência de bug, não de design deliberado
  - Mobile não deve replicar o desktop à força

  **Implementação sugerida:**
  - Revisar variantes de layout, presença de mídia, CTA e legibilidade nessas versões.
  - Ajustar gating por capabilities/reduced motion se necessário.
  - Registrar limitações aceitáveis de cada modo.

  **Arquivos/áreas afetadas:** `src/components/hero/HeroFallback.tsx`, `src/components/hero/HeroMobile.tsx`, `src/components/hero/HeroSection.tsx`, `src/hooks/useDeviceCapabilities.ts`, `src/hooks/useReducedMotion.ts`

  **Critérios de aceitação:**
  - [ ] Reduced motion mostra conteúdo imediatamente
  - [ ] Mobile mantém CTA, legibilidade e sensação premium
  - [ ] Fallback parece intencional e não quebrado
  - [ ] Device tier baixo não força experiência acima do necessário

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S02-T02`  
  **Bloqueia:** `S02-T06`, `S02-T07`  
  **Pode rodar em paralelo com:** `S02-T03`, `S02-T04`

  **Prioridade:** Crítica  
  **Estimativa:** 2–4 h  
  **Responsável:** owner do hero  
  **Status:** Pendente

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

- [ ] Todas as tarefas críticas concluídas
- [ ] Tasks pendentes replanejadas ou formalmente adiadas
- [ ] Migrations aplicadas e versionadas, se houver
- [ ] Testes backend/frontend executados e passando
- [ ] Fluxos críticos validados manualmente
- [ ] Documentação atualizada
- [ ] Revisão de segurança/arquitetura realizada
- [ ] Aprovação final registrada
- [ ] Fechamento da fase registrado
- [ ] Changelog atualizado
