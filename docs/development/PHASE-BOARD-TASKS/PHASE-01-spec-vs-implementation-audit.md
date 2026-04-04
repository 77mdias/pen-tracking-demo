---
title: Tasks - Phase 01 - Spec vs Implementation Audit
type: phase-task-board
mode: execution-tracking
status: completed
---

# Tasks — Fase 01: Spec vs Implementation Audit

> Este board é a fonte oficial de acompanhamento operacional da Fase 01 no PenFlow77.
> A entrega canônica desta fase é `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`.

**Status:** Concluída  
**Última atualização:** 2026-04-04  
**Sprint Atual:** SPRINT-01  
**Modo principal:** mixed  
**Status Geral:** 100% (6/6 tarefas completas) – Fase concluída  
**ETA:** Concluída em 1 dia  
**Pré-requisito:** PHASE-00 concluída ou suficientemente estável  
**Owner:** agent  
**Docs relacionadas:** `docs/development/CURRENT-STATE.md`, `docs/development/ROADMAP.md`, `docs/development/SPRINTS.md`, `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `AGENTS.md`, `HERO_SPEC_smart_pen.md`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`, `PRD_production.md`, `TECH_SPEC_production.md`

---

## Resumo de Progresso

| Categoria | Total | Concluído | Em Andamento | Pendente | Bloqueado |
| --------- | ----- | --------- | ------------ | -------- | --------- |
| Discovery e levantamento factual | 3 | 3 | 0 | 0 | 0 |
| Consolidação da auditoria | 2 | 2 | 0 | 0 | 0 |
| Decisões e handoff | 1 | 1 | 0 | 0 | 0 |
| **TOTAL** | **6** | **6** | **0** | **0** | **0** |

### Principais Indicadores
- O board parte do princípio já documentado de que landing e hero estão implementados com ressalvas.
- `/auth`, `/beta` e `/dashboard` devem permanecer classificados como placeholders até prova contrária.
- O artefato final precisa separar claramente “corrigir código”, “corrigir spec” e “adiar conscientemente”.
- O naming `penflow77` vs `pen-tracking-demo` é risco operacional e de coerência de marca a avaliar.
- A validação desta fase é majoritariamente documental, com evidência cruzada entre specs e código vivo.

---

## Objetivos da Fase

- Produzir a auditoria canônica de divergências reais entre specs e implementação.
- Confirmar quais gaps são de design system, quais são de comportamento do hero e quais são de escopo funcional.
- Documentar honestamente o status placeholder de `/auth`, `/beta` e `/dashboard`.
- Registrar que parte da documentação envelheceu em relação à stack já instalada do hero.
- Priorizar os gaps que bloqueiam as fases 02, 03 e 04.
- Evitar transformar a auditoria em backlog genérico sem classificação de ação.

---

## Dependências, Batches e Caminho Crítico

### Dependências macro
- Baseline factual de `CURRENT-STATE.md`.
- SPRINT-01 detalhada em `docs/development/sprints/SPRINT-01-spec-vs-implementation-audit.md`.
- Acesso aos arquivos reais de hero, globals, rotas placeholder e config de deploy.

### Caminho crítico
1. Reconfirmar evidências factuais dos gaps já apontados em `CURRENT-STATE.md`.
2. Consolidar a auditoria em `AUDIT-SPEC-VS-IMPLEMENTATION.md` com classificação por ação.
3. Traduzir as conclusões em handoff objetivo para PHASE-02, PHASE-03 e PHASE-04.

### Paralelização possível
- Auditoria de design system e tipografia.
- Auditoria de hero scroll/motion/fallback/mobile.
- Auditoria de rotas placeholder, stack e naming de deploy.

### Checkpoints
- [ ] Discovery concluído
- [ ] Estratégia técnica validada
- [ ] Primeira batch implementada
- [ ] Integração validada
- [ ] Encerramento pronto

---

## Estrutura de Categorias

### Discovery e levantamento factual — Evidência antes de decisão

#### Objetivo
Levantar novamente, de forma organizada, as divergências reais entre documentação e implementação. Esta categoria concentra a revisão das fontes primárias e a coleta de evidências `path:line` suficientes para sustentar a auditoria final.

#### Escopo da categoria
- Specs de produto, hero e stack
- Implementação real do frontend
- Configuração de build/deploy e rotas placeholder

