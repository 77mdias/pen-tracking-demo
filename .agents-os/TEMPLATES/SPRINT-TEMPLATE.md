---
title: Sprint Template
type: sprint
mode: sprint
approach: tdd-first
status: draft
---

# Sprint [ID] — [Nome curto]

## 1. Objetivo

Descreva de forma direta e verificável o que esta sprint entrega, habilita ou corrige.

> Exemplo: “Entregar o fluxo completo de autenticação com sessão persistida, proteção de rotas privadas e logout funcional.”

---

## 2. Resumo Executivo

- **Tipo da sprint:** [feature / bugfix / refactor / infra / mixed]
- **Modo principal do Agent OS:** [backend / frontend / animation / refactor / architecture / sprint]
- **Fase relacionada:** [Fase XXX — Nome]
- **Status:** [🟢 Planejada / 🚧 Em andamento / ✅ Concluída / ⛔ Bloqueada]
- **Prioridade:** [🔴 Crítica / 🟡 Alta / 🟢 Média / 🔵 Baixa]
- **Owner principal:** [nome / agent]
- **Dependências externas:** [listar ou “Nenhuma”]
- **Janela estimada:** [ex.: 2–3 dias]

---

## 3. Contexto

- **Problema atual:**
- **Impacto no sistema/produto:**
- **Riscos envolvidos:**
- **Áreas afetadas:**
- **Fluxos de usuário impactados:**
- **Premissas importantes:**
- **Fora de escopo nesta sprint:**

---

## 4. Critérios de Sucesso

Defina o que precisa ser verdadeiro para considerar a sprint bem-sucedida.

- [ ] [Critério de resultado 1]
- [ ] [Critério de resultado 2]
- [ ] [Critério técnico 1]
- [ ] [Critério de segurança/qualidade]
- [ ] [Critério de integração]

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [ ] Fase/Task/PR anterior validada
- [ ] Contratos necessários definidos
- [ ] Endpoints/entidades dependentes disponíveis
- [ ] Ambiente e dados mínimos prontos

### Ordem macro recomendada
1. Discovery
2. Estratégia de comportamento e testes
3. RED tests
4. Implementação mínima
5. Refatoração
6. Validação e rollout

### Paralelização possível
- [Task ou bloco A]
- [Task ou bloco B]
- [Task ou bloco C]

### Caminho crítico
- [Task ou bloco X]
- [Task ou bloco Y]
- [Task ou bloco Z]

---

## 6. Etapa 1 — Discovery Técnico

### Objetivo
Entender o impacto real da mudança antes de implementar.

### Checklist
- [ ] Analisar fluxo atual relacionado à mudança
- [ ] Identificar regras de negócio afetadas
- [ ] Mapear endpoints, entidades, serviços, páginas e integrações impactadas
- [ ] Identificar riscos técnicos e dependências
- [ ] Levantar cenários de falha e edge cases
- [ ] Confirmar restrições de arquitetura
- [ ] Confirmar restrições de performance, segurança e compatibilidade

### Saída esperada
- Escopo técnico validado
- Dependências mapeadas
- Riscos conhecidos
- Plano de execução enxuto

---

## 7. Etapa 2 — Design de Comportamento e Estratégia de Testes

### Objetivo
Transformar o escopo em comportamento verificável antes de codar.

### Checklist
- [ ] Definir comportamento esperado da funcionalidade
- [ ] Definir critérios de aceite testáveis
- [ ] Definir estratégia de testes antes da implementação
- [ ] Listar cenários de sucesso, falha e regressão
- [ ] Definir tipos de teste a serem criados primeiro
- [ ] Confirmar regras críticas protegidas no backend
- [ ] Confirmar fluxos autenticados/autorizados, se aplicável

### Casos de teste planejados
- [ ] Cenário 1:
- [ ] Cenário 2:
- [ ] Cenário 3:
- [ ] Cenário 4:
- [ ] Edge case 1:
- [ ] Regressão 1:

### Matriz de testes
| Tipo | Escopo | Obrigatório? | Observações |
|------|--------|--------------|-------------|
| Unitário | [módulos] | [Sim/Não] | |
| Integração | [fluxos] | [Sim/Não] | |
| E2E | [jornada] | [Sim/Não] | |
| Regressão | [bug/fluxo] | [Sim/Não] | |
| Auth/AuthZ | [restrição] | [Sim/Não] | |

---

## 8. Etapa 3 — Testes Primeiro (TDD)

### Objetivo
Criar testes RED que representem corretamente o comportamento esperado.

### Checklist
- [ ] Escrever testes antes da implementação
- [ ] Garantir que os testes falhem pelo motivo correto inicialmente
- [ ] Validar cobertura dos fluxos críticos
- [ ] Garantir que regras de negócio estejam representadas nos testes
- [ ] Garantir cobertura para falhas previsíveis
- [ ] Adicionar teste de regressão para qualquer bug relevante

### Testes a implementar primeiro
- [ ] Teste unitário:
- [ ] Teste de integração:
- [ ] Teste de regressão:
- [ ] Teste de autorização/autenticação:
- [ ] Teste de edge case:
- [ ] Teste de contrato/API:

### Evidência RED
- **Comando executado:**
- **Falha esperada observada:**
- **Observações:**

---

## 9. Etapa 4 — Implementação

