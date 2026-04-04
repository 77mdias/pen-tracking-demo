---
title: Sprint 04 - Quality Testing and Release Foundation
type: sprint
mode: sprint
approach: tdd-first
status: planned
---

# Sprint SPRINT-04 — Quality Testing and Release Foundation

## 1. Objetivo

Estabelecer a baseline mínima de qualidade, validação e release do PenFlow77, cobrindo lint, typecheck, smoke tests essenciais, critérios de verificação por rota/hero e uma disciplina explícita de release/rollback adequada ao estado real do projeto.

> Entrega verificável: o projeto passa a ter comandos, checklists e uma estratégia mínima de verificação além de `lint`, incluindo critérios claros para landing/hero/funil, smoke tests essenciais e um rito de release que não dependa apenas de inspeção informal.

---

## 2. Resumo Executivo

- **Tipo da sprint:** infra / quality / test
- **Modo principal do Agent OS:** architecture
- **Fase relacionada:** Fase 04 — Baseline de confiança operacional
- **Status:** Planejada
- **Prioridade:** Alta
- **Owner principal:** agent
- **Dependências externas:** resultados de SPRINT-01; stack real do projeto em Next.js/Bun/OpenNext; aprendizados de SPRINT-02 e SPRINT-03 entram como insumo quando alterarem critérios de validação do hero ou do funil
- **Janela estimada:** 2–4 dias

---

## 3. Contexto

- **Problema atual:** o repositório expõe `lint`, `build`, `preview`, `deploy` e comandos de Cloudflare, mas não possui baseline documentada de testes automatizados nem estratégia de smoke/manual definida para proteger hero, landing e funil.
- **Impacto no sistema/produto:** qualquer mudança relevante na experiência premium, no hero ou nas rotas do funil depende hoje de validação ad hoc, o que aumenta a chance de regressão silenciosa.
- **Riscos envolvidos:** criar uma infraestrutura de testes grande demais para o estágio atual do projeto, ou continuar sem qualquer baseline além de lint; liberar mudanças sem critérios de aceite objetivos.
- **Áreas afetadas:** `package.json`, possível configuração de testes, docs de desenvolvimento, processo de release e validação manual/automatizada das rotas críticas.
- **Fluxos de usuário impactados:** landing principal, hero acima da dobra, `/auth`, `/beta`, `/dashboard`, build e publicação do site.
- **Premissas importantes:** não há script `test` hoje; smoke tests e typecheck podem ser mais valiosos imediatamente do que buscar cobertura completa; a solução precisa respeitar Next.js 16, Bun e a realidade do projeto.
- **Fora de escopo nesta sprint:** criar cobertura exaustiva de toda a UI, montar pipeline corporativo completo, implementar observabilidade pesada ou backend real.

---

## 4. Critérios de Sucesso

- [ ] O projeto passa a ter uma estratégia mínima explícita de validação além de `lint`.
- [ ] Existe disciplina definida para `lint`, `typecheck`, `build` e smoke tests críticos.
- [ ] Landing/hero e o funil `/auth` -> `/beta` -> `/dashboard` possuem critérios de verificação claros.
- [ ] O processo de release inclui checklist, janela de validação e plano de rollback coerentes com o projeto.
- [ ] A nova baseline é proporcional ao estágio atual do PenFlow77 e não inventa maturidade inexistente.

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [ ] Resultados de SPRINT-01 consolidados
- [ ] Lista de fluxos críticos do produto atual definida
- [ ] Decisão mínima sobre ferramental de smoke/typecheck compatível com a stack
- [ ] Aprendizados de SPRINT-02 e SPRINT-03 incorporados apenas quando alterarem critérios de validação do hero ou do funil

### Ordem macro recomendada
1. Discovery da baseline atual de qualidade
2. Definir estratégia mínima de testes e validação
3. Escrever testes/checklists RED
4. Implementar scripts, smoke coverage e documentação de release
5. Refatorar comandos/processo para clareza
6. Validar tudo em ambiente local/preview