#### Riscos da categoria
- Repetir conclusões do `CURRENT-STATE.md` sem nova organização operacional
- Confundir divergência documental com bug de produto sem critério

#### S01.1 — Revisão das fontes primárias

- [x] **S01-T01** — Revalidar divergências de design system e tipografia entre `AGENTS.md` e `src/app/globals.css`

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Confirmar o estado real de cor base, tipografia e tokens acima da dobra.
  - Registrar evidências de onde o spec fala em Montserrat/Open Sans e `#050a14`.
  - Registrar evidências de onde o CSS real fala em `#000000`, Inter, Manrope e tokens atuais.

  **Contexto mínimo:**
  - O background base e a tipografia são divergências relevantes já apontadas na baseline
  - O objetivo é classificar, não corrigir ainda
  - A decisão final alimenta PHASE-02

  **Implementação sugerida:**
  - Revisar `AGENTS.md` e `src/app/globals.css` lado a lado.
  - Separar divergências de tokens globais de divergências localizadas do hero.
  - Classificar cada uma como “corrigir código”, “corrigir spec” ou “pendente”.

  **Arquivos/áreas afetadas:** `AGENTS.md`, `src/app/globals.css`, `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`

  **Critérios de aceitação:**
  - [ ] A divergência de background base está documentada com evidência
  - [ ] A divergência de tipografia está documentada com evidência
  - [ ] Existe classificação por ação para cada gap principal
  - [ ] O resultado é utilizável por PHASE-02

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `CURRENT-STATE.md`  
  **Bloqueia:** `S01-T04`, `S01-T05`  
  **Pode rodar em paralelo com:** `S01-T02`, `S01-T03`

  **Prioridade:** Crítica  
  **Estimativa:** 30–45 min  
  **Responsável:** agent  
  **Status:** Concluído

  **Definição de pronto:**
  - [ ] Implementação concluída
  - [ ] Testes adicionados/atualizados
  - [ ] Critérios de aceitação atendidos
  - [ ] Sem violação arquitetural evidente

