# Sprint Execution Engine (Agent OS)

Use this prompt to execute an active sprint with maximum rigor, continuous validation, and structured documentation.

## 🚀 Execution Protocol

1.  **Context Sync**: Read the Sprint Document and all related Task Documents.
2.  **Dependency Mapping**: Identify the critical path and parallelization opportunities.
3.  **Batch Execution**: Process tasks in logical batches (Max 3 tasks per batch).
4.  **TDD Lifecycle**:
    - Create/Update tests first.
    - Run tests to confirm RED state.
    - Implement minimal code for GREEN.
    - Refactor and ensure tests stay GREEN.
5.  **Continuous Validation**: After EACH task, run:
    - `npm run lint` (or equivalent project lint)
    - `tsc` (or equivalent type check)
    - Relevant test suites.
6.  **Progress Tracking**: Update the "Log de Execução" in the task/sprint document immediately after completion.
7.  **Final Checkout & Closure**:
    - Before finishing the sprint/batch, verify the "Checklist de Encerramento" in the corresponding `PHASE-BOARD` or `SPRINT` document.
    - Ensure all Acceptance Criteria (AC) are marked as DONE.
    - Validate that no technical debt was left undocumented.
    - Perform the official checkout of the final checklist items.

## 📋 Documentation Checklist Updates (MANDATORY)

Every task completion MUST update the corresponding checkboxes in the Sprint Document and Phase Board. This is NOT optional — completing work without updating the docs is considered incomplete.

### What to update for EACH completed task:

1. **Task status checkbox** — change `- [ ]` to `- [x]` next to the task name (e.g. `S04-T01`)
2. **Task Status field** — change `Status: Pendente` to `Status: Concluído`
3. **All acceptance criteria checkboxes** — every `- [ ]` inside the task's "Critérios de aceitação" section must become `- [x]`
4. **Test strategy checkboxes** — mark all relevant `- [ ]` to `- [x]`
5. **Phase Board summary table** — update Concluído/Pendente counts to reflect completed tasks
6. **Status Geral** — update percentage (e.g. `100% (7/7 tarefas completas)`)
7. **Checkpoints** — mark relevant `- [ ]` to `- [x]`
8. **Documentação e Comunicação checklist** — mark completed items
9. **Checklist de Encerramento da Fase** — mark all completed items
10. **Sprint "Critérios de Sucesso"** — mark completed items in the Sprint Document

### How to update:

Use the `Edit` tool with `replace_all: false` for targeted updates or `replace_all: true` for bulk updates of all remaining `- [ ]` → `- [x]` within the document. Do NOT rely on narrative text alone — the physical `[x]` marks must appear in every checklist section.

**Remember:** The checklists ARE the deliverable metadata. A task is not done until its checkboxes are marked done.

## 🛡️ Mandatory Validation Checklist (Every Turn)

Before responding, the agent MUST verify:
- [ ] Are all active tasks in this batch covered by tests?
- [ ] Did I run the validation commands (lint, types, tests)?
- [ ] Is the architecture being preserved (no shortcuts)?
- [ ] Is the Sprint/Task document updated with the latest status?
- [ ] Did I mark all relevant checkboxes with `[x]` in the Sprint AND Phase Board documents?
- [ ] Did I perform the Final Checkout of the completion checklist?
- [ ] Are there any new blockers or risks identified?

## 📝 Documentation Requirements

- **Task Completion**: Every finished task must have a "Validation Evidence" entry (command + output summary).
- **Changelog**: Update the project CHANGELOG.md (if exists) or the Sprint Closure doc.
- **Architecture**: If an architectural decision was made, document it in the task's "Riscos/Observações" section.

## 📊 Status Reporting Style

At the beginning of every response, provide this header:

```markdown
### ⚡ Agent OS - Sprint Status
**Mode**: [Execution/Refactor/Fix] | **Sprint**: [ID]
**Current Batch**: [Task IDs]
**Progress**: [▓▓▓▓░░░░░░] 40%
**Status**: 🟢 Healthy / 🟡 Warning / 🔴 Blocked
```

## 🤖 Orchestration Rules

- **Aggressive Delegation**: Use specialized subagents for isolated tasks (UI, API, Tests).
- **Context Compression**: Send only the necessary file snippets and task specs to subagents.
- **Atomic Commits**: If requested to commit, use one commit per task with a clear message.

## 🔁 Real Validation (NOT Narrative)

When checklists reference validation steps (lint, typecheck, smoke tests, manual checks), the agent MUST actually execute them — not just describe what would happen. Use tools (Playwright, bash, curl, etc.) to produce evidence. If a check is environment-dependent (WebGL, reduced-motion), flag it explicitly rather than pretending it passed.

Start execution by parsing the provided documents and defining the first batch.
