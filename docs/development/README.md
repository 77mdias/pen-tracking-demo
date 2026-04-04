# Development Docs Hub

Este diretório concentra a documentação operacional do projeto. O objetivo aqui não é repetir os specs de produto, e sim registrar o que existe hoje, o que mudou e o que deve acontecer depois.

## Como ler esta pasta

### CURRENT-STATE
Arquivo: `docs/development/CURRENT-STATE.md`

Use este documento para responder:
- o que está realmente implementado
- o que está parcial
- o que é placeholder
- o que ainda é apenas planejado
- onde os specs divergem do código atual

Regra: `CURRENT-STATE` é factual. Não use este arquivo para prometer entregas futuras.

### ROADMAP
Arquivo: `docs/development/ROADMAP.md`

Use este documento para organizar o próximo trabalho em três horizontes:
- `Now` — prioridades imediatas
- `Next` — trabalho logo após estabilizar o agora
- `Later` — itens relevantes, mas não imediatos

Regra: `ROADMAP` só fala de futuro. Não misture entregas concluídas aqui.

### CHANGELOG
Arquivo: `docs/development/CHANGELOG.md`
Pasta: `docs/development/changelog/`

Use o changelog para registrar baselines e mudanças relevantes ao longo do tempo.

Regra: changelog é histórico. Não use como backlog, plano ou status board.

## Documentos que existem nesta baseline

- `docs/development/CURRENT-STATE.md`
- `docs/development/ROADMAP.md`
- `docs/development/CHANGELOG.md`
- `docs/development/SPRINTS.md`
- `docs/development/TASKS.md`
- `docs/development/changelog/README.md`
- `docs/development/changelog/2026-04-baseline.md`
- `docs/development/sprints/`
- `docs/development/tasks/`

## Documentos de governança contínua

Os conceitos abaixo estruturam a execução recorrente do projeto:

- `SPRINTS` — agora existe como índice mestre em `docs/development/SPRINTS.md` e como documentos detalhados em `docs/development/sprints/`
- `TASKS` — agora existe como índice mestre em `docs/development/TASKS.md` e como boards operacionais detalhados em `docs/development/tasks/`

Regra editorial:
- `SPRINTS` deve derivar do `ROADMAP` e da leitura factual do `CURRENT-STATE`
- `TASKS` deve derivar das sprints e nunca substituir o `CURRENT-STATE`
- `docs/development/SPRINTS.md` é a fonte canônica da convenção de sprints desta camada
- `docs/development/TASKS.md` é a fonte canônica da convenção de phase boards desta camada
- boards em `docs/development/tasks/` devem seguir essa convenção interna, sempre adaptada ao estado real do PenFlow77

## Relação com os specs do projeto

Os arquivos de spec na raiz continuam sendo referência de intenção:

- `AGENTS.md`
- `PRD_production.md`
- `TECH_SPEC_production.md`
- `UI_SPEC_production.md`
- `HERO_SPEC_smart_pen.md`
- `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`
- `HERO_IMPLEMENTATION_PLAYBOOK.md`

Mas a leitura correta é:
- specs descrevem direção desejada
- `CURRENT-STATE.md` descreve a realidade implementada
- `ROADMAP.md` conecta a realidade ao próximo ciclo
- `CHANGELOG` preserva o histórico

## Regra editorial desta pasta

1. Não inventar features implementadas.
2. Não chamar placeholder de feature pronta.
3. Sempre diferenciar código existente de intenção de produto.
4. Preferir linguagem operacional e verificável.
5. Quando uma referência em `path:line` fortalecer a análise, incluí-la.
