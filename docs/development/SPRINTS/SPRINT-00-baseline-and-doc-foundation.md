---
title: Sprint 00 - Baseline and Doc Foundation
type: sprint
mode: sprint
approach: tdd-first-adapted-for-docs
status: completed
---

# Sprint SPRINT-00 — Baseline and Doc Foundation

## 1. Objetivo

Consolidar a camada de governança documental do PenFlow77 com um índice mestre de sprints, sprints detalhadas e a camada inicial de tasks/boards, conectadas ao `CURRENT-STATE`, `ROADMAP` e `CHANGELOG`, para que o projeto passe a ter execução orientada por sprints sem perder a leitura factual da aplicação atual.

> Entrega verificável: `docs/development/SPRINTS.md` existe, `docs/development/TASKS.md` existe, as pastas `docs/development/sprints/` e `docs/development/tasks/` existem, a baseline inicial com `SPRINT-00` a `SPRINT-04` está preenchida e qualquer pessoa consegue entender dependências, escopo e próximos boards sem precisar inferir a partir dos specs do hero.

---

## 2. Resumo Executivo

- **Tipo da sprint:** docs / governance
- **Modo principal do Agent OS:** sprint
- **Fase relacionada:** Fase 00 — Governança documental inicial
- **Status:** Concluída
- **Prioridade:** Crítica
- **Owner principal:** agent
- **Dependências externas:** nenhuma obrigatória; a referência canônica desta camada para sprints é `docs/development/SPRINTS.md`
- **Janela estimada:** 0,5–1 dia

---

## 3. Contexto

- **Problema atual:** a baseline documental do projeto já diferencia estado atual, histórico e roadmap, mas ainda não existia uma camada integrada de sprints e tasks que transformasse essa leitura em execução recorrente.
- **Impacto no sistema/produto:** sem sprints explícitas, o projeto fica dependente de leitura dispersa entre specs aspiracionais, roadmap macro e playbooks antigos, o que aumenta o risco de priorização errada.
- **Riscos envolvidos:** duplicar informação do roadmap, inventar maturidade inexistente para `/auth`, `/beta` e `/dashboard`, ou criar sprints genéricas que não reflitam o estado real do repositório.
- **Áreas afetadas:** `docs/development/README.md`, `docs/development/CURRENT-STATE.md`, `docs/development/ROADMAP.md`, novos índices `SPRINTS` e `TASKS`, novas pastas `docs/development/sprints/` e `docs/development/tasks/`.
- **Fluxos de usuário impactados:** onboarding interno de engenharia, handoff entre agentes e priorização de evolução do produto.
- **Premissas importantes:** a landing e o hero são a parte mais madura do produto; `/auth`, `/beta` e `/dashboard` continuam placeholders; backend, API, DB e email seguem como roadmap.
- **Fora de escopo nesta sprint:** alterar código da aplicação, implementar backend, criar testes automatizados inexistentes.

---

## 4. Critérios de Sucesso

- [x] Existe um índice mestre em `docs/development/SPRINTS.md` com ID, nome, valor, foco, status, dependências, link da sprint e caminho do board.
- [x] Existe um índice mestre em `docs/development/TASKS.md` com vínculo claro entre fase, board e sprint correspondente.
- [x] Existe uma baseline inicial de sprints com `SPRINT-00` a `SPRINT-04` em `docs/development/sprints/`, sem impedir sprints futuras.
- [x] Existe uma baseline inicial de boards com `PHASE-00` a `PHASE-04` em `docs/development/tasks/`, sem impedir novas fases futuras.
- [x] As sprints derivam do `CURRENT-STATE.md` e do `ROADMAP.md`, sem copiar cegamente o `HERO_IMPLEMENTATION_PLAYBOOK.md`.
- [x] As seções de testes, TDD, homologação e rollback foram adaptadas de forma honesta ao contexto atual, sem inventar automação inexistente.
- [x] A camada documental final não contradiz a baseline factual já criada.

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [x] `docs/development/README.md` criado e válido
- [x] `docs/development/CURRENT-STATE.md` atualizado como baseline factual
- [x] `docs/development/ROADMAP.md` dividido em Now / Next / Later
- [x] Convenção editorial inicial da camada definida a partir da baseline documental existente

