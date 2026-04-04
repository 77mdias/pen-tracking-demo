---
title: Sprint Template (Agent OS v2)
type: sprint
mode: sprint
approach: tdd-first
status: draft
---

# 🚀 Sprint [ID] — [Nome Curto]

## 1. Objetivo Verificável
Descreva o que será verdade ao final desta sprint (ex: "Fluxo X funcionando com 100% de cobertura de integração").

---

## 2. Resumo Executivo
- **Tipo:** [feature / bugfix / refactor / infra]
- **Modo Agent OS:** [backend / frontend / animation / etc]
- **Status:** [🟢 Planejada / 🚧 Em andamento / ✅ Concluída]
- **Prioridade:** [🔴 Crítica / 🟡 Alta / 🟢 Média / 🔵 Baixa]
- **Janela Estimada:** [ex: 2 dias]

---

## 3. Matriz de Rastreabilidade (Reqs vs. Tasks)
| ID Req | Descrição do Requisito (Critério de Aceite) | Task Relacionada | Status Validação |
| :--- | :--- | :--- | :--- |
| REQ-01 | [Ex: API retorna 201 ao criar usuário] | TASK-01 | ⬜ |
| REQ-02 | [Ex: Botão fica desabilitado durante loading] | TASK-02 | ⬜ |

---

## 4. Estratégia de Validação Contínua
Para cada task, o agente deve executar obrigatoriamente:
1. `npm run lint` ou equivalente.
2. `tsc` ou verificação de tipos.
3. Suite de testes específica da task.
4. Smoke test do fluxo principal impactado.

---

## 5. Etapas de Execução (Rigorosas)

### Phase 1: Discovery & TDD Blueprint
- [ ] Analisar código atual e identificar pontos de injeção.
- [ ] Definir contratos de entrada/saída.
- [ ] Listar todos os testes RED necessários.

### Phase 2: Execution (Batches)
- [ ] **Batch 1**: [ID das Tasks] -> TDD -> Implement -> Validate.
- [ ] **Batch 2**: [ID das Tasks] -> TDD -> Implement -> Validate.

### Phase 3: Post-Implementation Audit
- [ ] Refatoração para padrões arquiteturais.
- [ ] Validação cruzada (integração entre tasks).
- [ ] Atualização de documentação técnica/arquitetural.

---

## 6. Checkpoints de Validação Final
| Checkpoint | Comando de Validação | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- |
| Qualidade de Código | `npm run lint` | Zero erros/warnings | ⬜ |
| Integridade de Tipos | `tsc --noEmit` | Sucesso sem erros | ⬜ |
| Cobertura de Testes | `npm test -- --coverage` | Mínimo de [X]% nos arquivos afetados | ⬜ |
| Regressão | `npm test tests/regression` | Todos os testes existentes verdes | ⬜ |

---

## 7. Log de Execução (Agent-friendly)
| Task ID | Status | Evidência de Validação (Comando + Resumo) | Data/Hora |
| :--- | :--- | :--- | :--- |
|         |        |                                           |           |

---

## 8. Definição de Pronto (DoD)
A sprint só é concluída quando:
- [ ] Todos os itens da Matriz de Rastreabilidade estão verdes.
- [ ] Todos os Checkpoints de Validação Final passaram.
- [ ] Código foi refatorado e segue a arquitetura.
- [ ] Documentação e Changelog atualizados.
- [ ] Nenhuma regressão foi introduzida.

---

## 9. Plano de Rollback
- **Gatilho**: [Condição de falha]
- **Ação**: [Comando ou processo de reversão]
- **RTO**: [Tempo estimado]
