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

## 🛡️ Mandatory Validation Checklist (Every Turn)

Before responding, the agent MUST verify:
- [ ] Are all active tasks in this batch covered by tests?
- [ ] Did I run the validation commands (lint, types, tests)?
- [ ] Is the architecture being preserved (no shortcuts)?
- [ ] Is the Sprint/Task document updated with the latest status?
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

Start execution by parsing the provided documents and defining the first batch.