### Ordem macro recomendada
1. Ler `docs/development/SPRINTS.md` e a baseline atual
2. Definir a sequência de sprints a partir dos gaps reais
3. Criar o índice mestre `SPRINTS.md`
4. Criar as sprints detalhadas
5. Criar `TASKS.md` e os boards iniciais por fase
6. Sincronizar documentação que ficou desatualizada após a criação da nova camada
7. Validar consistência editorial

### Paralelização possível
- Redação do índice mestre
- Redação de SPRINT-01 e SPRINT-02
- Redação de SPRINT-03 e SPRINT-04

### Caminho crítico
- Confirmar baseline factual do projeto
- Definir dependências reais entre sprints
- Criar e revisar os documentos sem contradições internas

---

## 6. Etapa 1 — Discovery Técnico

### Objetivo
Entender o estado documental e operacional real antes de estruturar a primeira cadência de sprints.

### Checklist
- [x] Revisar `docs/development/README.md`
- [x] Revisar `docs/development/CURRENT-STATE.md`
- [x] Revisar `docs/development/ROADMAP.md`
- [x] Revisar `docs/development/CHANGELOG.md` e política do changelog
- [x] Definir a convenção canônica de sprints desta camada em `docs/development/SPRINTS.md`
- [x] Verificar quais lacunas do projeto já estão explícitas
- [x] Confirmar quais sprints são documentais, quais são de implementação e quais dependem de auditoria prévia

### Saída esperada
- Sequência inicial de sprints definida
- Relação clara entre baseline, auditoria, implementação e qualidade
- Limites de escopo documentados
- Dependências reais registradas

---

## 7. Etapa 2 — Design de Comportamento e Estratégia de Testes

### Objetivo
Definir como a camada documental deve se comportar e como verificar sua consistência.

### Checklist
- [x] Definir o papel do índice mestre de sprints
- [x] Definir o papel de cada sprint inicial
- [x] Definir como status e dependências serão lidos
- [x] Definir validações editoriais mínimas antes de considerar a sprint pronta
- [x] Definir estratégia de revisão manual, já que não existe automação documental dedicada
- [x] Confirmar que cada sprint tenha valor operacional verificável
- [x] Confirmar que a camada inicial de boards deriva das sprints e que boards futuros continuarão seguindo essa regra

### Casos de teste planejados
- [x] Cenário 1: um novo colaborador encontra em `SPRINTS.md` a ordem correta das sprints e entende por que cada uma existe.
- [x] Cenário 2: a leitura de `SPRINT-02` deixa claro que o hero precisa de alinhamento de tokens, motion e fallback, e não de reimplementação cega do playbook.
- [x] Cenário 3: a leitura de `SPRINT-03` deixa claro que `/auth`, `/beta` e `/dashboard` ainda são placeholders a evoluir.
- [x] Cenário 4: a leitura de `SPRINT-04` deixa claro que a baseline de testes ainda precisa ser criada.
- [x] Edge case 1: nenhum documento apresenta backend, auth real ou testes existentes como se já estivessem implementados.
- [x] Regressão 1: `README` e `CURRENT-STATE` não ficam desatualizados após a criação da nova camada de sprints.

### Matriz de testes
| Tipo | Escopo | Obrigatório? | Observações |
|------|--------|--------------|-------------|
| Unitário | N/A | Não | Não há automação documental nesta baseline. |
| Integração | Consistência entre docs | Sim | Revisão manual cruzando `SPRINTS`, `CURRENT-STATE` e `ROADMAP`. |
| E2E | Navegação documental | Não | Verificação manual de links e caminhos é suficiente. |
| Regressão | Contradições editoriais | Sim | Garantir que a nova camada não invalide a baseline anterior. |
| Auth/AuthZ | N/A | Não | Não se aplica a esta sprint documental. |

---

## 8. Etapa 3 — Testes Primeiro (TDD)

### Objetivo
Definir a validação documental antes de escrever os novos artefatos.

