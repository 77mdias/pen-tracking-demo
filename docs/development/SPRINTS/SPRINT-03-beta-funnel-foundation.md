---
title: Sprint 03 - Beta Funnel Foundation
type: sprint
mode: sprint
approach: tdd-first
status: completed
---

# Sprint SPRINT-03 — Beta Funnel Foundation

## 1. Objetivo

Transformar `/auth`, `/beta` e `/dashboard` de placeholders independentes em um funil navegável, coerente e verificável, com estado simulado explícito e critérios claros para futura evolução para autenticação e backend reais.

> Entrega verificável: o usuário consegue percorrer um fluxo consistente entre entrada, fila beta e dashboard demonstrativo; o estado apresentado deixa de ser puramente estático/desconectado; e a documentação deixa claro que a experiência ainda é simulada, não backend real.

---

## 2. Resumo Executivo

- **Tipo da sprint:** feature
- **Modo principal do Agent OS:** frontend
- **Fase relacionada:** Fase 03 — Fundar o funil além da landing
- **Status:** ✅ Concluída
- **Prioridade:** Alta
- **Owner principal:** agent
- **Dependências externas:** auditoria da SPRINT-01; baseline de experiência/CTA consolidada; decisões mínimas sobre copy e estado simulado
- **Janela estimada:** 2–4 dias
- **Commit:** `789aee5` — `sprint-03: implement simulated beta funnel foundation`

---

## 3. Contexto

- **Problema atual:** `/auth`, `/beta` e `/dashboard` existem como telas visuais soltas, com textos e links, mas sem comportamento funcional coerente entre si.
- **Impacto no sistema/produto:** após a landing, o usuário não encontra um funil convincente; isso reduz a capacidade do projeto de demonstrar evolução além da camada de marketing.
- **Riscos envolvidos:** fingir backend implementado, criar estados visuais sem consistência, acoplar cedo demais a uma arquitetura ainda inexistente ou deixar o funil com aparência de mock quebrado.
- **Áreas afetadas:** `src/app/auth/page.tsx`, `src/app/beta/page.tsx`, `src/app/dashboard/page.tsx`, possíveis componentes/shared state client-side, docs de estado e validação.
- **Fluxos de usuário impactados:** entrada na private beta, transição entre páginas do funil, leitura do estado de acesso e percepção de continuidade do produto.
- **Premissas importantes:** não há auth real, sessão real, API real nem persistência comprovada; portanto a sprint deve fundar um fluxo simulado honesto e verificável.
- **Fora de escopo nesta sprint:** JWT, banco de dados, fila persistida, proteção real de rota, email transacional e backend NestJS.

---

## 4. Critérios de Sucesso

- [x] `/auth`, `/beta` e `/dashboard` passam a compor um fluxo coerente e navegável.
  - **Evidência:** Cada página é um client component com `FunnelProvider`. Estado compartilhado via `funnelStore.ts` + localStorage.
- [x] O estado exibido no funil deixa de ser totalmente fixo e passa a refletir uma simulação consistente do usuário atual.
  - **Evidência:** `/auth` gera contexto de email. `/beta` mostra posição dinâmica (180-250). `/dashboard` mostra nome e status do usuário.
- [x] A experiência deixa claro quando um comportamento é simulado e quando uma capacidade real ainda não existe.
  - **Evidência:** `FunnelStatusBadge` em todas as páginas. Copy honesta: "simulated experience", "simulated queue", "Demo simulation".
- [x] As páginas mantêm qualidade visual compatível com o restante da marca/landing.
  - **Evidência:** `glass-panel`, tipografia e cores consistentes com a landing.
- [x] O fluxo fica preparado para futura substituição por backend real sem refactor caótico.
  - **Evidência:** `funnelStore.ts` isolado em `src/lib/` — módulo puro substituível por API client.

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [x] Auditoria da SPRINT-01 concluída — `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`
- [x] Classificação oficial das três rotas como placeholders confirmada — Tema C da auditoria
- [x] Decisão mínima sobre os estados simulados do funil — `FunnelState` com 9 campos
- [x] Direção de CTA/copy da landing suficientemente estável — SPRINT-02 concluída

### Ordem macro recomendada
1. Discovery do comportamento atual das três rotas
2. Desenhar o fluxo simulado alvo
3. Escrever testes e smoke checks do funil
4. Implementar estado compartilhado mínimo e transições coerentes
5. Refatorar e preparar pontos de substituição futura
6. Validar manualmente jornada ponta a ponta

### Paralelização possível
- Definição do modelo de estado simulado
- Ajuste visual/UX das três páginas
- Planejamento de smoke tests e critérios de aceitação

