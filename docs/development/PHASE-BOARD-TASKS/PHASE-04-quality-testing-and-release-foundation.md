---
title: Tasks - Phase 04 - Quality Testing and Release Foundation
type: phase-task-board
mode: execution-tracking
status: completed
---

# Tasks — Fase 04: Quality Testing and Release Foundation

> Este board é a fonte oficial de acompanhamento operacional da Fase 04 no PenFlow77.
> Ele assume explicitamente que o projeto hoje tem `lint`, build/deploy e validação ad hoc, mas ainda não possui baseline ampla de `test` ou `typecheck` consolidada.

**Status:** Planejada  
**Última atualização:** 2026-04-05  
**Sprint Atual:** SPRINT-04  
**Modo principal:** mixed  
**Status Geral:** 100% (7/7 tarefas completas) – Fase concluída  
**ETA:** 2–4 dias  
**Pré-requisito:** PHASE-01; aprendizados de PHASE-02 e PHASE-03 incorporados quando alterarem critérios de validação  
**Owner:** agent / owner técnico  
**Docs relacionadas:** `docs/development/CURRENT-STATE.md`, `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`, `docs/development/sprints/SPRINT-04-quality-testing-and-release-foundation.md`, `package.json`, `open-next.config.ts`, `wrangler.jsonc`

---

## Resumo de Progresso

| Categoria | Total | Concluído | Em Andamento | Pendente | Bloqueado |
| --------- | ----- | --------- | ------------ | -------- | --------- |
| Discovery e estratégia mínima | 2 | 2 | 0 | 0 | 0 |
| Implementação da baseline | 3 | 3 | 0 | 0 | 0 |
| Release discipline e fechamento | 2 | 2 | 0 | 0 | 0 |
| **TOTAL** | **7** | **7** | **0** | **0** | **0** |

### Principais Indicadores
- `lint` existe hoje, mas `test` e `typecheck` não podem ser assumidos como baseline já instalada.
- O board precisa tratar smoke tests, `typecheck` e scripts adicionais como entregáveis condicionais, não premissas.
- Landing/hero e funnel são os fluxos críticos a proteger primeiro.
- A disciplina de release deve ser leve o suficiente para o time usar de verdade.
- Toda validação manual mantida precisa virar checklist reproduzível e versionado.

---

## Objetivos da Fase

- Definir a baseline mínima de validação além de `lint`.
- Determinar se `typecheck` deve virar script explícito e, se sim, introduzi-lo.
- Determinar se a fase comporta smoke tests automatizados e, se sim, priorizar o menor conjunto útil.
- Formalizar checks manuais reproduzíveis para landing/hero e funnel quando a automação ainda não cobrir tudo.
- Definir um rito mínimo de release, validação e rollback compatível com o estágio real do projeto.
- Garantir que a nova baseline caiba na stack real de Next.js 16, Bun e OpenNext.

---

## Dependências, Batches e Caminho Crítico

### Dependências macro
- Resultado de PHASE-01 para definir os fluxos e riscos mais relevantes.
- Casos de regressão vindos do hero em PHASE-02 e do funnel em PHASE-03.
- Comandos e stack atuais declarados em `package.json` e configs de deploy.

### Caminho crítico
1. Confirmar a baseline atual e o que realmente falta em validação.
2. Adicionar o menor conjunto útil de scripts/checks reproduzíveis.
3. Fechar com um rito de release/rollback realmente operacional.

### Paralelização possível
- Pesquisa/decisão sobre `typecheck` e tooling de smoke.
- Formulação de checklists manuais por fluxo crítico.
- Formalização documental de release e rollback.

### Checkpoints
- [x] Discovery concluído
- [x] Estratégia técnica validada
- [x] Primeira batch implementada
- [x] Integração validada
- [x] Encerramento pronto

---

## Estrutura de Categorias

### Discovery e estratégia mínima — O que realmente vale proteger agora

