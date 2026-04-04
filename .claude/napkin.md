# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-04-03] Distinga sempre estado atual de estado planejado**
   Do instead: documente separadamente `CURRENT-STATE`, `ROADMAP`, `SPRINTS` e `CHANGELOG`, sem misturar placeholder com feature entregue.
2. **[2026-04-03] Use evidência do código ao descrever a aplicação**
   Do instead: sustente afirmações importantes com referências `path:line` nos docs de auditoria e review.

## Shell & Command Reliability
1. **[2026-04-03] Ferramentas baseadas em rg podem falhar neste ambiente**
   Do instead: quando `Glob`/`Grep` falharem por ausência de ripgrep, use leituras diretas e comandos shell simples para localizar estrutura e validar caminhos.
2. **[2026-04-03] Worktree local precisa estar ignorado antes de uso**
   Do instead: mantenha `.worktrees/` no `.gitignore` antes de criar worktrees dentro do projeto.

## Domain Behavior Guardrails
1. **[2026-04-03] Este repositório está mais próximo de uma demo premium do que do produto completo**
   Do instead: trate landing/hero como implementados e `/auth`, `/beta`, `/dashboard` como fluxos ainda parciais/placeholder até haver backend e integrações reais.
2. **[2026-04-03] O hero é a área mais madura e mais sensível à divergência com specs**
   Do instead: compare sempre implementação real do hero com `AGENTS.md`, `HERO_SPEC_smart_pen.md`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md` e `HERO_IMPLEMENTATION_PLAYBOOK.md` antes de planejar novas features.

## User Directives
1. **[2026-04-03] README deve ser atualizado no raiz e também existir documentação em `docs/development/`**
   Do instead: mantenha o `README.md` como porta de entrada do repositório e use `docs/development/` para governança operacional detalhada.
2. **[2026-04-03] A camada de sprints deve refletir o estado real do repo, não o playbook idealizado**
   Do instead: derive sprints de `CURRENT-STATE.md` e `ROADMAP.md`, usando o `HERO_IMPLEMENTATION_PLAYBOOK.md` apenas como referência complementar.