### Checklist
- [x] Listar artefatos obrigatórios antes da redação
- [x] Definir o conteúdo mínimo de cada sprint antes de escrever qualquer arquivo
- [x] Verificar ausência inicial do índice mestre e da pasta de sprints, quando aplicável
- [x] Registrar quais contradições documentais precisam ser evitadas desde o início
- [x] Tratar revisão editorial como a evidência RED principal nesta sprint
- [x] Reservar testes automatizados para sprint futura de qualidade, se fizer sentido

### Testes a implementar primeiro
- [x] Teste unitário: não aplicável nesta baseline documental.
- [x] Teste de integração: revisão cruzada entre `README`, `CURRENT-STATE`, `ROADMAP`, `SPRINTS`, `TASKS` e arquivos de sprint/board.
- [x] Teste de regressão: verificar que placeholders continuam classificados como placeholders.
- [x] Teste de autorização/autenticação: não aplicável.
- [x] Teste de edge case: validar que sprints documentais também têm estratégia de testes/TDD adaptada e honesta.
- [x] Teste de contrato/API: não aplicável.

### Evidência RED
- **Comando executado:** inspeção inicial de `docs/development/` e leitura do template oficial.
- **Falha esperada observada:** ausência de `docs/development/SPRINTS.md` e de documentos de sprint antes desta entrega.
- **Observações:** a falha é estrutural/documental, não de código executável.

---

## 9. Etapa 4 — Implementação

### Objetivo
Criar a camada inicial de sprints e tasks com o mínimo necessário para tornar a governança operacional utilizável imediatamente.

### Checklist
- [x] Criar `docs/development/SPRINTS.md`
- [x] Criar `docs/development/sprints/`
- [x] Criar `SPRINT-00` a `SPRINT-04`
- [x] Criar `docs/development/TASKS.md`
- [x] Criar `docs/development/tasks/`
- [x] Criar `PHASE-00` a `PHASE-04`
- [x] Preencher dependências reais e valor operacional de cada sprint/fase
- [x] Sincronizar os documentos afetados pela nova camada
- [x] Preservar o `CURRENT-STATE` como referência factual
- [x] Atualizar documentação mínima impactada

### Regras obrigatórias
- Não chamar placeholder de implementação pronta.
- Não prometer backend real, fila persistida ou autenticação real se isso não existir.
- Não copiar o playbook do hero como se fosse board atual do projeto.
- Toda sprint deve ter objetivo verificável.
- A camada documental deve seguir a arquitetura editorial já criada em `docs/development/`.
- A adaptação do template deve preservar a estrutura, mesmo quando certas seções forem marcadas como não aplicáveis.

### Mudanças previstas
- **Backend:** nenhuma
- **API:** nenhuma
- **Frontend:** nenhuma
- **Banco/Schema:** nenhuma
- **Infra/Config:** nenhuma
- **Docs:** criação dos índices `SPRINTS` e `TASKS`, pastas `sprints/` e `tasks/`, boards iniciais e sincronização dos docs de desenvolvimento afetados

---

## 10. Etapa 5 — Refatoração

### Objetivo
Refinar a redação e remover ambiguidades, duplicações e contradições entre os documentos.

### Checklist
- [x] Revisar nomenclatura de sprint, fase e board
- [x] Remover frases genéricas sem consequência operacional
- [x] Consolidar dependências repetidas
- [x] Garantir que o roadmap continue macro e as sprints continuem executáveis
- [x] Garantir consistência entre status e ordem das sprints
- [x] Simplificar trechos excessivamente aspiracionais

### Saída esperada
- Documentação mais fácil de operar
- Relação mais clara entre docs de estado, roadmap e execução
- Sem contradição editorial relevante

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [x] Verificar existência de todos os arquivos planejados
- [x] Revisar links relativos dos índices mestres
- [x] Revisar coerência entre dependências e ordem de sprints e boards
- [x] Revisar checklist manual de homologação
- [x] Revisar docs afetados pela criação da camada
- [x] Confirmar que nenhum código da aplicação foi alterado nesta sprint

### Comandos finais
```bash
ls docs/development
ls docs/development/sprints
ls docs/development/tasks
bun run lint
```

