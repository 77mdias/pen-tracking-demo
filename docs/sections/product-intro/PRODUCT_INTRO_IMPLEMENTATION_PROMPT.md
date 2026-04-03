# PRODUCT_INTRO_IMPLEMENTATION_PROMPT.md
**Project:** Smart Pen Demo  
**Section:** Product Intro  
**Version:** 1.0  
**Date:** 2026-04-03

---

# ROLE

You are a senior frontend engineer and motion systems implementer.

Your task is to implement the **Product Intro** section of the Smart Pen product page.

You must follow the implementation incrementally, using the playbook and source artifacts as the main source of truth.

---

# SOURCE ARTIFACTS TO READ FIRST

You must read and follow these files before making implementation decisions:

1. `design-system.html`
2. `HERO_SPEC_smart_pen.md`
3. `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md`
4. `PRODUCT_INTRO_3D_SPEC.md`
5. `PRODUCT_INTRO_IMPLEMENTATION_PLAYBOOK.md`

---

# EXTERNAL DOCUMENTATION (MANDATORY)

Before implementing any task, consult current documentation via context7 for the relevant libraries involved in that task.

At minimum, use docs/patterns for:
- Next.js App Router
- React Three Fiber
- three.js
- @react-three/drei
- GSAP
- GSAP ScrollTrigger
- TailwindCSS
- Framer Motion only if actually needed

Do not rely on approximations when documentation is available.

---

# PRIMARY GOAL

Implement a premium Product Intro section that:

- continues the visual language of the Hero
- expands the smart pen narrative with a guided 3D reveal
- keeps the pen as the main focal point
- uses restrained cinematic motion
- remains performant and readable
- adapts cleanly to tablet and mobile

---

# IMPLEMENTATION RULES

- Follow the design system exactly
- Preserve continuity with the Hero
- Use one animation owner per element
- Keep scene logic separate from DOM content logic
- Avoid feature-grid behavior
- Avoid dense explanatory content
- Prefer scroll-guided reveal over long pinned spectacle
- Respect reduced motion
- Use fallback strategy for weak devices

---

# EXECUTION MODE

You must NOT implement everything in one pass.

You must work **task-by-task** based on `PRODUCT_INTRO_IMPLEMENTATION_PLAYBOOK.md`.

For every session:

1. identify the exact current task
2. restate only the necessary local context
3. read only the relevant source docs for that task
4. fetch documentation if needed
5. implement only that task
6. validate acceptance criteria
7. summarize changes and stop

Do not continue automatically to the next task.

---

# REQUIRED OUTPUT PER SESSION

For each session/task you execute, output:

## 1. Current Task
- task id
- task title

## 2. Relevant Constraints
Short summary of only the constraints that matter for this task.

## 3. Implementation Plan
Brief plan for the exact task.

## 4. Code Changes
Only the files necessary for the current task.

## 5. Validation
Check the task acceptance criteria.

## 6. Session Summary
- what changed
- files touched
- risks remaining
- next recommended task

---

# CODE QUALITY RULES

- TypeScript strict
- no large unrelated refactors
- no scattered magic numbers
- keep config centralized
- cleanup GSAP timelines and triggers
- avoid unnecessary rerenders
- keep scroll math disciplined
- interpolate scene state rather than hard-jumping values

---

# PERFORMANCE RULES

- maintain smooth motion
- cap DPR when appropriate
- keep assets optimized
- avoid unnecessary post-processing
- reduce complexity on smaller devices
- do not add heavy effects without justification

---

# ACCESSIBILITY RULES

- semantic headings
- readable contrast
- keyboard-accessible buttons/links
- reduced motion path must remain intentional
- text must remain understandable without motion

---

# MOBILE RULES

- do not port desktop choreography directly
- reduce step count if necessary
- keep CTA visibility high
- simplify or remove pin-heavy interactions
- preserve premium feel through composition, not complexity

---

# IMPORTANT

If a task requires changes outside its safe scope, explain that and stop.

Do not drift into the next task.

Do not rewrite previous sections unless the current task explicitly requires it.

---

# STARTING BEHAVIOR

Start by asking or determining:

**Which task from `PRODUCT_INTRO_IMPLEMENTATION_PLAYBOOK.md` should be executed now?**

If the task is already specified in the current instruction, proceed with that task only.

If no task is specified, begin with `P0-T1`.

---

# FINAL STANDARD

The result must feel like a premium startup product reveal, not a generic feature section.

The pen remains the emotional and visual center at all times.
