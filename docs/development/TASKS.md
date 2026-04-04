# TASKS

Este arquivo é o índice mestre dos phase boards do PenFlow77.

Ele conecta cada sprint detalhada à sua camada operacional de execução, sem substituir a leitura factual de `CURRENT-STATE.md`, a priorização macro de `ROADMAP.md` ou o enquadramento de escopo em `SPRINTS.md`.

## Como usar

- leia `docs/development/CURRENT-STATE.md` para entender a realidade implementada
- leia `docs/development/ROADMAP.md` para entender a prioridade macro
- leia `docs/development/SPRINTS.md` para localizar a sprint correta
- use este índice para abrir o board operacional correspondente
- atualize o board da fase antes de alterar status aqui
- não trate este índice como backlog genérico: cada entrada precisa apontar para um board específico

## Índice mestre dos boards

| ID | Nome | Objetivo operacional | Status | Dependências | Arquivo do board | Relação com a sprint |
| --- | --- | --- | --- | --- | --- | --- |
| PHASE-00 | Baseline and Doc Foundation | Fechar a primeira camada operacional de governança conectando baseline, sprints, tasks e critérios de manutenção contínua dos docs. | Concluída | `README.md`, `docs/development/README.md`, `CURRENT-STATE.md`, `ROADMAP.md`, `CHANGELOG.md`, `docs/development/changelog/2026-04-baseline.md` | [`docs/development/tasks/PHASE-00-baseline-and-doc-foundation.md`](./tasks/PHASE-00-baseline-and-doc-foundation.md) | Board operacional da `SPRINT-00` |
| PHASE-01 | Spec vs Implementation Audit | Produzir a auditoria canônica de gaps entre specs e implementação real, com classificação por ação: corrigir código, corrigir spec ou adiar conscientemente. | Planejada | PHASE-00; specs-raiz; código atual do frontend; baseline factual | [`docs/development/tasks/PHASE-01-spec-vs-implementation-audit.md`](./tasks/PHASE-01-spec-vs-implementation-audit.md) | Board operacional da `SPRINT-01` |
| PHASE-02 | Hero Alignment and Polish | Alinhar o hero real ao design system decidido, à política de scroll/motion e às experiências de fallback, reduced motion e mobile. | Planejada | PHASE-01; decisões da auditoria sobre tokens, tipografia e comportamento do hero | [`docs/development/tasks/PHASE-02-hero-alignment-and-polish.md`](./tasks/PHASE-02-hero-alignment-and-polish.md) | Board operacional da `SPRINT-02` |
| PHASE-03 | Beta Funnel Foundation | Evoluir `/auth`, `/beta` e `/dashboard` de placeholders isolados para um funil simulado honesto, coerente e verificável. | Planejada | PHASE-01; direção de copy/CTA suficientemente estável; aprendizados de PHASE-02 ajudam mas não bloqueiam o início | [`docs/development/tasks/PHASE-03-beta-funnel-foundation.md`](./tasks/PHASE-03-beta-funnel-foundation.md) | Board operacional da `SPRINT-03` |
| PHASE-04 | Quality Testing and Release Foundation | Criar a baseline mínima de validação, smoke coverage e disciplina de release proporcional ao estágio real do projeto. | Planejada | PHASE-01; fluxos críticos definidos; aprendizados de PHASE-02 e PHASE-03 incorporados quando afetarem critérios de validação | [`docs/development/tasks/PHASE-04-quality-testing-and-release-foundation.md`](./tasks/PHASE-04-quality-testing-and-release-foundation.md) | Board operacional da `SPRINT-04` |

## Leitura correta desta camada

- `TASKS.md` indexa boards operacionais; ele não substitui a sprint detalhada.
- Cada board deve traduzir sua sprint em categorias, tarefas, dependências, risco, estratégia de teste e fechamento.
- `PHASE-01` tem como entrega canônica `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`.
- `PHASE-02` trata o hero existente como experiência madura com ressalvas, não como reimplementação do zero.
- `PHASE-03` deve manter `/auth`, `/beta` e `/dashboard` no campo de fluxo simulado honesto até existir backend real.
- `PHASE-04` não pode presumir que `test` ou `typecheck` já existam; essa camada nasce conforme a sprint avançar.

## Regras editoriais do índice

1. O status aqui deve espelhar o board e a sprint correspondentes.
2. Dependências precisam refletir o estado real do repositório, não a ordem idealizada dos specs antigos.
3. Se um board mudar de objetivo, atualize primeiro a sprint correspondente e depois este índice.
4. Quando uma fase for encerrada, registre o fechamento também no changelog ou no documento de governança aplicável.
5. Evite criar boards paralelos para o mesmo escopo; a fonte operacional deve continuar única por fase.

## Convenção canônica desta camada

Este arquivo é a fonte canônica para:
- nomenclatura `PHASE-*`
- vínculo entre fase, board e sprint correspondente
- status macro dos boards
- regra de dependência entre boards
- regra de derivação: cada board detalha uma sprint já existente

Os arquivos em `docs/development/tasks/` detalham a execução operacional e devem permanecer consistentes com este índice. Para esta camada, a referência auditável da convenção de phase boards passa a ser `docs/development/TASKS.md` em conjunto com os boards já publicados em `docs/development/tasks/`.

Se houver dúvida sobre naming, bloqueios, status, relação com a sprint ou escopo operacional de um board, este arquivo prevalece como fonte interna de verdade.

## Convenção mínima dos phase boards

Cada board deve manter, no mínimo:
- identificação da fase e vínculo com a sprint
- objetivo operacional claro
- dependências macro, caminho crítico e paralelização possível
- categorias com tarefas específicas ao PenFlow77
- estratégia de teste, riscos, decisões e checklist de encerramento

Boards podem adaptar a profundidade de cada seção ao tipo de fase, mas sem quebrar a consistência com `CURRENT-STATE`, `ROADMAP`, `SPRINTS` e o próprio `TASKS.md`.

## 