---
title: Task Board Template
type: phase-task-board
mode: execution-tracking
status: draft
---

# 🚀 Tasks — Fase {{NÚMERO}}: {{NOME DA FASE OU SPRINT}}

> **Como usar:** copie este arquivo para `docs/development/tasks/PHASE-{{N}}-{{SLUG}}.md` e substitua os espaços `{{ }}` com as informações da fase atual.  
> Use este documento como **fonte oficial de acompanhamento operacional** da fase/sprint.  
> Para tarefas unitárias, utilize o template `single-task.template.md`.

**Status:** {{🟢 ATIVA / ✅ CONCLUÍDA / 🔴 BLOQUEADA / ⚪ ARQUIVADA}}  
**Última atualização:** {{AAAA-MM-DD}}  
**Sprint Atual:** {{Sprint ou período}}  
**Modo principal:** {{backend / frontend / animation / refactor / architecture / mixed}}  
**Status Geral:** {{emoji}} {{% concluído}} ({{X/Y}} tarefas completas) – {{FASE ATIVA / FASE ARQUIVADA}}  
**ETA:** {{duração ou intervalo}}  
**Pré-requisito:** {{fase anterior}} ({{status}})  
**Owner:** {{nome / equipe / agent}}  
**Docs relacionadas:** {{PRD / Phase / Sprint / GOV / Changelog}}

---

> **📌 NOTA (opcional):** use este bloco quando a fase estiver arquivada, congelada, ou quando houver instruções especiais.

---

## 📊 Resumo de Progresso

| Categoria | Total | Concluído | Em Andamento | Pendente | Bloqueado |
| --------- | ----- | --------- | ------------ | -------- | --------- |
| {{Categoria A}} | {{}} | {{}} | {{}} | {{}} | {{}} |
| {{Categoria B}} | {{}} | {{}} | {{}} | {{}} | {{}} |
| {{Categoria C}} | {{}} | {{}} | {{}} | {{}} | {{}} |
| **TOTAL** | **{{}}** | **{{}}** | **{{}}** | **{{}}** | **{{}}** |

### 🎯 Principais Indicadores
- ✅ Destaque 1
- ✅ Destaque 2
- ⚠️ Risco / bloqueio relevante
- 🔴 Dependência crítica ainda aberta
- 🧪 Situação atual dos testes

---

## 🎯 Objetivos da Fase

Liste de 4 a 8 resultados concretos que esta fase deve entregar.

- [Objetivo 1]
- [Objetivo 2]
- [Objetivo 3]
- [Objetivo 4]

---

## 🗺️ Dependências, Batches e Caminho Crítico

### Dependências macro
- [Dependência 1]
- [Dependência 2]
- [Dependência 3]

### Caminho crítico
1. [Task/Bloco 1]
2. [Task/Bloco 2]
3. [Task/Bloco 3]

### Paralelização possível
- [Lote paralelo A]
- [Lote paralelo B]
- [Lote paralelo C]

### Checkpoints
- [ ] Discovery concluído
- [ ] Estratégia técnica validada
- [ ] Primeira batch implementada
- [ ] Integração validada
- [ ] Encerramento pronto

---

## 📦 Estrutura de Categorias

> Cada categoria representa um macro-bloco, como “Backend Auth”, “Read-side”, “Frontend UI”, “Infra”, “Security”, “Observability”, etc.  
> Dentro delas, separe por tema, subfase ou fluxo.

---

### 📦 {{Categoria}} — {{Descrição breve}}

#### Objetivo
Explique em 2–3 frases o propósito desta categoria, os módulos cobertos e o resultado esperado.

#### Escopo da categoria
- [Item 1]
- [Item 2]
- [Item 3]

#### Riscos da categoria
- [Risco 1]
- [Risco 2]

#### {{SIGLA}}.{{n}} — {{Nome da Subfase ou Tema}}

