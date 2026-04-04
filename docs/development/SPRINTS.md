# SPRINTS

Este arquivo é o índice mestre das sprints do PenFlow77.

Ele existe para conectar o que o repositório entrega hoje, o que o roadmap prioriza e como o trabalho deve ser executado sem confundir baseline factual com intenção futura.

## Como usar

- leia `docs/development/CURRENT-STATE.md` antes de abrir uma sprint nova
- use `docs/development/ROADMAP.md` para entender a ordem macro de prioridade
- use este índice para localizar a sprint detalhada correta
- crie boards de execução derivados de cada sprint, sem reescrever o objetivo da sprint dentro do board
- não trate placeholder como feature pronta

## Ordem atual das sprints

| ID | Nome | Valor da feature / resultado | Foco principal | Status | Dependências | Arquivo da sprint | Futuro board |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SPRINT-00 | Baseline and Doc Foundation | Cria a camada operacional que transforma baseline, roadmap, changelog, sprints e tasks em execução contínua sem perder a leitura factual do projeto. | Governança documental, índices mestres, convenções de uso | Concluída | Baseline já criada em `README`, `CURRENT-STATE`, `ROADMAP` e `CHANGELOG` | [`docs/development/sprints/SPRINT-00-baseline-and-doc-foundation.md`](./sprints/SPRINT-00-baseline-and-doc-foundation.md) | `docs/development/tasks/PHASE-00-baseline-and-doc-foundation.md` |
| SPRINT-01 | Spec vs Implementation Audit | Entrega uma auditoria acionável das divergências reais entre specs, UI implementada, stack viva e nomenclatura operacional. | Auditoria, decisão, priorização de gaps | Planejada | SPRINT-00 | [`docs/development/sprints/SPRINT-01-spec-vs-implementation-audit.md`](./sprints/SPRINT-01-spec-vs-implementation-audit.md) | `docs/development/tasks/PHASE-01-spec-vs-implementation-audit.md` |
| SPRINT-02 | Hero Alignment and Polish | Alinha o hero premium ao design system, à política de motion e às experiências de fallback, mobile e reduced motion sem perder a percepção premium. | Hero, UX, motion, acessibilidade e polish | Planejada | SPRINT-01 | [`docs/development/sprints/SPRINT-02-hero-alignment-and-polish.md`](./sprints/SPRINT-02-hero-alignment-and-polish.md) | `docs/development/tasks/PHASE-02-hero-alignment-and-polish.md` |
| SPRINT-03 | Beta Funnel Foundation | Converte `/auth`, `/beta` e `/dashboard` de placeholders isolados em um funil navegável e coerente, com estado simulado verificável. | Fluxo de entrada, estado simulado, coerência entre rotas | Planejada | SPRINT-01; alinhamentos de CTA definidos em SPRINT-02 ajudam, mas não bloqueiam o início | [`docs/development/sprints/SPRINT-03-beta-funnel-foundation.md`](./sprints/SPRINT-03-beta-funnel-foundation.md) | `docs/development/tasks/PHASE-03-beta-funnel-foundation.md` |
| SPRINT-04 | Quality Testing and Release Foundation | Estabelece a baseline mínima de confiança para validar, testar e publicar mudanças sem depender só de inspeção manual ad hoc. | Test strategy, smoke tests, lint/typecheck, release discipline | Planejada | SPRINT-01; pode começar em paralelo com SPRINT-03 após a auditoria, incorporando aprendizados de SPRINT-02 quando houver impacto direto no hero | [`docs/development/sprints/SPRINT-04-quality-testing-and-release-foundation.md`](./sprints/SPRINT-04-quality-testing-and-release-foundation.md) | `docs/development/tasks/PHASE-04-quality-testing-and-release-foundation.md` |

## Leitura correta desta camada

- `SPRINT-00` organiza a governança documental e a transição da baseline para execução recorrente.
- `SPRINT-01` decide o que deve ser alinhado no código e o que deve ser alinhado nos próprios specs, consolidando isso em `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`.
- `SPRINT-02` ataca o ponto mais maduro e mais sensível do produto atual: o hero.
- `SPRINT-03` leva o projeto além da landing, mas sem inventar backend inexistente.
- `SPRINT-04` cria a disciplina mínima para validar e liberar mudanças com previsibilidade.

## Regras editoriais deste índice

1. Cada sprint precisa ter valor de feature ou de resultado operacional claro.
2. Dependências devem refletir o estado real do repositório, não a ordem idealizada dos specs.
3. O board futuro de cada sprint deve derivar do documento detalhado da sprint, e não do `HERO_IMPLEMENTATION_PLAYBOOK.md` de forma cega.
4. Quando uma sprint perder relevância, o status deve ser atualizado aqui antes de mexer nos boards.
5. Se uma decisão mover escopo entre sprints, atualize também `ROADMAP.md` e a sprint impactada.

## Convenção canônica desta camada

Este arquivo é a fonte canônica para:
- nomenclatura e ordem das sprints
- status macro de cada sprint
- relação entre sprint, valor operacional e board correspondente
- regra de derivação: boards nascem das sprints, não o contrário

Os arquivos em `docs/development/sprints/` detalham a execução de cada sprint e devem permanecer consistentes com este índice. Mesmo que a estrutura tenha sido inspirada por templates externos, a referência auditável desta camada passa a ser o próprio `docs/development/SPRINTS.md` em conjunto com os documentos já publicados em `docs/development/sprints/`.

Se houver dúvida sobre formato, prioridade, naming ou dependências de uma sprint, este arquivo prevalece como fonte interna de verdade.

## Convenção mínima dos documentos de sprint

Cada sprint detalhada deve manter, no mínimo:
- objetivo verificável
- resumo executivo com status, prioridade e dependências
- contexto e critérios de sucesso
- etapas de discovery, estratégia, TDD, implementação, refatoração e validação
- checkpoints, aceite, rollback e definition of done

A adaptação dessas seções pode variar conforme o tipo de sprint, mas sem quebrar a rastreabilidade entre `CURRENT-STATE`, `ROADMAP`, `SPRINTS` e `TASKS`.

## 