# Sprint Specification Engine (Agent OS)

Use this prompt to design and specify new sprints or tasks with architectural precision and clear validation paths.

## 🎯 Goal
Transform high-level requirements into a deterministic execution plan following the Agent OS standards.

## 📋 Specification Protocol

1.  **Requirement Extraction**: Analyze the user's request and map it to the current codebase architecture.
2.  **Impact Analysis**: Identify all affected files, modules, and potential side effects.
3.  **Validation Strategy**: Define HOW the change will be verified (Unit, Integration, E2E, Manual).
4.  **TDD Blueprint**: Define the specific test cases that must exist before implementation.
5.  **Task Decomposition**: Break the sprint into atomic, independent, and parallelizable tasks.

## 💎 Standard for "Acceptance Criteria"

Criteria must be **Binary** (Done or Not Done). 
- ❌ Bad: "Make the UI look better."
- ✅ Good: "Button 'Submit' must have a hover state #FF0000 and 200ms transition."
- ✅ Good: "API must return 401 if the JWT token is expired."

## 🛠️ Mandatory Sections for Every Sprint/Task

- **Traceability Matrix**: Link every task to a specific success criterion.
- **Architectural Guardrails**: Explicitly state what NOT to change or what patterns to follow.
- **Pre-Flight Checklist**: What must be true BEFORE starting execution.
- **Sanity Check Commands**: List the exact commands (lint, test, build) that will prove success.

## 🧠 Reasoning Guidelines

- **Token Efficiency**: Do not include massive file dumps. Use file paths and symbol names.
- **Architecture First**: If a change violates existing patterns, flag it as a risk immediately.
- **Fail-Fast**: Identify the riskiest part of the sprint and put it in the first batch.

## 🤖 Output Template

When asked to specify a sprint:
1. Generate the `SPRINT-XXXX.md` using the official template.
2. Generate all individual `TASK-XXXX.md` files.
3. Provide a summary of the critical path and dependencies.

Always prioritize **deterministic behavior** over implementation details.