### Paralelização possível
- Definição de smoke tests críticos
- Definição de scripts e comandos de validação
- Definição do rito documental de release/rollback

### Caminho crítico
- Decidir a baseline mínima viável
- Implementar comandos confiáveis
- Garantir que landing/hero e funil tenham proteção mínima contra regressão

---

## 6. Etapa 1 — Discovery Técnico

### Objetivo
Entender o que já existe de qualidade/validação e onde estão os maiores riscos de regressão.

### Checklist
- [ ] Revisar scripts atuais em `package.json`
- [ ] Confirmar ausência de `test` e, se aplicável, de `typecheck`
- [ ] Revisar como a landing, hero e rotas secundárias são validadas hoje
- [ ] Identificar quais fluxos críticos merecem smoke coverage primeiro
- [ ] Identificar o menor ferramental compatível com Next.js 16 e Bun
- [ ] Levantar validações manuais já implícitas nas sprints anteriores
- [ ] Levantar pontos de release/rollback ainda não formalizados

### Saída esperada
- Mapa da baseline atual de qualidade
- Lista de scripts ausentes ou insuficientes
- Lista de fluxos críticos para smoke testing
- Proposta de disciplina mínima de release

---

## 7. Etapa 2 — Design de Comportamento e Estratégia de Testes

### Objetivo
Definir a estratégia de verificação mínima que o projeto deve seguir a partir desta sprint.

### Checklist
- [ ] Definir quais comandos passam a ser obrigatórios antes de concluir trabalho relevante
- [ ] Definir quais smoke tests são críticos no estágio atual
- [ ] Definir critérios de validação manual para hero, landing e funil
- [ ] Definir quando build deve ser obrigatório além de lint
- [ ] Definir se typecheck explícito precisa ser adicionado ao projeto
- [ ] Definir onde a estratégia ficará documentada
- [ ] Definir o rito mínimo de release, rollback e homologação

### Casos de teste planejados
- [ ] Cenário 1: uma mudança no hero passa por lint, build e smoke checks essenciais antes de ser considerada pronta.
- [ ] Cenário 2: uma mudança no funil `/auth` -> `/beta` -> `/dashboard` é validada com jornada crítica explícita.
- [ ] Cenário 3: o projeto possui pelo menos um caminho documentado para detectar regressões sem depender de memória do time.
- [ ] Cenário 4: o processo de release exige validação mínima antes de deploy.
- [ ] Edge case 1: quando não houver automação para um fluxo, existe checklist manual explícito e reproduzível.
- [ ] Regressão 1: nenhum trabalho futuro volta a afirmar “só lint” como baseline suficiente por padrão.

### Matriz de testes
| Tipo | Escopo | Obrigatório? | Observações |
|------|--------|--------------|-------------|
| Unitário | utilitários e lógica isolável | Parcial | Introduzir onde houver ROI claro. |
| Integração | composição de rotas/estado/funil | Sim | Priorizar o que protege o fluxo atual. |
| E2E | smoke da landing e do funil | Sim | Mesmo que a cobertura inicial seja pequena. |
| Regressão | hero, CTA, navegação do funil | Sim | Casos críticos do produto atual. |
| Auth/AuthZ | comportamento explícito do fluxo simulado | Parcial | Enquanto auth real não existir, validar honestidade e guardrails. |

---

## 8. Etapa 3 — Testes Primeiro (TDD)

### Objetivo
Criar a nova baseline de validação começando pelos casos que hoje falham por ausência de cobertura.

### Checklist
- [ ] Escrever primeiro os smoke tests ou checklists automatizáveis dos fluxos críticos
- [ ] Registrar a falha atual por ausência de scripts/cobertura
- [ ] Adicionar primeiro o comando de validação mais barato e valioso
- [ ] Definir RED para hero/landing e RED para funil
- [ ] Garantir que qualquer bug corrigido nas sprints anteriores possa virar regressão agora
- [ ] Não inventar cobertura total onde só cabe smoke test inicial