### Objetivo
Implementar o mínimo necessário para fazer os testes passarem, respeitando arquitetura e segurança.

### Checklist
- [ ] Implementar o mínimo necessário para GREEN
- [ ] Aplicar validação obrigatória no backend
- [ ] Ajustar frontend apenas se necessário para suportar o novo comportamento
- [ ] Atualizar banco/schema se necessário
- [ ] Garantir integridade de dados e segurança
- [ ] Preservar contratos existentes ou versionar conscientemente
- [ ] Atualizar documentação técnica mínima impactada

### Regras obrigatórias
- Não confiar em input do client
- Toda regra crítica deve estar protegida no backend
- Nenhuma implementação sem teste correspondente
- Toda correção relevante deve vir acompanhada de teste de regressão
- Não colocar regra de negócio profunda em handler/controller/page
- Manter consistência com a arquitetura atual do projeto

### Mudanças previstas
- **Backend:**
- **API:**
- **Frontend:**
- **Banco/Schema:**
- **Infra/Config:**
- **Docs:**

---

## 10. Etapa 5 — Refatoração

### Objetivo
Melhorar legibilidade, manutenção e coesão sem alterar o comportamento validado.

### Checklist
- [ ] Melhorar legibilidade e manutenção do código
- [ ] Remover duplicações
- [ ] Refinar nomes, contratos e responsabilidades
- [ ] Garantir que todos os testes continuem verdes
- [ ] Reduzir acoplamento desnecessário
- [ ] Ajustar divisão entre camadas se necessário

### Saída esperada
- Código mais simples
- Responsabilidades mais claras
- Sem regressão

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [ ] Executar suíte unitária relevante
- [ ] Executar testes de integração relevantes
- [ ] Executar testes end-to-end críticos, se aplicável
- [ ] Executar checklist manual de homologação
- [ ] Executar lint, typecheck e validações arquiteturais, se houver
- [ ] Validar fluxo real ponta a ponta

### Comandos finais
```bash
# adicione aqui os comandos reais do projeto
```

### Rollout
- **Estratégia de deploy:**
- **Uso de feature flag:**
- **Plano de monitoramento pós-release:**
- **Métricas a observar:**
- **Alertas esperados:**

### Responsáveis
- **Backend:**
- **Frontend:**
- **QA:**
- **Produto:**
- **Release/Deploy:**

### Janela de deploy
- **Horário recomendado:**
- **Tempo de monitoramento:**

---

## 12. Checkpoints do Agent OS

Use estes checkpoints para sprints executadas por agentes.

- [ ] Checkpoint 1 — Discovery validado
- [ ] Checkpoint 2 — Estratégia de testes aprovada
- [ ] Checkpoint 3 — RED tests concluídos
- [ ] Checkpoint 4 — GREEN alcançado
- [ ] Checkpoint 5 — Refatoração concluída
- [ ] Checkpoint 6 — Validação final concluída

### Log resumido dos checkpoints
| Checkpoint | Responsável | Resultado | Observações |
|-----------|-------------|-----------|-------------|
|           |             |           |             |
|           |             |           |             |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
|         |                    |           | ⬜      |
|         |                    |           | ⬜      |
|         |                    |           | ⬜      |

---

## 14. Plano de Rollback

### Gatilhos
- Falhas relevantes em produção
- Regressão em fluxo crítico
- Quebra de integração
- Aumento anormal de erros
- Comportamento divergente do esperado apesar de testes verdes

### Passos
1. Suspender ou limitar a liberação da mudança
2. Reverter para a versão estável anterior
3. Executar smoke tests após reversão
4. Comunicar incidente e registrar causa provável
5. Abrir task de pós-mortem, se necessário

### Responsáveis
- **Execução técnica:**
- **Revalidação:**
- **Comunicação:**

### RTO
- Até [X] minutos

---

## 15. Critérios de Aceite

- [ ] Todos os cenários críticos foram cobertos por testes
- [ ] Os testes foram escritos antes da implementação
- [ ] A implementação atende ao comportamento esperado
- [ ] Não houve regressão nos fluxos principais
- [ ] Regras críticas estão protegidas no backend
- [ ] Checklist manual executado
- [ ] Rollback definido para produção
- [ ] Documentação mínima atualizada
- [ ] Critérios de sucesso da sprint foram atingidos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [ ] Escopo acordado entregue
- [ ] Critérios de aceite atendidos
- [ ] Testes relevantes passando
- [ ] Integração validada
- [ ] Sem violação arquitetural crítica
- [ ] Sem blocker aberto
- [ ] Documentação e changelog atualizados, quando aplicável

---

## 17. Instrução padrão para AGENTS.md

```text
When generating new sprints for this application, always follow the official Sprint Template.

This application is TDD-first and Agent-OS-driven.

Mandatory rules:
- tests come before implementation
- every feature, fix, or refactor must define expected behavior first
- every implementation must have corresponding automated tests
- regression fixes must include regression tests
- backend validation and data integrity must be prioritized
- do not generate implementation-only sprints
- every sprint must include discovery, behavior design, test strategy, test-first execution, implementation, refactor, QA, validation, and rollback
- when useful, split work into parallelizable execution batches
- preserve the current architecture and codebase conventions
- do not generate generic sprint content

Always keep the sprint specific to the current codebase and architecture.
Follow the sprint template exactly.
```
