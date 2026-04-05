---
title: Tasks - Phase 03 - Beta Funnel Foundation
type: phase-task-board
mode: execution-tracking
status: planned
---

# Tasks — Fase 03: Beta Funnel Foundation

> Este board é a fonte oficial de acompanhamento operacional da Fase 03 no PenFlow77.
> Ele trata `/auth`, `/beta` e `/dashboard` como superfícies hoje placeholder que devem evoluir para um fluxo simulado honesto, sem fingir backend real.

**Status:** Em execução
**Última atualização:** 2026-04-05
**Sprint Atual:** SPRINT-03
**Modo principal:** frontend
**Status Geral:** 71% (5/7 tarefas completas) – Batch 3 completo, iniciando Batch 4 (QA)
**ETA:** 2–4 dias
**Pré-requisito:** PHASE-01 concluída; PHASE-02 ajuda no alinhamento de CTA/copy mas não bloqueia o início  
**Owner:** agent / owner do funnel  
**Docs relacionadas:** `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `docs/development/CURRENT-STATE.md`, `docs/development/sprints/SPRINT-03-beta-funnel-foundation.md`, `PRD_production.md`, `TECH_SPEC_production.md`

---

## Resumo de Progresso

| Categoria | Total | Concluído | Em Andamento | Pendente | Bloqueado |
| --------- | ----- | --------- | ------------ | -------- | --------- |
| Discovery e desenho do fluxo | 2 | 2 | 0 | 0 | 0 |
| Implementação do estado simulado | 3 | 3 | 0 | 0 | 0 |
| QA, guardrails e fechamento | 2 | 0 | 0 | 2 | 0 |
| **TOTAL** | **7** | **5** | **0** | **2** | **0** |

### Principais Indicadores
- `/auth`, `/beta` e `/dashboard` existem, mas ainda operam como páginas visuais soltas.
- A fase precisa evoluir o funil sem prometer auth, API, persistência ou proteção real de rota.
- O estado compartilhado desta fase deve ser mínimo, reutilizável e claramente simulado.
- A qualidade visual do fluxo não pode cair em relação ao restante da experiência de marca.
- Qualquer comportamento crítico aqui deve virar smoke/regressão candidata para PHASE-04.

---

## Objetivos da Fase

- Transformar as três rotas em uma jornada coerente e navegável.
- Criar uma camada mínima de estado simulado reutilizável e verificável.
- Tornar `/beta` um estado do fluxo, e não apenas uma página isolada.
- Tornar `/dashboard` dependente de contexto simulado mínimo, com comportamento honesto em acessos diretos.
- Preservar visual premium e consistência de copy entre landing e funil.
- Preparar a futura substituição do estado simulado por backend real sem refactor caótico.

---

## Dependências, Batches e Caminho Crítico

### Dependências macro
- Auditoria de PHASE-01 confirmando o status placeholder das três rotas.
- Estrutura atual em `src/app/auth/page.tsx`, `src/app/beta/page.tsx` e `src/app/dashboard/page.tsx`.
- Critérios mínimos de qualidade visual alinhados com a landing.

### Caminho crítico
1. Definir o comportamento alvo do fluxo simulado e seus estados mínimos.
2. Implementar a camada de estado compartilhado e integrar as três páginas.
3. Validar jornada ponta a ponta e acessos diretos sem parecer backend real escondido.

### Paralelização possível
- Modelagem do estado simulado.
- Refino visual/copy das páginas do funil.
- Preparação dos smoke/manual checks do fluxo.

### Checkpoints
- [ ] Discovery concluído
- [ ] Estratégia técnica validada
- [ ] Primeira batch implementada
- [ ] Integração validada
- [ ] Encerramento pronto

---

## Estrutura de Categorias

### Discovery e desenho do fluxo — O mínimo honesto que o funil precisa fazer

#### Objetivo
Definir a menor jornada coerente possível para além da landing, distinguindo claramente o que será funcionalmente simulado e o que continua fora de escopo. Esta categoria garante que a implementação nasça com limite claro de complexidade.

#### Escopo da categoria
- Jornada `/auth` -> `/beta` -> `/dashboard`
- Modelo mínimo de estado simulado
- Comportamento para acessos diretos e retorno entre páginas

#### Riscos da categoria
- Tentar construir metade de um backend no frontend
- Deixar o usuário sem contexto ao entrar por deep link

#### S03.1 — Desenho do funnel simulado

- [x] **S03-T01** — Definir os estados simulados mínimos do funil e a jornada principal

  **Modo recomendado:** architecture
  **Tipo:** feature

  **Descrição curta:**
  - Definir quais dados o funil precisa simular para parecer coerente.
  - Determinar quais transições existem entre entrada, fila beta e dashboard demonstrativo.
  - Eliminar estados desnecessários que só aumentariam complexidade.

  **Contexto mínimo:**
  - Hoje os dados são essencialmente hardcoded e desconectados
  - O objetivo é demonstrar fluxo, não autenticação completa
  - O estado precisa ser pequeno o suficiente para futura substituição por backend

  **Implementação sugerida:**
  - Mapear a jornada principal e seus estados visíveis.
  - Escolher dados mínimos como identidade simulada, status da fila e contexto do dashboard.
  - Registrar estados inválidos e acessos diretos aceitáveis.

  **Arquivos/áreas afetadas:** `src/app/auth/page.tsx`, `src/app/beta/page.tsx`, `src/app/dashboard/page.tsx`, possíveis componentes ou store/client state compartilhado

  **Critérios de aceitação:**
  - [x] Existe uma jornada principal definida ponta a ponta
  - [x] O conjunto de estados simulados mínimos está definido
  - [x] O comportamento de acessos diretos está definido
  - [x] O escopo continua explicitamente sem backend real

  **Evidência de Validação:**
  - Modelo de estado definido: `FunnelState` com `isSignedIn`, `userEmail`, `displayName`, `betaJoined`, `betaPosition`, `betaWave`, `joinedAt`, `enteredAt`, `funnelStatus`.
  - Tipos exportados em `src/lib/funnelStore.ts`.
  - Jornada: `/auth` (entrada) → `/beta` (fila) → `/dashboard` (controle).
  - Comandos: `npx tsc --noEmit` passou (0 errors).

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** PHASE-01
  **Bloqueia:** `S03-T02`, `S03-T03`, `S03-T04`
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica
  **Estimativa:** 30–45 min
  **Responsável:** owner do funnel / agent
  **Status:** ✅ Concluída

- [x] **S03-T02** — Definir guardrails de honestidade do fluxo simulado e da UX de acesso direto

  **Modo recomendado:** architecture
  **Tipo:** docs

  **Descrição curta:**
  - Determinar como a UI comunica que o fluxo é foundation simulada, não auth real.
  - Definir o que acontece quando o usuário abre `/beta` ou `/dashboard` sem contexto mínimo.
  - Evitar comportamento enganoso ou quebrado.

  **Contexto mínimo:**
  - Não existe sessão, JWT, API nem persistência real
  - O fluxo precisa ser convincente sem mentir
  - O dashboard não pode parecer protegido se não estiver protegido

  **Implementação sugerida:**
  - Definir mensagens, redirecionamentos ou estados vazios honestos.
  - Garantir consistência entre as três rotas.
  - Preparar critérios de aceite específicos para deep links e retorno no fluxo.

  **Arquivos/áreas afetadas:** `src/app/auth/page.tsx`, `src/app/beta/page.tsx`, `src/app/dashboard/page.tsx`, docs de fase e futura baseline de qualidade

  **Critérios de aceitação:**
  - [x] O fluxo deixa explícito quando está simulando comportamento
  - [x] Acesso direto a `/beta` recebe tratamento coerente
  - [x] Acesso direto a `/dashboard` recebe tratamento coerente
  - [x] O guardrail pode ser transformado em smoke/regressão futura

  **Evidência de Validação:**
  - `FunnelStatusBadge` criado em `src/components/funnel/FunnelStatusBadge.tsx` — badge "Demo simulation" com dot amber em cada página.
  - Copy honesta: "This is a simulated experience", "This is a simulated queue", "Demo simulation" badge.
  - Acesso direto a `/dashboard` sem contexto: mostra preview + CTA "Start the journey".
  - Acesso direto a `/beta` sem contexto: mostra explicação + CTA "Sign in to join".

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S03-T01`
  **Bloqueia:** `S03-T04`, `S03-T05`, `S03-T06`
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta
  **Estimativa:** 20–30 min
  **Responsável:** owner do funnel / agent
  **Status:** ✅ Concluída