### Rollout
- **Estratégia de deploy:** nenhuma mudança de runtime; rollout consiste em publicar a nova camada documental junto do restante do repositório.
- **Uso de feature flag:** não aplicável.
- **Plano de monitoramento pós-release:** validar se futuros agentes passam a usar `SPRINTS.md` como entrada de execução.
- **Métricas a observar:** ausência de contradições documentais recorrentes; melhor clareza de priorização.
- **Alertas esperados:** divergência entre docs de baseline e sprints, se algum documento não for sincronizado.

### Responsáveis
- **Backend:** não aplicável
- **Frontend:** não aplicável
- **QA:** owner documental / agent
- **Produto:** owner do roadmap
- **Release/Deploy:** maintainer do repositório

### Janela de deploy
- **Horário recomendado:** qualquer horário útil de atualização documental
- **Tempo de monitoramento:** revisão imediata após merge

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
| Discovery | agent | Concluído | Baseline documental lida e convenções definidas |
| Estrutura das sprints | agent | Concluído | Dependências, valor de feature e camada inicial de tasks alinhados |
| Validação final | agent | Concluído | Coerência editorial revisada após criação dos arquivos |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
| Índice mestre existe | `docs/development/SPRINTS.md` lista as cinco sprints com links válidos | revisão manual do arquivo | Concluído |
| Pasta de sprints existe | `docs/development/sprints/` contém pelo menos `SPRINT-00` a `SPRINT-04`, preservando espaço para sprints futuras | listagem de diretório | Concluído |
| Leitura factual preservada | `CURRENT-STATE` continua separando realidade de intenção | revisão manual cruzada | Concluído |
| Roadmap continua macro | `ROADMAP` não vira board operacional | revisão manual cruzada | Concluído |

---

## 14. Plano de Rollback

### Gatilhos
- Confusão editorial relevante após a introdução da nova camada
- Contradição explícita entre `SPRINTS` e `CURRENT-STATE`
- Sequenciamento de sprints levando a execução incorreta do roadmap
- Links quebrados ou arquivos faltando
- Atualização em docs-base deixando a baseline menos clara que antes

### Passos
1. Reverter os arquivos da camada de sprints
2. Restaurar os documentos-base sincronizados para a versão anterior, se necessário
3. Revalidar `README`, `CURRENT-STATE` e `ROADMAP`
4. Documentar o motivo da reversão
5. Replanejar a camada de sprints com escopo menor, se necessário

### Responsáveis
- **Execução técnica:** maintainer / agent
- **Revalidação:** owner documental
- **Comunicação:** responsável pelo repositório

### RTO
- Até 30 minutos

---

## 15. Critérios de Aceite

- [x] Todos os artefatos solicitados foram criados
- [x] As sprints são específicas ao PenFlow77
- [x] Nenhum placeholder foi tratado como feature pronta
- [x] A estrutura do template oficial foi preservada
- [x] Checklist manual executado
- [x] Rollback definido
- [x] Documentação impactada sincronizada
- [x] Critérios de sucesso da sprint foram atingidos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [x] Os índices mestres `SPRINTS.md` e `TASKS.md` estiverem publicados
- [x] A baseline inicial com `SPRINT-00` a `SPRINT-04` e `PHASE-00` a `PHASE-04` estiver preenchida
- [x] A baseline documental não tiver sido contradita
- [x] Dependências e ordem de execução estiverem claras entre sprints e boards
- [x] Não houver blocker documental aberto para a operação da nova camada
- [x] A documentação impactada tiver sido atualizada, quando aplicável

---

## 17. Instrução padrão para AGENTS.md

```text
When generating new sprints for PenFlow77, always derive them from the factual state in `docs/development/CURRENT-STATE.md` and the prioritization in `docs/development/ROADMAP.md`.

Mandatory rules:
- preserve the official sprint template structure
- keep the sprint specific to the current repository state
- do not present placeholders as implemented product flows
- document feature value or operational value explicitly
- adapt testing and TDD sections honestly when automation does not exist yet
- keep sprint boards as a future execution layer derived from sprint docs
- do not copy the hero playbook blindly into sprint planning
```
