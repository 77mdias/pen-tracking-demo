# Changelog Policy

## Objetivo

O changelog em `docs/development/changelog/` registra baselines e mudanças relevantes do projeto e da documentação operacional.

## O que entra aqui

Entradas de changelog devem registrar fatos já ocorridos, por exemplo:
- criação de uma baseline documental
- mudança importante de escopo implementado
- reorganização relevante de rotas ou arquitetura
- atualização material de stack, build ou deploy
- alinhamento ou mudança deliberada entre spec e implementação

## O que não entra aqui

Não use o changelog para:
- backlog
- ideias futuras
- tarefas abertas
- promessas de entrega
- brainstorm de produto

Esses temas pertencem ao `ROADMAP`, a `docs/development/SPRINTS.md` e a `docs/development/TASKS.md`.

## Formato recomendado

- Um arquivo por período ou marco importante
- Nome sugerido: `YYYY-MM-<tema>.md`
- Linguagem factual e curta
- Separar claramente:
  - contexto
  - mudanças registradas
  - implicações operacionais

## Regras editoriais

1. Seja específico.
2. Não reescreva o roadmap.
3. Não trate intenção como fato.
4. Se a mudança alterar a leitura do projeto, atualize também `CURRENT-STATE.md` e, se necessário, `ROADMAP.md`.
