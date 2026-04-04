---
title: Sprint 01 - Spec vs Implementation Audit
type: sprint
mode: sprint
approach: tdd-first-adapted-for-audit
status: planned
---

# Sprint SPRINT-01 — Spec vs Implementation Audit

## 1. Objetivo

Produzir uma auditoria verificável entre os specs do PenFlow77 e a implementação viva, resultando em uma lista priorizada de divergências, decisões necessárias e ações recomendadas para que o time saiba o que deve ser alinhado no código e o que deve ser alinhado na documentação.

> Entrega verificável: existe um artefato canônico de auditoria em `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md` que identifica gaps reais em design tokens, tipografia, motion/scroll do hero, placeholders das rotas secundárias, stack instalada versus spec e naming operacional de deploy, com classificação clara entre “corrigir no código”, “corrigir no spec” e “adiar conscientemente”.

---

## 2. Resumo Executivo

- **Tipo da sprint:** mixed
- **Modo principal do Agent OS:** architecture
- **Fase relacionada:** Fase 01 — Auditoria e alinhamento de verdade do produto
- **Status:** Planejada
- **Prioridade:** Alta
- **Owner principal:** agent
- **Dependências externas:** `AGENTS.md`, `HERO_SPEC_smart_pen.md`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`, `PRD_production.md`, `TECH_SPEC_production.md`, código atual do frontend
- **Janela estimada:** 1–2 dias

---

## 3. Contexto

- **Problema atual:** parte dos specs descreve uma intenção que não coincide integralmente com a aplicação atual; outra parte já está desatualizada porque a stack do hero avançou além do que o documento diz.
- **Impacto no sistema/produto:** sem auditoria formal, as próximas implementações podem perseguir correções erradas, manter divergências silenciosas ou tratar docs aspiracionais como contrato de implementação atual.
- **Riscos envolvidos:** mexer em UI, hero ou deploy sem distinguir problema real de problema documental; abrir frentes de trabalho sem priorização; perder o valor já entregue na landing.
- **Áreas afetadas:** hero, `globals.css`, docs de produto/técnicos, rotas `/auth`, `/beta`, `/dashboard`, naming de Cloudflare/OpenNext.
- **Fluxos de usuário impactados:** experiência da landing, leitura do design system, navegação do hero, percepção de consistência da marca e entendimento do funil de produto.
- **Premissas importantes:** a home está implementada; o hero é a parte mais sofisticada e sensível; as rotas secundárias são placeholders; backend real não está presente neste repositório.
- **Fora de escopo nesta sprint:** corrigir todas as divergências no mesmo ciclo, implementar backend, transformar placeholders em produto final.

---

## 4. Critérios de Sucesso

- [ ] Existe uma lista priorizada de divergências reais entre spec e implementação.
- [ ] Cada divergência está classificada como ajuste no código, ajuste no spec ou decisão pendente.
- [ ] O hero tem um diagnóstico específico sobre tokens, tipografia, scroll, reduced motion, fallback e mobile.
- [ ] O escopo funcional de `/auth`, `/beta` e `/dashboard` está documentado como placeholder, não como feature pronta.
- [ ] O naming de deploy entre `penflow77` e `pen-tracking-demo` foi explicitado como decisão operacional a tomar.

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [ ] `CURRENT-STATE.md` atualizado
- [ ] `ROADMAP.md` atualizado
- [ ] Índice mestre de sprints criado
- [ ] Acesso aos docs-raiz e arquivos-chave do frontend

### Ordem macro recomendada
1. Levantar divergências factuais já conhecidas
2. Reinspecionar código e specs críticos
3. Consolidar divergências por tema
4. Classificar cada gap por decisão necessária
5. Publicar `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`
6. Alimentar SPRINT-02, SPRINT-03 e SPRINT-04

### Paralelização possível
- Auditoria de design system e tipografia
- Auditoria de hero motion/scroll/fallback
- Auditoria de rotas placeholder, stack e deploy naming

### Caminho crítico
- Confirmar divergências reais com evidência
- Priorizar o que é bloqueador das próximas sprints
- Registrar decisões sem inflar escopo de implementação

---

## 6. Etapa 1 — Discovery Técnico

### Objetivo
Mapear, com evidência, onde os specs e o código se alinham, divergem ou envelheceram.

### Checklist
- [ ] Revisar `AGENTS.md` para design system e stack declarada
- [ ] Revisar `HERO_SPEC_smart_pen.md` e `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md` nos pontos de motion, scroll e fallback
- [ ] Revisar `PRD_production.md` e `TECH_SPEC_production.md` para escopo funcional aspiracional
- [ ] Revisar `src/app/globals.css` para tokens e tipografia reais
- [ ] Revisar `HeroSection` e hooks relacionados para política de scroll e fallback
- [ ] Revisar `package.json`, `open-next.config.ts` e `wrangler.jsonc` para stack e naming operacional
- [ ] Revisar `/auth`, `/beta` e `/dashboard` para confirmar status de placeholder

### Saída esperada
- Inventário de divergências com fonte documental e evidência de código
- Classificação de severidade por impacto no produto
- Insumos objetivos para as próximas sprints
- Lista de decisões pendentes

---

## 7. Etapa 2 — Design de Comportamento e Estratégia de Testes

### Objetivo
Traduzir a auditoria em comportamento esperado e critérios verificáveis de alinhamento futuro.

### Checklist
- [ ] Definir o que significa “alinhado” para docs versus código
- [ ] Definir critérios de severidade para divergências
- [ ] Definir estratégia de validação documental e operacional
- [ ] Listar cenários onde o spec deve mudar e não o código
- [ ] Listar cenários onde o código deve mudar e não o spec
- [ ] Definir quais gaps bloqueiam SPRINT-02 e SPRINT-03
- [ ] Confirmar evidências mínimas exigidas em cada conclusão da auditoria

### Casos de teste planejados
- [ ] Cenário 1: background base e tipografia são classificados como divergências de design system, não como bugs arbitrários.
- [ ] Cenário 2: uso de `useScrollHijack` e `useSnapScroll` é documentado como hipótese de desalinhamento com a diretriz de evitar hijacking forte.
- [ ] Cenário 3: dependências GSAP/R3F instaladas são classificadas como desatualização do spec, não como lacuna do código.
- [ ] Cenário 4: `/auth`, `/beta` e `/dashboard` são classificados como superfícies visuais sem comportamento funcional real.
- [ ] Edge case 1: a auditoria distingue naming de deploy de bug de experiência do usuário, mas o mantém visível por impacto operacional e de marca.
- [ ] Regressão 1: nenhuma decisão de auditoria faz o time reinterpretar placeholders como fluxo funcional implementado.

### Matriz de testes
| Tipo | Escopo | Obrigatório? | Observações |
|------|--------|--------------|-------------|
| Unitário | N/A | Não | Sprint de auditoria, sem automação dedicada. |
| Integração | Cruzamento doc-código | Sim | Revisão manual baseada em evidência `path:line`. |
| E2E | N/A | Não | Pode haver inspeção manual da UI, mas a saída principal é documental. |
| Regressão | Leitura factual do projeto | Sim | Não deixar a auditoria apagar a separação entre demo e produto real. |
| Auth/AuthZ | Fluxos descritos vs inexistentes | Sim | Validação documental de ausência de auth real. |

---

## 8. Etapa 3 — Testes Primeiro (TDD)

### Objetivo
Definir a régua de evidência antes de concluir qualquer gap como fato.

### Checklist
- [ ] Definir um checklist de prova por divergência
- [ ] Exigir ao menos uma fonte documental e uma fonte de implementação para cada gap crítico
- [ ] Definir classificação de status: alinhado, divergente, desatualizado, indeterminado
- [ ] Definir prova mínima para rotas placeholder
- [ ] Definir prova mínima para naming e stack de deploy
- [ ] Reservar automação futura para SPRINT-04, sem fingir cobertura existente

### Testes a implementar primeiro
- [ ] Teste unitário: não aplicável nesta sprint.
- [ ] Teste de integração: revisão cruzada entre spec e código por tema auditado.
- [ ] Teste de regressão: conferir que já existem referências suficientes em `CURRENT-STATE.md` para sustentar a auditoria.
- [ ] Teste de autorização/autenticação: comprovar que não há autenticação funcional nas rotas de placeholder.
- [ ] Teste de edge case: identificar divergências onde o código está mais avançado que o spec.
- [ ] Teste de contrato/API: confirmar que endpoints descritos no TECH_SPEC não têm implementação evidenciada neste snapshot.

### Evidência RED
- **Comando executado:** leitura de docs-base e arquivos-chave do frontend.
- **Falha esperada observada:** ausência de um documento consolidado de auditoria spec vs implementação antes desta sprint.
- **Observações:** o RED aqui é a lacuna de governança e decisão, não falha de suíte automatizada.

---

## 9. Etapa 4 — Implementação

### Objetivo
Registrar a auditoria de forma operacional, acionável e priorizada.

### Checklist
- [ ] Consolidar divergências no artefato canônico `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md`
- [ ] Separar gaps por categoria: design system, hero UX, placeholders, stack/spec e deploy naming
- [ ] Priorizar divergências por impacto
- [ ] Apontar consequência prática de cada divergência
- [ ] Indicar qual sprint absorve cada correção posterior
- [ ] Atualizar documentação mínima impactada, se necessário
- [ ] Manter a análise específica ao PenFlow77

### Regras obrigatórias
- Não inventar backend, auth, queue persistida ou dashboard funcional.
- Não classificar opinião estética como divergência sem evidência documental.
- Não transformar a auditoria em plano gigante de refactor sem priorização.
- Toda conclusão precisa dizer se a correção é de código, de spec ou de decisão.
- A auditoria precisa servir de ponte objetiva para SPRINT-02 a SPRINT-04.
- Preservar o valor já entregue da landing atual.

### Mudanças previstas
- **Backend:** nenhuma implementação; apenas diagnóstico de ausência ou dependência futura.
- **API:** nenhuma implementação; apenas classificação de endpoints como roadmap.
- **Frontend:** nenhuma implementação obrigatória nesta sprint, salvo eventuais atualizações documentais.
- **Banco/Schema:** nenhuma.
- **Infra/Config:** possível documentação de naming inconsistente.
- **Docs:** criação ou atualização do artefato de auditoria e ajustes no roadmap, se necessários.

---

## 10. Etapa 5 — Refatoração

### Objetivo
Reduzir ruído e deixar o documento de auditoria útil para decisão, não apenas para registro.

### Checklist
- [ ] Fundir divergências duplicadas
- [ ] Diferenciar sintomas de causas
- [ ] Clarificar o que é bloqueio versus melhoria
- [ ] Simplificar termos vagos como “precisa alinhar” sem ação concreta
- [ ] Garantir ordem de prioridade compreensível
- [ ] Revisar se cada gap tem próxima sprint associada

### Saída esperada
- Auditoria curta o suficiente para uso contínuo
- Gaps ordenados por impacto real
- Decisões pendentes visíveis

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [ ] Revisar se todos os gaps citados têm evidência
- [ ] Revisar se nenhuma implementação inexistente foi assumida
- [ ] Validar se a priorização conversa com `ROADMAP.md`
- [ ] Revisar checklist manual de homologação
- [ ] Verificar se SPRINT-02, SPRINT-03 e SPRINT-04 podem ser executadas com base nesta auditoria
- [ ] Executar lint apenas se algum arquivo de doc indexador ou código auxiliar tiver sido alterado e exigir validação geral do repositório

### Comandos finais
```bash
bun run lint
```

### Rollout
- **Estratégia de deploy:** publicar a auditoria junto com a camada documental.
- **Uso de feature flag:** não aplicável.
- **Plano de monitoramento pós-release:** observar se decisões futuras passam a citar a auditoria como base, evitando retrabalho.
- **Métricas a observar:** redução de ambiguidade nas próximas sprints; menor confusão entre spec e realidade.
- **Alertas esperados:** se a auditoria gerar ações contraditórias ou inflar escopo além do roadmap imediato.

### Responsáveis
- **Backend:** não aplicável
- **Frontend:** owner de UI/hero, quando a correção sair do papel
- **QA:** agent / owner documental
- **Produto:** owner do roadmap
- **Release/Deploy:** maintainer do projeto

### Janela de deploy
- **Horário recomendado:** junto de atualização documental relevante
- **Tempo de monitoramento:** revisão das próximas sprints e boards

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
| Levantamento dos gaps | agent | Pendente | Confirmar evidências por tema |
| Priorização | agent + owner | Pendente | Classificar código vs spec |
| Handoff | agent | Pendente | Alimentar SPRINT-02, 03 e 04 |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
| Design system auditado | tokens e tipografia reais versus spec estão explicitados | documento de auditoria | Pendente |
| Hero auditado | scroll, fallback, mobile e reduced motion têm diagnóstico claro | documento de auditoria | Pendente |
| Placeholders auditados | `/auth`, `/beta` e `/dashboard` seguem como placeholders | documento de auditoria | Pendente |
| Stack e deploy auditados | dependências já instaladas e naming divergente aparecem como decisões | documento de auditoria | Pendente |

---

## 14. Plano de Rollback

### Gatilhos
- Auditoria com conclusões sem evidência
- Classificação incorreta de placeholder como fluxo pronto
- Priorização incompatível com a baseline factual
- Documento de auditoria gerando mais ambiguidade do que clareza
- Decisões tomadas com base em premissas erradas

### Passos
1. Reverter o artefato de auditoria
2. Restaurar a versão anterior dos docs afetados, se necessário
3. Revalidar as fontes primárias (`CURRENT-STATE`, código, specs)
4. Reabrir a auditoria por tema, com escopo menor
5. Registrar a causa da reversão

### Responsáveis
- **Execução técnica:** maintainer / agent
- **Revalidação:** owner documental
- **Comunicação:** responsável pelo repositório

### RTO
- Até 30 minutos

---

## 15. Critérios de Aceite

- [ ] `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md` existe e é específico ao projeto
- [ ] Cada gap crítico tem evidência documental e de código
- [ ] O hero recebeu diagnóstico específico e acionável
- [ ] As rotas secundárias foram mantidas como placeholders
- [ ] O naming de deploy foi explicitado como ponto de decisão
- [ ] Checklist manual executado
- [ ] Rollback definido
- [ ] Critérios de sucesso da sprint foram atingidos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [ ] `docs/development/AUDIT-SPEC-VS-IMPLEMENTATION.md` estiver publicado
- [ ] A classificação código vs spec vs decisão estiver clara
- [ ] SPRINT-02, SPRINT-03 e SPRINT-04 tiverem insumos suficientes para execução
- [ ] Não houver ambiguidade material sobre o que já está implementado
- [ ] Documentação relacionada tiver sido atualizada, quando aplicável

---

## 17. Instrução padrão para AGENTS.md

```text
When auditing PenFlow77 specs against implementation, always classify each gap as one of the following: update code, update spec, or explicit pending decision.

Mandatory rules:
- use evidence from both documentation and code
- keep `/auth`, `/beta`, and `/dashboard` classified as placeholders unless behavior proves otherwise
- treat hero motion, fallback, and design token alignment as first-class audit themes
- capture deploy naming inconsistencies when they affect operations or product coherence
- do not turn the audit into a generic rewrite backlog
```