- [x] **S01-T02** — Revalidar gaps do hero em scroll, reduced motion, fallback e mobile

  **Modo recomendado:** frontend  
  **Tipo:** docs  

  **Descrição curta:**
  - Confirmar, no código e no spec, onde o hero diverge em política de motion e comportamento.
  - Tratar `useScrollHijack` e `useSnapScroll` como hipótese de verificação, não conclusão automática.
  - Produzir um diagnóstico que vire backlog objetivo para PHASE-02.

  **Contexto mínimo:**
  - O hero já é a parte mais madura do projeto
  - O spec pede evitar hijacking pesado
  - Reduced motion, fallback e mobile precisam ser tratados como primeira classe

  **Implementação sugerida:**
  - Revisar `HeroSection`, `HeroFallback`, `HeroMobile`, hooks de scroll e specs do hero.
  - Separar problemas de comportamento, problemas de naming e pontos ainda indeterminados.
  - Registrar evidências e impacto esperado na experiência premium.

  **Arquivos/áreas afetadas:** `src/components/hero/*`, `src/hooks/useScrollHijack.ts`, `src/hooks/useSnapScroll.ts`, `HERO_SPEC_smart_pen.md`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`, `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`

  **Critérios de aceitação:**
  - [ ] Existe diagnóstico específico para scroll do hero
  - [ ] Existe diagnóstico específico para reduced motion
  - [ ] Existe diagnóstico específico para fallback e mobile
  - [ ] O resultado alimenta diretamente PHASE-02

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `CURRENT-STATE.md`  
  **Bloqueia:** `S01-T04`, `S01-T05`  
  **Pode rodar em paralelo com:** `S01-T01`, `S01-T03`

  **Prioridade:** Crítica  
  **Estimativa:** 45–60 min  
  **Responsável:** agent  
  **Status:** Concluído

  **Definição de pronto:**
  - [ ] Implementação concluída
  - [ ] Testes adicionados/atualizados
  - [ ] Critérios de aceitação atendidos
  - [ ] Sem violação arquitetural evidente

- [x] **S01-T03** — Revalidar placeholders, stack real e naming operacional de deploy

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Confirmar o status placeholder de `/auth`, `/beta` e `/dashboard`.
  - Confirmar que GSAP/R3F/drei já estão instalados, apesar de trechos desatualizados do spec.
  - Explicitar a divergência entre `penflow77` e `pen-tracking-demo` como decisão operacional.

  **Contexto mínimo:**
  - O produto real ainda é majoritariamente landing + hero
  - Backend/API/DB/email não estão evidenciados neste snapshot
  - O resultado alimenta PHASE-03 e PHASE-04

  **Implementação sugerida:**
  - Revisar `src/app/auth/page.tsx`, `src/app/beta/page.tsx`, `src/app/dashboard/page.tsx`, `package.json`, `wrangler.jsonc` e configs OpenNext.
  - Separar ausência de funcionalidade real de naming/config desatualizados.
  - Classificar o que é roadmap, o que é placeholder e o que é inconsistência operacional.

  **Arquivos/áreas afetadas:** `src/app/auth/page.tsx`, `src/app/beta/page.tsx`, `src/app/dashboard/page.tsx`, `package.json`, `open-next.config.ts`, `wrangler.jsonc`, `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`

  **Critérios de aceitação:**
  - [ ] As três rotas permanecem classificadas como placeholders com evidência
  - [ ] A divergência da stack instalada versus spec está documentada
  - [ ] A divergência de naming de deploy está documentada
  - [ ] O resultado alimenta PHASE-03 e PHASE-04

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `CURRENT-STATE.md`  
  **Bloqueia:** `S01-T04`, `S01-T06`  
  **Pode rodar em paralelo com:** `S01-T01`, `S01-T02`

  **Prioridade:** Alta  
  **Estimativa:** 30–45 min  
  **Responsável:** agent  
  **Status:** Concluído

---

### Consolidação da auditoria — Artefato canônico e priorização

#### Objetivo
Transformar o material levantado em um documento canônico curto, acionável e priorizado, que guie as próximas sprints sem virar backlog descontrolado. Esta categoria cobre a produção da auditoria e sua revisão editorial.

#### Escopo da categoria
- Estrutura do artefato `AUDIT-SPEC-VS-IMPLEMENTATION.md`
- Classificação por ação
- Priorização de gaps

#### Riscos da categoria
- Produzir um documento longo demais para uso operacional
- Misturar achados confirmados com opiniões estéticas não fundamentadas

#### S01.2 — Documento canônico

- [x] **S01-T04** — Criar `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Consolidar todos os gaps confirmados em um artefato canônico.
  - Organizar por categoria: design system, hero, placeholders/escopo funcional, stack/spec e deploy naming.
  - Encerrar cada item com classificação de ação e impacto.

  **Contexto mínimo:**
  - O arquivo ainda não existe
  - Ele é a principal entrega verificável da sprint
  - Deve servir de ponte entre baseline factual e execução das próximas fases

  **Implementação sugerida:**
  - Estruturar o documento por temas e severidade.
  - Incluir evidências doc/código em `path:line` nos gaps críticos.
  - Encerrar com prioridades imediatas e dependências por fase.

  **Arquivos/áreas afetadas:** `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`

  **Critérios de aceitação:**
  - [ ] O artefato existe no caminho canônico aprovado
  - [ ] Há classificação “corrigir código”, “corrigir spec” ou “adiar conscientemente” em todos os gaps críticos
  - [ ] Hero, tokens/tipografia, placeholders, stack e deploy naming aparecem no documento
  - [ ] O artefato é objetivo o bastante para uso contínuo

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S01-T01`, `S01-T02`, `S01-T03`  
  **Bloqueia:** `S01-T05`, `S01-T06`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica  
  **Estimativa:** 60–90 min  
  **Responsável:** agent  
  **Status:** Concluído

  **Definição de pronto:**
  - [ ] Implementação concluída
  - [ ] Testes adicionados/atualizados
  - [ ] Critérios de aceitação atendidos
  - [ ] Sem violação arquitetural evidente

- [x] **S01-T05** — Revisar a auditoria para priorização, clareza e alinhamento com as próximas fases

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Revisar se a auditoria separa causas e sintomas, urgência e impacto.
  - Garantir que PHASE-02, PHASE-03 e PHASE-04 consigam consumir o material sem reabrir toda a descoberta.
  - Remover duplicações e ambiguidades.

  **Contexto mínimo:**
  - A auditoria precisa ser acionável, não apenas informativa
  - O hero é o eixo prioritário mais sensível
  - Placeholders não podem ser reinterpretados como flows prontos

  **Implementação sugerida:**
  - Revisar severidade e próxima ação de cada gap.
  - Consolidar termos repetidos e decisões pendentes.
  - Amarrar cada gap principal à fase que o absorve.

  **Arquivos/áreas afetadas:** `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `docs/development/ROADMAP.md`, `docs/development/SPRINTS.md`

  **Critérios de aceitação:**
  - [ ] Cada gap principal aponta para próxima ação ou decisão
  - [ ] Não há confusão entre código, spec e roadmap
  - [ ] PHASE-02, PHASE-03 e PHASE-04 ficam explicitamente alimentadas
  - [ ] O documento fica enxuto o bastante para consulta recorrente

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S01-T04`  
  **Bloqueia:** `S01-T06`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta  
  **Estimativa:** 20–30 min  
  **Responsável:** agent / owner documental  
  **Status:** Concluído

---

### Decisões e handoff — Transformar achados em execução futura

#### Objetivo
Amarrar a auditoria ao restante da camada operacional, registrando decisões abertas, consequências e handoff para as fases de implementação. Esta categoria evita que a auditoria vire um fim em si mesma.

#### Escopo da categoria
- Registro de decisões abertas
- Atualizações mínimas em roadmap/sprints, se necessário
- Fechamento operacional da fase

#### Riscos da categoria
- Encerrar a fase sem deixar claro o que bloqueia o quê
- Espalhar as decisões da auditoria em múltiplos documentos sem centralização

#### S01.3 — Handoff para execução

- [x] **S01-T06** — Registrar decisões pendentes e alimentar explicitamente PHASE-02, PHASE-03 e PHASE-04

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Fechar a sprint com decisões claras ou pendências explícitas.
  - Atualizar os documentos mínimos de planejamento caso a auditoria mude prioridade ou dependência.
  - Preparar a execução das fases seguintes com menos ambiguidade.

  **Contexto mínimo:**
  - A auditoria é ponte, não ponto final
  - PHASE-02 depende principalmente do diagnóstico do hero e de design system
  - PHASE-03 e PHASE-04 dependem da honestidade sobre placeholders e baseline de qualidade

  **Implementação sugerida:**
  - Registrar decisões pendentes de design system e deploy naming.
  - Rever `ROADMAP.md` e `SPRINTS.md` apenas se a auditoria alterar ordem ou prioridade.
  - Atualizar `TASKS.md`/board status quando a fase avançar.

  **Arquivos/áreas afetadas:** `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `docs/development/ROADMAP.md`, `docs/development/SPRINTS.md`, `docs/development/TASKS.md`

  **Critérios de aceitação:**
  - [ ] As decisões pendentes estão explícitas
  - [ ] Há handoff claro para PHASE-02, PHASE-03 e PHASE-04
  - [ ] O índice de tasks pode refletir o status real da fase
  - [ ] Não houve reescrita desnecessária do roadmap

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S01-T03`, `S01-T05`  
  **Bloqueia:** PHASE-02, PHASE-03, PHASE-04  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta  
  **Estimativa:** 20–30 min  
  **Responsável:** agent / owner do roadmap  
  **Status:** Concluído

---

## Testes e Validações

- **Suites necessárias:** revisão manual baseada em evidência doc-código, checklists editoriais, verificação de caminhos e referências `path:line`
- **Cobertura alvo:** 100% dos gaps críticos com pelo menos uma evidência documental e uma evidência de implementação
- **Comandos de verificação:**
  - `bun run lint`
  - `ls docs/development`
- **Estado atual:** Parcial
- **Fluxos críticos a validar manualmente:**
  - coerência entre `CURRENT-STATE.md` e a auditoria final
  - classificação correta de `/auth`, `/beta` e `/dashboard` como placeholders
  - separação entre scroll problemático confirmado e hipótese a validar no hero

---

## Riscos, Bloqueios e Decisões

### Bloqueios atuais
- Nenhum bloqueio técnico evidente; o principal desafio é disciplinar a classificação dos gaps.
- A fase depende de não inflar os specs aspiracionais acima do código real.

### Riscos em aberto
- Classificar opinião visual como bug sem âncora documental.
- Produzir uma auditoria tão extensa que ela fique inútil operacionalmente.

### Decisões importantes
- `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md` é o artefato canônico da fase.
- O board deve distinguir claramente onde o código está atrás do spec e onde o spec está atrás do código.

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