### Testes a implementar primeiro
- [ ] Teste unitário: utilitário ou camada de estado criada em sprints anteriores, se houver ROI.
- [ ] Teste de integração: fluxo mínimo do funil e render/visibilidade básica da landing crítica.
- [ ] Teste de regressão: hero visível, CTA principal, links do funil e acesso às rotas principais.
- [ ] Teste de autorização/autenticação: guardrails para fluxo simulado, se aplicável.
- [ ] Teste de edge case: reduced motion ou fallback crítico do hero, ao menos via checklist manual versionado se ainda não automatizável.
- [ ] Teste de contrato/API: não aplicável enquanto o backend não existir; deixar isso explicitado.

### Evidência RED
- **Comando executado:** scripts atuais do repositório e inspeção da ausência de baseline de testes.
- **Falha esperada observada:** não há `test` nem disciplina explícita de smoke/typecheck como baseline do projeto.
- **Observações:** o RED principal desta sprint é a falta de infraestrutura/processo suficiente para validar mudanças críticas.

---

## 9. Etapa 4 — Implementação

### Objetivo
Introduzir a menor camada de qualidade e release capaz de proteger o projeto real de hoje.

### Checklist
- [ ] Adicionar scripts faltantes de validação, se necessários
- [ ] Introduzir smoke tests críticos ou harness equivalente
- [ ] Formalizar typecheck, se ele ainda não estiver exposto como script
- [ ] Documentar critérios de validação por fluxo
- [ ] Formalizar checklist de release/rollback
- [ ] Garantir compatibilidade com Bun, Next.js 16 e OpenNext
- [ ] Atualizar documentação mínima impactada

### Regras obrigatórias
- Não implantar uma pirâmide de testes desproporcional ao estágio atual do projeto.
- Não fingir cobertura automatizada para fluxos ainda validados manualmente.
- Priorizar primeiro os fluxos críticos: landing/hero e funil.
- Toda nova validação precisa ter comando reproduzível ou checklist versionado.
- Evitar dependências ou ferramentas que compliquem o setup sem ganho claro.
- A disciplina de release deve ser viável para o time realmente usar.

### Mudanças previstas
- **Backend:** nenhuma
- **API:** nenhuma
- **Frontend:** possíveis ajustes para testabilidade de fluxos críticos
- **Banco/Schema:** nenhuma
- **Infra/Config:** scripts de `package.json`, possível ferramenta de smoke/teste e processo de release
- **Docs:** atualização de `docs/development/` com baseline de qualidade e release

---

## 10. Etapa 5 — Refatoração

### Objetivo
Limpar scripts, simplificar a estratégia e deixar a baseline de qualidade sustentável.

### Checklist
- [ ] Remover scripts redundantes ou pouco claros
- [ ] Melhorar naming dos comandos de validação
- [ ] Centralizar critérios de release e rollback
- [ ] Revisar cobertura inicial para focar no que realmente protege o produto
- [ ] Garantir que documentação e scripts conversem entre si
- [ ] Reexecutar validações após simplificações

### Saída esperada
- Baseline de qualidade simples e reutilizável
- Menos ambiguidade sobre o que validar antes de concluir uma mudança
- Melhor previsibilidade de release

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [ ] Executar lint
- [ ] Executar typecheck, se adicionado
- [ ] Executar build
- [ ] Executar smoke tests críticos
- [ ] Executar checklist manual de hero/landing
- [ ] Executar checklist manual do funil `/auth` -> `/beta` -> `/dashboard`

### Comandos finais
```bash
bun run lint
# executar `bun run typecheck` apenas se esta sprint adicionar esse script
bun run build
# executar `bun run test` apenas se esta sprint introduzir a baseline de smoke/testes automatizados
```