- [ ] **{{ID}}** — {{Título da tarefa}}

  **Modo recomendado:** {{backend / frontend / animation / refactor / bugfix / architecture}}  
  **Tipo:** {{feature / fix / refactor / infra / docs / test}}  

  **Descrição curta:**
  - Explique o problema a resolver.
  - Liste requisitos funcionais principais.
  - Liste restrições importantes.

  **Contexto mínimo:**
  - Dependência 1
  - Regra de negócio 1
  - Fluxo impactado 1

  **Implementação sugerida:**
  - Passo 1
  - Passo 2
  - Passo 3

  **Arquivos/áreas afetadas:** `path/relativo`, `path/relativo`

  **Critérios de aceitação:**
  - [ ] Critério funcional
  - [ ] Critério técnico
  - [ ] Critério de teste
  - [ ] Critério de segurança/performance, se aplicável

  **Estratégia de teste:**
  - [ ] Unitário
  - [ ] Integração
  - [ ] Regressão
  - [ ] E2E, se aplicável

  **Dependências:** {{IDs necessários ou “Nenhuma”}}  
  **Bloqueia:** {{IDs ou “Nenhuma”}}  
  **Pode rodar em paralelo com:** {{IDs ou “Nenhuma”}}

  **Prioridade:** {{🔴 Crítica / 🟡 Alta / 🟢 Média / 🔵 Baixa}}  
  **Estimativa:** {{tempo}}  
  **Responsável:** {{nome / equipe / agent}}  
  **Status:** {{✅ Completo / 🚧 Em andamento / ⏳ Pendente / ⛔ Bloqueado}}

  **Definição de pronto:**
  - [ ] Implementação concluída
  - [ ] Testes adicionados/atualizados
  - [ ] Critérios de aceitação atendidos
  - [ ] Sem violação arquitetural evidente

  **Notas adicionais (opcional):**
  - `AIDEV-*` anchors importantes
  - Links para docs relacionados (`docs/...`)
  - Decisões tomadas
  - Dívidas técnicas aceitas

---

## 🧪 Testes e Validações

- **Suites necessárias:** [Jest / Vitest / Playwright / Cypress / integração / smoke]
- **Cobertura alvo:** {{ex.: >80% branches nas áreas críticas}}
- **Comandos de verificação:**
  - `{{comando 1}}`
  - `{{comando 2}}`
  - `{{comando 3}}`
- **Estado atual:** ✅ Passando / ⚠️ Em falha / ⏳ Parcial
- **Fluxos críticos a validar manualmente:**
  - [Fluxo 1]
  - [Fluxo 2]
  - [Fluxo 3]

---

## 🔍 Riscos, Bloqueios e Decisões

### Bloqueios atuais
- [Bloqueio 1]
- [Bloqueio 2]

### Riscos em aberto
- [Risco 1]
- [Risco 2]

### Decisões importantes
- [Decisão 1]
- [Decisão 2]

---

## 📚 Documentação e Comunicação

- [ ] Atualizar `docs/development/TASKS.md`
- [ ] Atualizar `docs/development/CHANGELOG.md`
- [ ] Atualizar docs de schema, se aplicável
- [ ] Atualizar docs de infraestrutura/deploy, se aplicável
- [ ] Atualizar GOV closure ao encerrar a fase
- [ ] Registrar desvios de escopo ou decisões estruturais

---

## ✅ Checklist de Encerramento da Fase

- [ ] Todas as tarefas críticas concluídas
- [ ] Tasks pendentes replanejadas ou formalmente adiadas
- [ ] Migrations aplicadas e versionadas, se houver
- [ ] Testes backend/frontend executados e passando
- [ ] Fluxos críticos validados manualmente
- [ ] Documentação atualizada
- [ ] Revisão de segurança/arquitetura realizada
- [ ] Aprovação final registrada
- [ ] GOV closure criado
- [ ] Changelog atualizado

---

## 📌 Instrução padrão para AGENTS.md

```text
When generating or updating phase/sprint task boards for this application, always follow the official Task Board Template.

Rules:
- this file is the operational tracking source for a phase or sprint
- do not use it as a single-task template
- every task entry must include acceptance criteria, dependencies, status, and test strategy
- identify critical path and parallelizable work whenever possible
- keep the board specific to the current phase, sprint, and architecture
- update progress consistently and avoid generic placeholders in final project documents
- preserve historical notes for completed or archived tasks
```