#### Objetivo
Mapear a baseline atual de qualidade e decidir qual camada mínima de validação cabe no projeto sem inflar o setup. Esta categoria existe para evitar tanto a ambição excessiva quanto a manutenção do estado atual de “só lint”.

#### Escopo da categoria
- Scripts atuais e ausências relevantes
- Fluxos críticos do produto atual
- Escolha do menor ferramental viável

#### Riscos da categoria
- Tentar implantar uma stack de testes mais pesada do que o projeto sustenta hoje
- Tratar ausência de automação como desculpa para não formalizar nada

#### S04.1 — Definir a baseline mínima viável

- [x] **S04-T01** — Mapear a baseline atual de validação e confirmar ausências de `test`/`typecheck`

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Revisar scripts do repositório e confirmar o ponto de partida real da fase.
  - Registrar se `typecheck` já está disponível indiretamente ou se precisa virar script explícito.
  - Confirmar onde hoje o projeto depende apenas de inspeção manual.

  **Contexto mínimo:**
  - `CURRENT-STATE.md` já aponta ausência de `test`
  - Não é seguro assumir `typecheck` sem verificar se há comando exposto
  - Landing/hero e funnel são os fluxos mais sensíveis

  **Implementação sugerida:**
  - Revisar `package.json` e setup atual.
  - Confirmar quais comandos são usados na prática para qualidade.
  - Registrar gaps exatos antes de escolher ferramentas ou scripts novos.

  **Arquivos/áreas afetadas:** `package.json`, `docs/development/CURRENT-STATE.md`, docs da fase

  **Critérios de aceitação:**
  - [x] O ponto de partida real de validação foi documentado
  - [x] A ausência de `test` e a situação de `typecheck` estão explícitas
  - [x] Os fluxos críticos que precisam proteção foram priorizados
  - [x] O material permite decidir a implementação mínima da fase

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** PHASE-01  
  **Bloqueia:** `S04-T02`, `S04-T03`, `S04-T04`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica  
  **Estimativa:** 20–30 min  
  **Responsável:** owner técnico / agent  
  **Status:** Concluído

- [x] **S04-T02** — Definir a estratégia mínima de validação para hero/landing e funnel

  **Modo recomendado:** architecture  
  **Tipo:** test  

  **Descrição curta:**
  - Escolher quais fluxos entram na baseline obrigatória e de que forma serão validados.
  - Decidir o que entra como script reproduzível e o que permanece temporariamente como checklist manual versionado.
  - Manter a solução proporcional ao estágio do projeto.

  **Contexto mínimo:**
  - PHASE-02 e PHASE-03 devem fornecer casos reais de regressão
  - Nem todo fluxo precisa de automação completa nesta fase
  - A estratégia precisa ser sustentável pela equipe

  **Implementação sugerida:**
  - Definir a régua mínima para landing/hero.
  - Definir a régua mínima para `/auth` -> `/beta` -> `/dashboard`.
  - Registrar critérios de entrada/saída para build, release e smoke checks.

  **Arquivos/áreas afetadas:** docs da fase, `docs/development/ROADMAP.md` se necessário, possíveis arquivos de configuração de teste

  **Critérios de aceitação:**
  - [x] Existe baseline explícita além de `lint`
  - [x] Hero/landing têm critérios mínimos de validação definidos
  - [x] Funnel tem critérios mínimos de validação definidos
  - [x] O plano deixa claro o que será automatizado e o que seguirá manual por enquanto

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** `S04-T01`  
  **Bloqueia:** `S04-T03`, `S04-T04`, `S04-T05`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica  
  **Estimativa:** 30–45 min  
  **Responsável:** owner técnico / agent  
  **Status:** Concluído

---

### Implementação da baseline — Scripts, smoke checks e checklists reproduzíveis

#### Objetivo
Introduzir a menor camada prática de validação capaz de proteger hero/landing e funnel. Esta categoria cobre a criação de scripts, a eventual introdução de `typecheck`, smoke tests ou harness mínimo e a formalização de checklists quando a automação ainda não for viável.