### Caminho crítico
- Definir comportamento honesto do fluxo simulado
- Garantir coerência de navegação e estado
- Evitar prometer backend real onde não há backend

---

## 6. Etapa 1 — Discovery Técnico

### Objetivo
Entender as rotas atuais e definir o menor fluxo coerente possível sem backend real.

### Checklist
- [x] Revisar implementações atuais de `/auth`, `/beta` e `/dashboard` — todas eram server components estáticos
- [x] Identificar quais dados hoje são puramente hardcoded — posição #214, cards fixos, botões sem handler
- [x] Identificar que tipo de estado local/simulado faz sentido para o projeto — `FunnelState` com localStorage
- [x] Mapear quais elementos visuais podem ser reaproveitados — `glass-panel`, tipografia, cores
- [x] Definir se haverá transição client-side, query params, local state ou outro mecanismo simples — localStorage + React context
- [x] Identificar pontos futuros de integração com auth/backend real — `funnelStore.ts` isolado em `src/lib/`
- [x] Revisar impacto na copy e CTA da landing, se houver ligação direta com o funil — header tem link "Sign in" → `/auth`

### Saída esperada
- Modelo de fluxo atual versus fluxo desejado
- Lista de arquivos impactados
- Proposta de estado simulado mínimo
- Lista de limitações conscientemente aceitas nesta sprint

---

## 7. Etapa 2 — Design de Comportamento e Estratégia de Testes

### Objetivo
Definir, antes da implementação, como o funil deve se comportar e como provar que ele melhorou.

### Checklist
- [x] Definir jornada mínima: entrar, ver status de beta, chegar ao dashboard demonstrativo — `/auth` → `/beta` → `/dashboard`
- [x] Definir quais dados simulados são necessários e quais são desnecessários — email, nome, posição, wave, timestamp
- [x] Definir como comunicar estado simulado sem matar a percepção premium — `FunnelStatusBadge` + copy honesta
- [x] Definir critérios de aceite por rota e por transição — documentado no phase board
- [x] Definir estratégia de testes manuais e automatizados possíveis — smoke manual + lint/tsc/build
- [x] Definir casos de regressão para links, estado e mensagens — 5 casos registrados para PHASE-04
- [x] Confirmar limites de escopo para não vazar para backend real — sem API calls, sem JWT, sem proteção de rota

### Casos de teste planejados
- [x] Cenário 1: usuário inicia em `/auth`, executa a entrada simulada e chega à fila beta com estado coerente. — form → simulateSignIn → push /beta
- [x] Cenário 2: usuário avança para `/dashboard` e vê informações consistentes com o estado anteriormente escolhido/simulado. — context read → personalized greeting
- [x] Cenário 3: usuário volta entre telas sem perder completamente o contexto da simulação dentro da mesma sessão esperada. — localStorage persiste entre navegações
- [x] Cenário 4: usuário entende que o fluxo é uma foundation funcional/simulada, e não uma autenticação real completa. — badges + copy honesta
- [x] Edge case 1: acesso direto a `/dashboard` sem contexto mínimo recebe comportamento coerente e não enganoso. — preview + CTA para funil
- [x] Regressão 1: links entre as três rotas continuam válidos e a UI não regride em qualidade visual. — `npx next build` + `bun run lint`

### Matriz de testes
| Tipo | Escopo | Obrigatório? | Observações |
|------|--------|--------------|-------------|
| Unitário | store/utilitário de estado simulado | Desejável | Criar se a sprint introduzir camada lógica reaproveitável. |
| Integração | fluxo entre `/auth`, `/beta`, `/dashboard` | Sim | Pode começar com smoke/manual ou harness simples. |
| E2E | jornada do funil | Desejável | Ideal formalizar em SPRINT-04. |
| Regressão | deep links, links de volta, consistência de estado | Sim | Mesmo que inicialmente manual. |
| Auth/AuthZ | comportamento sem auth real | Sim | Validar honestidade e limites do fluxo. |

---

## 8. Etapa 3 — Testes Primeiro (TDD)

### Objetivo
Fixar a jornada esperada do funil antes de alterar as páginas.

### Checklist
- [x] Definir smoke checks para entrada, avanço e retorno no funil — documentado
- [x] Definir comportamento esperado para acesso direto a cada rota — preview/explicação + CTA
- [x] Definir como o estado simulado será inspecionado/validado — `useFunnel()` context + localStorage
- [x] Registrar a ausência atual de coerência funcional como baseline RED — 3 páginas estáticas desconectadas
- [x] Definir regressões críticas que não podem reaparecer — 5 casos para PHASE-04
- [x] Deixar claro o que ainda não será automatizado nesta sprint — E2E automação para PHASE-04

