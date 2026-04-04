---
title: Single Task Template
type: single-task
mode: execution
status: draft
---

# Task [ID] — [TÍTULO]

## 🧠 1. Identificação

- **Tipo:** [feature / fix / refactor / test / infra / docs]
- **Modo recomendado:** [backend / api / frontend / animation / refactor / bugfix]
- **Prioridade:** [🔴 Crítica / 🟡 Alta / 🟢 Média / 🔵 Baixa]
- **Status:** [⏳ Pendente / 🚧 Em andamento / ✅ Concluída / ⛔ Bloqueada]
- **Estimativa:** [ex: 2h]
- **Responsável:** [dev / agent]
- **Criado em:** [YYYY-MM-DD]
- **Sprint/Fase:** [referência]

---

## 🎯 2. Objetivo

Descreva de forma **direta e verificável** o que esta task entrega.

> Regra: alguém deve conseguir dizer “feito ou não feito” sem interpretação.

---

## 🧩 3. Contexto Mínimo (Token-Efficient)

Inclua apenas o essencial:

- Regra de negócio relevante:
- Fluxo impactado:
- Dependência direta:
- Problema atual:

> ❗ Não cole documentação inteira — apenas o necessário.

---

## 📥 4. Inputs

- Dados necessários:
- Endpoints/serviços usados:
- Entidades envolvidas:
- Contratos esperados:

---

## 📤 5. Output Esperado

- Resultado funcional:
- Mudança visível no sistema:
- Efeito esperado no usuário ou API:

---

## 🔗 6. Dependências

- **Depende de:** [IDs ou “Nenhuma”]
- **Bloqueia:** [IDs ou “Nenhuma”]
- **Pode rodar em paralelo com:** [IDs ou “Nenhuma”]

---

## 🧪 7. Estratégia de Teste (OBRIGATÓRIO)

### Tipos de teste

- [ ] Unitário
- [ ] Integração
- [ ] Regressão
- [ ] E2E (se aplicável)
- [ ] Auth/AuthZ (se aplicável)

### Cenários principais

- [ ] Cenário de sucesso
- [ ] Cenário de falha
- [ ] Edge case
- [ ] Regressão (se bugfix)

---

## 🔴 8. TDD — Testes Primeiro

### Antes de implementar

- [ ] Testes escritos
- [ ] Testes falhando corretamente (RED)

### Evidência

- Comando:
- Resultado:
- Observação:

---

## ⚙️ 9. Implementação

### Objetivo

Implementar **o mínimo necessário para passar os testes**.

### Checklist

- [ ] Implementação mínima (GREEN)
- [ ] Sem lógica crítica no client
- [ ] Validação no backend
- [ ] Contratos respeitados
- [ ] Sem duplicação óbvia
- [ ] Código legível

### Arquivos afetados

- `src/...`
- `src/...`
- `tests/...`

---

## 🧼 10. Refatoração

- [ ] Remover duplicações
- [ ] Melhorar nomes
- [ ] Separar responsabilidades
- [ ] Garantir testes ainda passando

---

## 🔍 11. Validação

### Automática

- [ ] Testes passando
- [ ] Lint OK
- [ ] Typecheck OK (se aplicável)

### Manual

- [ ] Fluxo validado
- [ ] Resultado visual/API correto
- [ ] Edge cases verificados

---

## 📏 12. Critérios de Aceite

- [ ] Comportamento esperado implementado
- [ ] Testes cobrindo cenários principais
- [ ] Nenhuma regressão visível
- [ ] Regras de negócio respeitadas
- [ ] Integração funcionando

---

## ✅ 13. Definition of Done

A task só é concluída quando:

- [ ] Implementação finalizada
- [ ] Testes passando
- [ ] Critérios de aceite atendidos
- [ ] Sem violação arquitetural
- [ ] Sem erro crítico aberto
- [ ] Código revisado (manual ou agent)

---

## ⚠️ 14. Riscos / Observações

- [Risco técnico]
- [Limitação]
- [Decisão tomada]

---

## 📝 15. Log de Execução (Agent-friendly)

| Etapa         | Responsável | Status | Observações |
| ------------- | ----------- | ------ | ----------- |
| TDD           |             |        |             |
| Implementação |             |        |             |
| Refatoração   |             |        |             |
| Validação     |             |        |             |

---

## 🤖 16. Instrução para AGENTS.md

```text
When executing a single task:

- always use the Single Task Template
- never start implementation before defining behavior and tests
- keep context minimal and focused
- do not include unrelated project context
- always define inputs, outputs, and acceptance criteria clearly
- implement only what is necessary for the task
- validate before marking as done
- do not skip TDD
- ensure backend validation for critical rules
- prefer small, deterministic changes

A task is not DONE without validation.
```

```

```

---