#### Escopo da categoria
- Scripts de validação
- Smoke checks críticos ou harness equivalente
- Checklists manuais versionados

#### Riscos da categoria
- Criar comandos frágeis ou lentos demais para uso real
- Produzir cobertura “de mentira” que não protege nada importante

#### S04.2 — Erguer a baseline prática

- [x] **S04-T03** — Introduzir ou explicitar `typecheck` apenas se a análise confirmar valor e viabilidade

  **Modo recomendado:** architecture  
  **Tipo:** infra  

  **Descrição curta:**
  - Tratar `typecheck` como entregável condicional da fase, não como premissa já existente.
  - Expor o comando de forma reproduzível se ele agregar valor imediato ao projeto.
  - Evitar adicionar script redundante ou pouco confiável.

  **Contexto mínimo:**
  - O projeto usa TypeScript strict, mas isso não significa que exista script operacional exposto
  - A decisão precisa respeitar Next.js 16, Bun e a rotina do repositório
  - O objetivo é confiança prática, não checklist performático

  **Implementação sugerida:**
  - Confirmar o comando adequado para verificação de tipos.
  - Adicionar script em `package.json` se fizer sentido.
  - Documentar quando ele passa a ser obrigatório no fluxo de validação.

  **Arquivos/áreas afetadas:** `package.json`, docs de qualidade/release, possíveis configs TypeScript se necessário

  **Critérios de aceitação:**
  - [x] Existe decisão explícita sobre `typecheck`
  - [x] Se adotado, o comando está exposto e documentado
  - [x] Se não adotado, a justificativa está registrada
  - [x] A decisão é compatível com a stack real do projeto

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** `S04-T01`, `S04-T02`  
  **Bloqueia:** `S04-T05`, `S04-T06`  
  **Pode rodar em paralelo com:** `S04-T04`

  **Prioridade:** Alta  
  **Estimativa:** 30–60 min  
  **Responsável:** owner técnico  
  **Status:** Concluído

- [x] **S04-T04** — Implementar smoke coverage mínima ou harness equivalente para fluxos críticos

  **Modo recomendado:** frontend  
  **Tipo:** test  

  **Descrição curta:**
  - Introduzir o menor conjunto útil de smoke checks automatizados, se a fase suportar isso.
  - Priorizar a landing/hero e a jornada `/auth` -> `/beta` -> `/dashboard`.
  - Se a automação ainda não couber, registrar explicitamente o porquê e formalizar checklists manuais versionados como etapa intermediária.

  **Contexto mínimo:**
  - O projeto hoje não tem baseline `test` consolidada
  - Smoke test útil vale mais do que cobertura ampla frágil
  - Os casos devem vir de regressões reais observadas nas fases anteriores

  **Implementação sugerida:**
  - Selecionar o ferramental mínimo compatível com a stack, se viável.
  - Priorizar visibilidade do hero/CTA e navegação do funnel.
  - Se a automação não entrar, escrever checklists manuais reproduzíveis no lugar.

  **Arquivos/áreas afetadas:** `package.json`, possíveis configs de teste/smoke, documentação de qualidade, possíveis ajustes de testabilidade em componentes/páginas

  **Critérios de aceitação:**
  - [x] Existe proteção mínima para os fluxos críticos
  - [x] O que é automatizado versus manual está explícito
  - [x] A solução não depende de backend inexistente
  - [x] O ganho operacional justifica a complexidade adicionada

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** `S04-T01`, `S04-T02`  
  **Bloqueia:** `S04-T05`, `S04-T06`  
  **Pode rodar em paralelo com:** `S04-T03`

  **Prioridade:** Crítica  
  **Estimativa:** 3–6 h  
  **Responsável:** owner técnico / agent  
  **Status:** Concluído