### Testes a implementar primeiro
- [ ] Teste unitário: camada de estado simulado, se existir.
- [ ] Teste de integração: fluxo `/auth` -> `/beta` -> `/dashboard`.
- [ ] Teste de regressão: links e persistência mínima de contexto entre páginas.
- [ ] Teste de autorização/autenticação: comportamento explícito para ausência de auth real.
- [ ] Teste de edge case: entrada direta em `/dashboard` sem contexto válido.
- [ ] Teste de contrato/API: não aplicável nesta sprint, já que backend não existe.

### Evidência RED
- **Comando executado:** inspeção atual das três páginas e, se possível, smoke manual em ambiente local.
- **Falha esperada observada:** as rotas são superfícies estáticas com links, sem estado compartilhado nem jornada funcional consistente.
- **Observações:** esta evidência RED é estrutural e deve ser usada para medir a melhora após a sprint.

---

## 9. Etapa 4 — Implementação

### Objetivo
Construir a foundation do funil com o menor estado e lógica necessários para gerar coerência real.

### Checklist
- [x] Introduzir estado simulado mínimo reutilizável — `funnelStore.ts` + `FunnelProvider.tsx`
- [x] Conectar `/auth` ao próximo passo do funil com comportamento verificável — form → sign-in → `/beta`
- [x] Tornar `/beta` um estado da jornada, não apenas uma página isolada — context-aware position + join
- [x] Tornar `/dashboard` dependente do contexto simulado apropriado — personalized greeting + queue status
- [x] Comunicar limitações do fluxo de forma honesta — badges + copy + footnote
- [x] Preservar consistência visual com a landing e o hero — `glass-panel`, tipografia, cores
- [x] Atualizar documentação mínima impactada — phase board + sprint doc

### Regras obrigatórias
- Não inventar backend real nem chamadas de API fantasmas.
- Não usar linguagem que sugira autenticação completa se o fluxo continuar simulado.
- Não deixar a UI mentir sobre persistência ou proteção de rota.
- Preparar a arquitetura para troca futura do estado simulado por integração real.
- Não piorar a qualidade visual das páginas placeholder ao torná-las funcionais.
- Toda correção relevante de fluxo deve gerar smoke ou caso de regressão documentado.

### Mudanças previstas
- **Backend:** nenhuma
- **API:** nenhuma
- **Frontend:** páginas `/auth`, `/beta`, `/dashboard`, componentes compartilhados e possível camada de estado client-side
- **Banco/Schema:** nenhuma
- **Infra/Config:** nenhuma obrigatória
- **Docs:** atualização do estado atual e de critérios de validação do funil, se necessário

---

## 10. Etapa 5 — Refatoração

### Objetivo
Garantir que a foundation do funil permaneça simples, legível e pronta para evolução futura.

### Checklist
- [x] Extrair duplicações entre páginas — `FunnelStatusBadge` compartilhado, `demoCards` array
- [x] Centralizar tipos/estado simulados se fizer sentido — `FunnelState` em `funnelStore.ts`
- [x] Refinar nomenclatura para deixar claro o que é simulado — `simulateSignIn`, `simulateJoinBeta`
- [x] Evitar lógica de fluxo espalhada em múltiplas páginas sem contrato claro — `FunnelProvider` + `useFunnel`
- [x] Garantir que cada rota tenha responsabilidade clara — auth=entry, beta=queue, dashboard=destination
- [x] Reexecutar validações após o refactor — `npx next build` + `bun run lint` + `npx tsc --noEmit`

### Saída esperada
- Funil mais fácil de evoluir
- Menos ambiguidade entre demo e produto real
- Preparação melhor para auth/backend futuros

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [x] Executar lint — ✅ `bun run lint`: 0 erros, 106 warnings (preexistentes)
- [x] Executar build — ✅ `npx next build`: sucesso, 7 páginas geradas
- [x] Validar manualmente a jornada `/auth` -> `/beta` -> `/dashboard` — documentado no phase board
- [x] Validar acesso direto a `/beta` e `/dashboard` — preview/explicação + CTA
- [x] Validar retorno para landing ou rotas anteriores sem inconsistência gritante — links funcionais
- [x] Validar copy e visual das três páginas após a evolução do fluxo — badges + copy honesta

### Comandos finais
```bash
bun run lint
bun run build
```

### Rollout
- **Estratégia de deploy:** liberar como foundation funcional do funil, ainda sem backend real.
- **Uso de feature flag:** não previsto inicialmente.
- **Plano de monitoramento pós-release:** smoke manual da jornada e revisão das páginas em preview/produção.
- **Métricas a observar:** coerência do fluxo, ausência de dead ends, clareza de estado simulado, estabilidade visual.
- **Alertas esperados:** links quebrados, estado incoerente, acesso direto mal tratado, UI parecendo enganosa ou incompleta.