### Rollout
- **Estratégia de deploy:** adotar a nova baseline como pré-condição para releases relevantes do frontend.
- **Uso de feature flag:** não obrigatório; foco em disciplina de validação e rollback.
- **Plano de monitoramento pós-release:** validar preview/produção imediatamente após deploy com smoke manual dos fluxos críticos.
- **Métricas a observar:** redução de regressões visuais/navegacionais, previsibilidade de validação, uso consistente dos novos scripts.
- **Alertas esperados:** scripts instáveis, smoke tests frágeis, build quebrando ou processo tão pesado que o time deixe de usar.

### Responsáveis
- **Backend:** não aplicável
- **Frontend:** owner do projeto / agent
- **QA:** QA manual + baseline automatizada
- **Produto:** owner do roadmap e aceite da experiência
- **Release/Deploy:** maintainer do projeto

### Janela de deploy
- **Horário recomendado:** junto de uma janela com disponibilidade para smoke manual após publicação
- **Tempo de monitoramento:** 30–60 minutos após deploy/preview

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
| Baseline atual | agent | Pendente | Confirmar ausência de scripts/testes suficientes |
| Nova disciplina | agent | Pendente | Definir comandos e smoke checks mínimos |
| Fechamento | agent + owner | Pendente | Garantir que a baseline seja viável de manter |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
| Lint + typecheck + build | comandos críticos executam de forma previsível | saída dos comandos | Pendente |
| Hero/landing protegidos | smoke/manual checks existem e são reproduzíveis | docs + execução | Pendente |
| Funil protegido | jornada crítica possui validação mínima | docs + execução | Pendente |
| Release disciplinado | checklist de release/rollback está documentado | docs atualizados | Pendente |
| Baseline proporcional | solução cabe no estágio atual do projeto | revisão técnica | Pendente |

---

## 14. Plano de Rollback

### Gatilhos
- Nova infraestrutura de testes quebra o fluxo de desenvolvimento
- Scripts adicionados ficam instáveis ou inconsistentes
- Baseline criada é pesada demais para manutenção real
- Release discipline adiciona ruído sem valor verificável
- Smoke tests falsos positivos/falsos negativos tornam a camada não confiável

### Passos
1. Reverter scripts e tooling adicionados
2. Restaurar `package.json` e docs para a baseline anterior
3. Confirmar que lint/build continuam operacionais
4. Registrar qual parte da estratégia foi inviável
5. Reintroduzir a baseline em escopo menor, se necessário

### Responsáveis
- **Execução técnica:** maintainer / agent
- **Revalidação:** owner técnico
- **Comunicação:** responsável pela release

### RTO
- Até 45 minutos

---

## 15. Critérios de Aceite

- [ ] O projeto tem baseline mínima de validação além de lint
- [ ] Os fluxos críticos atuais possuem smoke coverage ou checklist reproduzível
- [ ] O processo de release e rollback está documentado
- [ ] A solução é compatível com a stack real do projeto
- [ ] Checklist manual executado
- [ ] Rollback definido
- [ ] Documentação mínima atualizada
- [ ] Critérios de sucesso da sprint foram atingidos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [ ] `lint`, `typecheck` e `build` tiverem papel claro na rotina de validação
- [ ] Houver smoke coverage ou equivalente para os fluxos críticos atuais
- [ ] A release discipline estiver documentada e utilizável
- [ ] A baseline puder ser repetida por outro colaborador sem conhecimento tácito
- [ ] Não houver dependência de backend inexistente para validar o que já existe hoje

---

## 17. Instrução padrão para AGENTS.md

```text
When improving quality and release discipline in PenFlow77, prefer a minimal, durable validation baseline over an ambitious but fragile test stack.

Mandatory rules:
- lint alone is not enough for critical frontend changes
- define explicit validation for the landing hero and the beta funnel
- document manual checks honestly when automation is not yet available
- make release and rollback steps reproducible
- keep the quality baseline compatible with the real project stage and toolchain
```