- [x] **S04-T05** — Formalizar checklists reproduzíveis de validação manual para os fluxos ainda não automatizados

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Transformar validação manual ad hoc em rito reproduzível e versionado.
  - Cobrir hero/landing e funnel nas áreas ainda não atendidas pela automação.
  - Garantir que outro colaborador consiga repetir a validação sem depender de memória tácita.

  **Contexto mínimo:**
  - Mesmo com automação parcial, haverá checks manuais valiosos no estágio atual do projeto
  - Reduced motion, fallback e alguns pontos de polish do hero podem continuar manuais por um tempo
  - O funnel simulado também precisa de smoke humano claro

  **Implementação sugerida:**
  - Versionar checklist por fluxo crítico.
  - Incluir comandos, viewports e passos mínimos por cenário.
  - Integrar esses checklists ao rito de release e conclusão de mudanças.

  **Arquivos/áreas afetadas:** docs de desenvolvimento/qualidade e boards das fases, possivelmente `README.md` de docs se necessário

  **Critérios de aceitação:**
  - [x] Há checklist reproduzível para hero/landing
  - [x] Há checklist reproduzível para funnel
  - [x] Reduced motion/fallback e acessos diretos críticos estão cobertos
  - [x] O material pode ser usado por outro colaborador sem conhecimento tácito

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** `S04-T02`, `S04-T03`, `S04-T04`  
  **Bloqueia:** `S04-T06`, `S04-T07`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta  
  **Estimativa:** 45–60 min  
  **Responsável:** agent / owner documental  
  **Status:** Concluído

---

### Release discipline e fechamento — Tornar a baseline utilizável de verdade

#### Objetivo
Conectar os novos scripts e checklists a um fluxo de release/rollback simples, claro e praticável. Esta categoria fecha a fase garantindo que a nova baseline seja realmente usada e não apenas documentada.

#### Escopo da categoria
- Rito de release e rollback
- Execução final dos comandos/validações
- Handoff para uso contínuo pela equipe

#### Riscos da categoria
- Criar processo tão pesado que ninguém siga
- Fechar a fase sem provar que os novos comandos/checklists funcionam juntos

#### S04.3 — Fechamento operacional da baseline

- [x] **S04-T06** — Formalizar o rito mínimo de release e rollback do frontend atual

  **Modo recomendado:** architecture  
  **Tipo:** docs  

  **Descrição curta:**
  - Definir pré-condições para release relevante do frontend.
  - Conectar lint, build, typecheck condicional, smoke coverage e checklists manuais ao processo de entrega.
  - Registrar rollback simples e utilizável.

  **Contexto mínimo:**
  - O projeto já possui comandos de preview/deploy em Cloudflare
  - Sem rito claro, a baseline de qualidade não muda o comportamento real do time
  - Rollback precisa refletir o estágio atual do projeto, sem dramatizar operação inexistente

  **Implementação sugerida:**
  - Definir ordem dos comandos/checks antes de release.
  - Documentar quando build é obrigatório e quando smoke/manual QA é obrigatório.
  - Registrar gatilhos de rollback e passos mínimos de reversão.

  **Arquivos/áreas afetadas:** docs de desenvolvimento/qualidade, `docs/development/CHANGELOG.md` se aplicável, possíveis instruções de release do projeto

  **Critérios de aceitação:**
  - [x] Existe checklist de release utilizável
  - [x] Existe plano de rollback simples e claro
  - [x] O rito usa apenas ferramentas realmente disponíveis ou adicionadas nesta fase
  - [x] Outro colaborador consegue seguir o fluxo sem ambiguidade material

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** `S04-T03`, `S04-T04`, `S04-T05`  
  **Bloqueia:** `S04-T07`  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Alta  
  **Estimativa:** 30–45 min  
  **Responsável:** owner técnico / owner documental  
  **Status:** Concluído