---

### Implementação do estado simulado — Coerência funcional sem backend real

#### Objetivo
Construir a menor infraestrutura client-side capaz de conectar as três páginas e fazer o funil parecer um produto em foundation, e não três telas soltas. Esta categoria cobre estado, transições e refinamento das páginas do funil.

#### Escopo da categoria
- Store ou camada de estado simulada
- Integração das três rotas
- Ajustes visuais e de copy coerentes com a marca

#### Riscos da categoria
- Espalhar lógica de fluxo em três páginas sem contrato claro
- Introduzir copy ou affordances que insinuem capabilities inexistentes

#### S03.2 — Conectar as páginas do funnel

- [x] **S03-T03** — Implementar a camada mínima de estado simulado reutilizável

  **Modo recomendado:** frontend
  **Tipo:** feature

  **Descrição curta:**
  - Criar a menor camada reutilizável para guardar contexto do usuário simulado.
  - Permitir que `/auth`, `/beta` e `/dashboard` compartilhem contexto sem depender de backend.
  - Manter a estrutura preparada para futura substituição por integração real.

  **Contexto mínimo:**
  - O repositório ainda não tem auth ou store real comprovados para esse fluxo
  - A camada não pode crescer demais para a fase
  - O objetivo é coerência funcional mínima e verificável

  **Implementação sugerida:**
  - Escolher um mecanismo simples de estado local/client-side.
  - Isolar tipos e dados simulados onde fizer sentido.
  - Evitar acoplamento invisível difícil de testar ou substituir depois.

  **Arquivos/áreas afetadas:** possíveis arquivos em `src/lib/`, `src/components/` ou `src/app/` relacionados ao funnel; `src/app/auth/page.tsx`; `src/app/beta/page.tsx`; `src/app/dashboard/page.tsx`

  **Critérios de aceitação:**
  - [x] Existe uma camada mínima compartilhada entre as três páginas
  - [x] O contexto simulado é verificável durante a jornada
  - [x] A solução não depende de API real
  - [x] O contrato de substituição futura fica possível sem refactor amplo

  **Evidência de Validação:**
  - `src/lib/funnelStore.ts` — types, `getFunnelState`, `setFunnelState`, `resetFunnelState`, `simulateSignIn`, `simulateJoinBeta`.
  - `src/components/funnel/FunnelProvider.tsx` — React context com `useFunnel`, `useFunnelSafe`, `FunnelProvider`.
  - localStorage persistence via key `penflow77:funnel-state`.
  - Cada página é client component que wrapp seu conteúdo em `FunnelProvider`.

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S03-T01`
  **Bloqueia:** `S03-T04`, `S03-T05`, `S03-T06`
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica
  **Estimativa:** 2–4 h
  **Responsável:** owner do funnel
  **Status:** ✅ Concluída

- [x] **S03-T04** — Conectar `/auth` e `/beta` em uma entrada verificável para a private beta simulada

  **Modo recomendado:** frontend
  **Tipo:** feature

  **Descrição curta:**
  - Fazer `/auth` deixar de ser apenas uma tela estática e alimentar o próximo passo do funil.
  - Tornar `/beta` uma página de status da jornada, não um cartão isolado hardcoded.
  - Garantir continuidade visual e semântica entre entrada e fila beta.

  **Contexto mínimo:**
  - Hoje `/auth` oferece apenas UI estática
  - Hoje `/beta` exibe posição fixa e estado fixo
  - O fluxo deve continuar honesto sobre ausência de fila real persistida

  **Implementação sugerida:**
  - Fazer a ação principal em `/auth` produzir contexto simulado.
  - Consumir esse contexto em `/beta` para montar estado coerente.
  - Ajustar copy e affordances para mostrar que ainda se trata de foundation simulada.

  **Arquivos/áreas afetadas:** `src/app/auth/page.tsx`, `src/app/beta/page.tsx`, camada de estado do funnel, possíveis componentes compartilhados

  **Critérios de aceitação:**
  - [x] A ação principal em `/auth` leva a um próximo passo verificável
  - [x] `/beta` usa contexto simulado em vez de permanecer puramente fixo
  - [x] O fluxo não promete fila real persistida
  - [x] A UI continua consistente com a marca

  **Evidência de Validação:**
  - `/auth` page: form com input de email, validação básica, simula signIn → salva localStorage → navega para `/beta`.
  - `/beta` page: lê contexto, mostra posição dinâmica (gerada 180-250), botão "Join private beta" chama `joinBeta()`.
  - Usuário já logado vê "Welcome back, {displayName}" com link para beta.

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S03-T02`, `S03-T03`
  **Bloqueia:** `S03-T05`, `S03-T06`
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica
  **Estimativa:** 2–4 h
  **Responsável:** owner do funnel
  **Status:** ✅ Concluída

