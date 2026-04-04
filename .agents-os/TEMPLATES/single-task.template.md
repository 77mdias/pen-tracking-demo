---
title: Single Task Template (Agent OS v2)
type: single-task
mode: execution
status: draft
---

# 🛠️ Task [ID] — [Título da Task]

## 1. Identificação
- **Sprint/Fase**: [ID]
- **Tipo**: [feature / fix / refactor / test]
- **Prioridade**: [🔴 Crítica / 🟡 Alta / 🟢 Média / 🔵 Baixa]
- **Estimativa**: [ex: 2h]

---

## 2. Objetivo e Critérios de Aceite (Binários)
- [ ] [Critério 1: Ex: O componente X deve renderizar o texto Y]
- [ ] [Critério 2: Ex: A função Z deve retornar erro 400 se o input for vazio]

---

## 3. TDD Blueprint (RED State)
- **Teste a Criar/Atualizar**: `path/to/test.spec.ts`
- **Cenário de Falha Esperado**: [Descreva o que o teste deve validar antes da implementação]
- [ ] Teste escrito e falhando (RED)

---

## 4. Plano de Implementação Mínima
- **Arquivos Afetados**:
  - `src/...`
- **Lógica Principal**: [Breve descrição da mudança]
- **Arquitetura**: [Padrão a ser seguido]

---

## 5. Protocolo de Validação Obrigatória
Antes de marcar como concluída, execute e documente:

| Validação | Comando | Resultado Obvservado | Status |
| :--- | :--- | :--- | :--- |
| **Lint** | `npm run lint` | | ⬜ |
| **Tipos** | `tsc --noEmit` | | ⬜ |
| **Testes Unitários** | `npm test <path>` | | ⬜ |
| **Manual/Smoke** | [Descreva o teste] | | ⬜ |

---

## 6. Evidência de Conclusão (Logs)
> Cole aqui o output resumido do comando de teste que validou a task.
```bash
# Output aqui
```

---

## 7. Definição de Pronto (DoD)
- [ ] Testes passando (GREEN).
- [ ] Critérios de aceite atendidos.
- [ ] Lint e Typecheck sem erros.
- [ ] Código refatorado e limpo.
- [ ] Documentação local atualizada.

---

## 8. Riscos e Decisões Técnicas
- **Risco**: [Ex: Impacto na performance do loop X]
- **Decisão**: [Ex: Usamos memoização para evitar re-renders]