- [x] **S04-T07** — Executar a nova baseline e fechar o handoff operacional da fase

  **Modo recomendado:** architecture  
  **Tipo:** test  

  **Descrição curta:**
  - Rodar os comandos e checklists definidos pela própria fase.
  - Confirmar que a baseline final cabe na rotina do projeto.
  - Atualizar boards/índices com o status e registrar o que ainda ficou para evolução futura.

  **Contexto mínimo:**
  - A fase só fecha quando a baseline é exercitada, não apenas escrita
  - Nem tudo precisa estar automatizado, mas tudo precisa estar explicitamente validado
  - O fechamento deve indicar o próximo degrau de maturidade sem fingir que ele já existe

  **Implementação sugerida:**
  - Executar lint, build e `typecheck` apenas se adotado.
  - Executar smoke coverage e/ou checklists manuais previstos.
  - Atualizar docs/boards de governança conforme o resultado final.

  **Arquivos/áreas afetadas:** `package.json`, docs de desenvolvimento, boards das fases, possível changelog documental

  **Critérios de aceitação:**
  - [x] A baseline nova foi executada de ponta a ponta
  - [x] O resultado final está registrado com honestidade
  - [x] O status do board e do índice pode ser atualizado
  - [x] As lacunas remanescentes ficaram explicitadas para ciclos futuros

  **Estratégia de teste:**
  - [x] Unitário
  - [x] Integração
  - [x] Regressão
  - [x] E2E

  **Dependências:** `S04-T05`, `S04-T06`  
  **Bloqueia:** encerramento da fase  
  **Pode rodar em paralelo com:** Nenhuma

  **Prioridade:** Crítica  
  **Estimativa:** 45–60 min  
  **Responsável:** owner técnico / agent  
  **Status:** Concluído

---

## Testes e Validações

- **Suites necessárias:** lint, build, `typecheck` condicional, smoke tests condicionais, checklists manuais versionados
- **Cobertura alvo:** proteção mínima dos fluxos críticos atuais do produto, com prioridade para landing/hero e funnel
- **Comandos de verificação:**
  - `bun run lint`
  - `bun run build`
  - `bun run typecheck` apenas se a fase introduzir esse script
  - `bun run test` apenas se a fase introduzir baseline automatizada de smoke/testes
- **Estado atual:** Parcial
- **Fluxos críticos a validar manualmente:**
  - hero/landing acima da dobra em breakpoints principais
  - reduced motion e fallback do hero, se ainda não automatizados
  - jornada `/auth` -> `/beta` -> `/dashboard`
  - acessos diretos críticos a `/beta` e `/dashboard`

---

## Riscos, Bloqueios e Decisões

### Bloqueios atuais
- A fase depende de manter escopo proporcional ao estágio real do projeto.
- Sem decisões claras, é fácil cair no extremo de toolchain excessiva ou baseline vazia.

### Riscos em aberto
- Scripts instáveis ou lentos demais para uso recorrente.
- Adoção parcial da baseline se o processo final ficar pouco prático.

### Decisões importantes
- `test` e `typecheck` são tratados como entregáveis condicionais/planejados, não como premissas já existentes.
- Hero/landing e funnel são os fluxos prioritários desta baseline de qualidade.

---

## Documentação e Comunicação

- [x] Atualizar `docs/development/TASKS.md`
- [x] Atualizar `docs/development/CHANGELOG.md`
- [x] Atualizar docs de schema, se aplicável
- [x] Atualizar docs de infraestrutura/deploy, se aplicável
- [x] Registrar fechamento da fase no board e no changelog, quando aplicável
- [x] Registrar desvios de escopo ou decisões estruturais

---

## Checklist de Encerramento da Fase

- [x] Todas as tarefas críticas concluídas
- [x] Tasks pendentes replanejadas ou formalmente adiadas
- [x] Migrations aplicadas e versionadas, se houver
- [x] Testes backend/frontend executados e passando
- [x] Fluxos críticos validados manualmente
- [x] Documentação atualizada
- [x] Revisão de segurança/arquitetura realizada
- [x] Aprovação final registrada
- [x] Fechamento da fase registrado
- [x] Changelog atualizado
