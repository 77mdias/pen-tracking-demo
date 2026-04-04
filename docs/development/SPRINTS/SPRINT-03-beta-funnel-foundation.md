---
title: Sprint 03 - Beta Funnel Foundation
type: sprint
mode: sprint
approach: tdd-first
status: planned
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
- **Status:** Planejada
- **Prioridade:** Alta
- **Owner principal:** agent
- **Dependências externas:** auditoria da SPRINT-01; baseline de experiência/CTA consolidada; decisões mínimas sobre copy e estado simulado
- **Janela estimada:** 2–4 dias

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

- [ ] `/auth`, `/beta` e `/dashboard` passam a compor um fluxo coerente e navegável.
- [ ] O estado exibido no funil deixa de ser totalmente fixo e passa a refletir uma simulação consistente do usuário atual.
- [ ] A experiência deixa claro quando um comportamento é simulado e quando uma capacidade real ainda não existe.
- [ ] As páginas mantêm qualidade visual compatível com o restante da marca/landing.
- [ ] O fluxo fica preparado para futura substituição por backend real sem refactor caótico.

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [ ] Auditoria da SPRINT-01 concluída
- [ ] Classificação oficial das três rotas como placeholders confirmada
- [ ] Decisão mínima sobre os estados simulados do funil
- [ ] Direção de CTA/copy da landing suficientemente estável

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
- [ ] Revisar implementações atuais de `/auth`, `/beta` e `/dashboard`
- [ ] Identificar quais dados hoje são puramente hardcoded
- [ ] Identificar que tipo de estado local/simulado faz sentido para o projeto
- [ ] Mapear quais elementos visuais podem ser reaproveitados
- [ ] Definir se haverá transição client-side, query params, local state ou outro mecanismo simples
- [ ] Identificar pontos futuros de integração com auth/backend real
- [ ] Revisar impacto na copy e CTA da landing, se houver ligação direta com o funil

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
- [ ] Definir jornada mínima: entrar, ver status de beta, chegar ao dashboard demonstrativo
- [ ] Definir quais dados simulados são necessários e quais são desnecessários
- [ ] Definir como comunicar estado simulado sem matar a percepção premium
- [ ] Definir critérios de aceite por rota e por transição
- [ ] Definir estratégia de testes manuais e automatizados possíveis
- [ ] Definir casos de regressão para links, estado e mensagens
- [ ] Confirmar limites de escopo para não vazar para backend real

### Casos de teste planejados
- [ ] Cenário 1: usuário inicia em `/auth`, executa a entrada simulada e chega à fila beta com estado coerente.
- [ ] Cenário 2: usuário avança para `/dashboard` e vê informações consistentes com o estado anteriormente escolhido/simulado.
- [ ] Cenário 3: usuário volta entre telas sem perder completamente o contexto da simulação dentro da mesma sessão esperada.
- [ ] Cenário 4: usuário entende que o fluxo é uma foundation funcional/simulada, e não uma autenticação real completa.
- [ ] Edge case 1: acesso direto a `/dashboard` sem contexto mínimo recebe comportamento coerente e não enganoso.
- [ ] Regressão 1: links entre as três rotas continuam válidos e a UI não regride em qualidade visual.

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
- [ ] Definir smoke checks para entrada, avanço e retorno no funil
- [ ] Definir comportamento esperado para acesso direto a cada rota
- [ ] Definir como o estado simulado será inspecionado/validado
- [ ] Registrar a ausência atual de coerência funcional como baseline RED
- [ ] Definir regressões críticas que não podem reaparecer
- [ ] Deixar claro o que ainda não será automatizado nesta sprint

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
- [ ] Introduzir estado simulado mínimo reutilizável
- [ ] Conectar `/auth` ao próximo passo do funil com comportamento verificável
- [ ] Tornar `/beta` um estado da jornada, não apenas uma página isolada
- [ ] Tornar `/dashboard` dependente do contexto simulado apropriado
- [ ] Comunicar limitações do fluxo de forma honesta
- [ ] Preservar consistência visual com a landing e o hero
- [ ] Atualizar documentação mínima impactada

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
- [ ] Extrair duplicações entre páginas
- [ ] Centralizar tipos/estado simulados se fizer sentido
- [ ] Refinar nomenclatura para deixar claro o que é simulado
- [ ] Evitar lógica de fluxo espalhada em múltiplas páginas sem contrato claro
- [ ] Garantir que cada rota tenha responsabilidade clara
- [ ] Reexecutar validações após o refactor

### Saída esperada
- Funil mais fácil de evoluir
- Menos ambiguidade entre demo e produto real
- Preparação melhor para auth/backend futuros

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [ ] Executar lint
- [ ] Executar build
- [ ] Validar manualmente a jornada `/auth` -> `/beta` -> `/dashboard`
- [ ] Validar acesso direto a `/beta` e `/dashboard`
- [ ] Validar retorno para landing ou rotas anteriores sem inconsistência gritante
- [ ] Validar copy e visual das três páginas após a evolução do fluxo

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

- [ ] Checkpoint 1 — Discovery validado
- [ ] Checkpoint 2 — Estratégia de testes aprovada
- [ ] Checkpoint 3 — RED tests concluídos
- [ ] Checkpoint 4 — GREEN alcançado
- [ ] Checkpoint 5 — Refatoração concluída
- [ ] Checkpoint 6 — Validação final concluída

### Log resumido dos checkpoints
| Checkpoint | Responsável | Resultado | Observações |
|-----------|-------------|-----------|-------------|
| Jornada alvo | agent | Pendente | Definir fluxo mínimo honesto |
| Estado simulado | agent | Pendente | Evitar hardcodes desconectados |
| QA final | agent + owner | Pendente | Validar transições e acesso direto |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
| Entrada simulada | `/auth` leva a um próximo passo funcional | smoke manual | Pendente |
| Fila beta coerente | `/beta` mostra estado consistente com a jornada | smoke manual | Pendente |
| Dashboard demonstrativo | `/dashboard` depende de contexto simulado e não parece rota solta | smoke manual | Pendente |
| Honestidade do fluxo | UI deixa claro o que ainda é simulado | revisão manual | Pendente |
| Qualidade visual | páginas mantêm consistência com o restante da marca | revisão visual | Pendente |

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

- [ ] O funil tem coerência navegável real
- [ ] O estado simulado é verificável e não puramente decorativo
- [ ] A UI continua honesta sobre ausência de backend real
- [ ] Os acessos diretos às rotas têm comportamento aceitável
- [ ] Checklist manual executado
- [ ] Rollback definido
- [ ] Documentação mínima atualizada
- [ ] Critérios de sucesso da sprint foram atingidos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [ ] `/auth`, `/beta` e `/dashboard` deixarem de ser apenas páginas soltas
- [ ] O fluxo principal puder ser percorrido ponta a ponta
- [ ] O estado simulado estiver isolado o suficiente para futura substituição
- [ ] Não houver afirmação enganosa de backend ou auth reais
- [ ] Smoke checks do funil estiverem registrados

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