- [x] **S03-T05** — Tornar `/dashboard` um destino coerente da jornada simulada

  **Modo recomendado:** frontend
  **Tipo:** feature

  **Descrição curta:**
  - Fazer `/dashboard` depender do contexto mínimo adequado da jornada.
  - Ajustar o comportamento de acesso direto para evitar aparência de rota protegida inexistente ou tela quebrada.
  - Preservar o caráter demonstrativo do dashboard sem deixá-lo desconectado.

  **Contexto mínimo:**
  - Hoje o dashboard é um mock visual com array local
  - Não existe autenticação real protegendo a rota
  - O fluxo precisa ser honesto e útil ao mesmo tempo

  **Implementação sugerida:**
  - Consumir o estado simulado vindo do funnel.
  - Definir e implementar o comportamento para quem entra direto sem contexto.
  - Refinar os dados demonstrativos para parecerem parte da mesma jornada.

  **Arquivos/áreas afetadas:** `src/app/dashboard/page.tsx`, camada de estado do funnel, possíveis componentes compartilhados

  **Critérios de aceitação:**
  - [x] `/dashboard` usa contexto simulado da jornada
  - [x] Acesso direto sem contexto recebe tratamento honesto e compreensível
  - [x] O dashboard continua visualmente premium e demonstrativo
  - [x] Não há falsa promessa de auth real

  **Evidência de Validação:**
  - `/dashboard` com contexto: mostra "Welcome back, {displayName}", cards de status, queue status inline se betaJoined.
  - `/dashboard` sem contexto (acesso direto): mostra "Dashboard Preview" com cards estáticos + CTA "Start the journey" → `/auth`.
  - Badge "Beta member" quando betaJoined = true.

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S03-T02`, `S03-T03`, `S03-T04`
  **Bloqueia:** `S03-T06`, `S03-T07`
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica
  **Estimativa:** 2–4 h
  **Responsável:** owner do funnel
  **Status:** ✅ Concluída

---

### QA, guardrails e fechamento — Garantir honestidade e navegabilidade

#### Objetivo
Validar a jornada ponta a ponta, registrar como o fluxo deve ser usado e preparar a camada de regressão futura. Esta categoria fecha a fase garantindo que a foundation do funnel seja funcional, honesta e sustentável.

#### Escopo da categoria
- Smoke/manual QA da jornada
- Deep links e retorno entre páginas
- Registro de regressões e handoff para qualidade

#### Riscos da categoria
- Deixar a jornada parecer convincente só no caminho feliz
- Ignorar deep links e estados sem contexto, gerando sensação de produto quebrado

#### S03.3 — QA e fechamento do funnel

- [ ] **S03-T06** — Validar manualmente a jornada `/auth` -> `/beta` -> `/dashboard` e os acessos diretos críticos

  **Modo recomendado:** frontend  
  **Tipo:** test  

  **Descrição curta:**
  - Executar smoke/manual QA da jornada principal e dos principais desvios.
  - Validar persistência mínima do contexto dentro da sessão esperada.
  - Confirmar qualidade visual e honestidade do fluxo em todos os pontos críticos.

  **Contexto mínimo:**
  - A baseline de testes ampla ainda não existe
  - Deep links para `/beta` e `/dashboard` são edge cases de alto valor
  - A jornada precisa ser convincente sem enganar

  **Implementação sugerida:**
  - Validar caminho feliz completo.
  - Validar acesso direto a `/beta` e `/dashboard`.
  - Validar retorno, reentrada e clareza das mensagens de estado simulado.

  **Arquivos/áreas afetadas:** páginas do funnel, board da fase, futura baseline de qualidade

  **Critérios de aceitação:**
  - [ ] A jornada principal foi percorrida ponta a ponta
  - [ ] `/beta` e `/dashboard` foram validados em acesso direto
  - [ ] O fluxo deixa claro o que é simulado
  - [ ] Não há dead end gritante entre as três rotas

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S03-T04`, `S03-T05`  
  **Bloqueia:** `S03-T07`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica  
  **Estimativa:** 45–60 min  
  **Responsável:** agent / QA manual  
  **Status:** Pendente