### Responsáveis
- **Backend:** não aplicável
- **Frontend:** owner do funil
- **QA:** QA manual / agent
- **Produto:** owner da private beta experience
- **Release/Deploy:** maintainer do projeto

### Janela de deploy
- **Horário recomendado:** quando houver tempo para smoke manual completo após publish
- **Tempo de monitoramento:** 30–60 minutos após release/preview

---

## 12. Checkpoints do Agent OS

- [x] Checkpoint 1 — Discovery validado
- [x] Checkpoint 2 — Estratégia de testes aprovada
- [x] Checkpoint 3 — RED tests concluídos
- [x] Checkpoint 4 — GREEN alcançado
- [x] Checkpoint 5 — Refatoração concluída
- [x] Checkpoint 6 — Validação final concluída

### Log resumido dos checkpoints
| Checkpoint | Responsável | Resultado | Observações |
|-----------|-------------|-----------|-------------|
| Jornada alvo | agent | ✅ Concluído | `FunnelState` com 9 campos. Jornada `/auth` → `/beta` → `/dashboard` definida. |
| Estado simulado | agent | ✅ Concluído | `funnelStore.ts` (tipos + localStorage) + `FunnelProvider.tsx` (React context). |
| QA final | agent + owner | ✅ Concluído | `npx next build` (sucesso, 7 páginas), `bun run lint` (0 errors), `npx tsc --noEmit` (0 errors). |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
| Entrada simulada | `/auth` leva a um próximo passo funcional | form → simulateSignIn → push /beta | ✅ Concluído |
| Fila beta coerente | `/beta` mostra estado consistente com a jornada | context-aware position + join button | ✅ Concluído |
| Dashboard demonstrativo | `/dashboard` depende de contexto simulado e não parece rota solta | personalized greeting + preview fallback | ✅ Concluído |
| Honestidade do fluxo | UI deixa claro o que ainda é simulado | badges + copy honesta + footnote | ✅ Concluído |
| Qualidade visual | páginas mantêm consistência com o restante da marca | `glass-panel`, tipografia, cores | ✅ Concluído |

---

## 14. Plano de Rollback

### Gatilhos
- Navegação quebrada entre as rotas
- Estado simulado inconsistente ou enganoso
- Regressão visual relevante nas páginas do funil
- Build/lint quebrando após a implementação
- Complexidade excessiva para uma foundation ainda sem backend

### Passos
1. Reverter as mudanças do funil para as páginas estáticas anteriores
2. Executar smoke check básico das rotas restauradas
3. Confirmar que os links mínimos continuam funcionando
4. Registrar a causa da reversão
5. Replanejar o fluxo com escopo menor, se necessário

### Responsáveis
- **Execução técnica:** owner do frontend / agent
- **Revalidação:** QA manual
- **Comunicação:** responsável pela release

### RTO
- Até 30 minutos

---

## 15. Critérios de Aceite

- [x] O funil tem coerência navegável real — `/auth` → `/beta` → `/dashboard` com estado compartilhado
- [x] O estado simulado é verificável e não puramente decorativo — `FunnelState` com 9 campos, localStorage
- [x] A UI continua honesta sobre ausência de backend real — badges, copy, footnotes
- [x] Os acessos diretos às rotas têm comportamento aceitável — preview + CTA para funil
- [x] Checklist manual executado — registrado no phase board
- [x] Rollback definido — plano de rollback mantido
- [x] Documentação mínima atualizada — phase board + sprint doc
- [x] Critérios de sucesso da sprint foram atingidos — todos os 5 critérios marcados como completos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [x] `/auth`, `/beta` e `/dashboard` deixarem de ser apenas páginas soltas — FunnelProvider conecta todas
- [x] O fluxo principal puder ser percorrido ponta a ponta — form → queue → dashboard
- [x] O estado simulado estiver isolado o suficiente para futura substituição — `funnelStore.ts` em `src/lib/`
- [x] Não houver afirmação enganosa de backend ou auth reais — badges + copy honesta
- [x] Smoke checks do funil estiverem registrados — 5 casos de regressão no phase board

---

## 17. Instrução padrão para AGENTS.md

```text
When evolving `/auth`, `/beta`, and `/dashboard` in PenFlow77, treat them as placeholder routes that must become a coherent simulated funnel before any real backend integration exists.

Mandatory rules:
- do not pretend real auth, API, or persistence already exists
- prefer a minimal reusable simulated-state layer over disconnected hardcoded pages
- keep direct-route behavior honest and understandable
- preserve visual quality consistent with the landing experience
- prepare the flow for future backend replacement without unnecessary complexity
```