- [ ] **S03-T07** — Registrar os guardrails do funnel para PHASE-04 e fechar o handoff da fase

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Consolidar os checks de regressão e limitações conscientes do funil.
  - Deixar claro o que ainda depende de backend real futuro.
  - Preparar a camada de qualidade para proteger a jornada sem inflar escopo.

  **Contexto mínimo:**
  - PHASE-04 precisa herdar checks concretos, não genéricos
  - Nem tudo precisa ser automatizado nesta fase
  - O handoff precisa preservar a honestidade sobre o fluxo simulado

  **Implementação sugerida:**
  - Registrar casos críticos de regressão do funnel.
  - Atualizar docs operacionais mínimas conforme necessário.
  - Revisar status do board e dependências para PHASE-04.

  **Arquivos/áreas afetadas:** `docs/development/tasks/PHASE-03-beta-funnel-foundation.md`, `docs/development/TASKS.md`, documentação de qualidade futura

  **Critérios de aceitação:**
  - [ ] Os casos de regressão mais importantes do funnel foram registrados
  - [ ] O que segue dependendo de backend real ficou explícito
  - [ ] O handoff para PHASE-04 está claro
  - [ ] O status do board pode refletir o estado real da fase

  **Estratégia de teste:**
  - [ ] Unitário
  - [x] Integração
  - [x] Regressão
  - [ ] E2E

  **Dependências:** `S03-T06`  
  **Bloqueia:** Nenhuma formalmente; gera insumos para PHASE-04 quando impactar critérios de validação do funil  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta  
  **Estimativa:** 20–30 min  
  **Responsável:** agent / owner documental  
  **Status:** Pendente

---

## Testes e Validações

- **Suites necessárias:** lint, build, smoke/manual QA do funnel, eventual teste de integração da camada de estado simulada se houver ROI
- **Cobertura alvo:** 100% da jornada principal e dos acessos diretos críticos às rotas do funil
- **Comandos de verificação:**
  - `bun run lint`
  - `bun run build`
- **Estado atual:** Parcial
- **Fluxos críticos a validar manualmente:**
  - `/auth` -> `/beta` -> `/dashboard`
  - acesso direto a `/beta`
  - acesso direto a `/dashboard`
  - retorno entre páginas mantendo coerência mínima de contexto

---

## Riscos, Bloqueios e Decisões

### Bloqueios atuais
- A fase depende da disciplina de não fingir backend, auth ou persistência reais.
- Sem baseline de testes ampla, o QA manual precisa ser explícito e reproduzível.

### Riscos em aberto
- Tornar o fluxo complexo demais para o estágio atual do projeto.
- Produzir UI bonita, mas ainda incoerente em navegação e estado.

### Decisões importantes
- A fase entrega fluxo simulado honesto, não autenticação real.
- O dashboard continua demonstrativo, porém conectado ao contexto mínimo do funnel.

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
