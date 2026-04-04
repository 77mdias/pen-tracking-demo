# Audit Decisions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar as 3 decisões da auditoria Sprint 01: body font Open Sans, H1 scale `lg:text-9xl` com fix de clipping do descender "g", e deploy naming `pen-tracking-demo`.

**Architecture:** Mudanças CSS/TSX cirúrgicas em 4 arquivos. H1 requer screenshot Playwright antes e depois para verificar o clipping fix visualmente. As 3 mudanças são independentes entre si.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, Plus Jakarta Sans (font-display), Open Sans (font-body), Playwright MCP, bun

---

## File Map

| Arquivo | Ação | Propósito |
|---------|------|-----------|
| `src/app/globals.css` | Modify `:35` | Troca `--font-inter` por `--font-body` na regra base do body |
| `src/app/layout.tsx` | Modify `:51` | Remove classe `font-inter` do elemento `<body>` |
| `src/components/hero/HeroContent.tsx` | Modify `:27-35` | Escala H1 + aumenta padding descender nos wrappers de linha |
| `package.json` | Modify `:2` | Renomeia package de `penflow77` para `pen-tracking-demo` |

---

## Task 1: Body font → Open Sans

**Files:**
- Modify: `src/app/globals.css:35`
- Modify: `src/app/layout.tsx:51`

- [ ] **Step 1: Editar `globals.css:35` — trocar fonte base do body**

  Localizar a regra:
  ```css
  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-inter), sans-serif;  /* linha 35 */
  }
  ```

  Mudar para:
  ```css
  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body), sans-serif;
  }
  ```

- [ ] **Step 2: Editar `layout.tsx:51` — remover classe `font-inter` do `<body>`**

  Localizar:
  ```tsx
  <body className="font-inter min-h-full flex flex-col">
  ```

  Mudar para:
  ```tsx
  <body className="min-h-full flex flex-col">
  ```

  **Por quê:** A classe `font-inter` tem especificidade suficiente para sobrescrever a regra CSS base. Sem removê-la, o body continuaria usando Inter independente da mudança no CSS.

- [ ] **Step 3: Commit**

  ```bash
  git add src/app/globals.css src/app/layout.tsx
  git commit -m "style: use Open Sans as default body font"
  ```

---

## Task 2: Deploy naming → pen-tracking-demo

**Files:**
- Modify: `package.json:2`

- [ ] **Step 1: Editar `package.json:2`**

  Localizar:
  ```json
  {
    "name": "penflow77",
  ```

  Mudar para:
  ```json
  {
    "name": "pen-tracking-demo",
  ```

  **Nota:** `wrangler.jsonc` já usa `pen-tracking-demo` — nenhuma mudança lá.

- [ ] **Step 2: Commit**

  ```bash
  git add package.json
  git commit -m "chore: standardize package name to pen-tracking-demo"
  ```

---

## Task 3: H1 scale `lg:text-9xl` + fix clipping do descender "g"

**Files:**
- Modify: `src/components/hero/HeroContent.tsx:27-35`

**Contexto crítico:** `.split-line { overflow: hidden }` em `globals.css:253-256` é necessário para a animação GSAP de line-reveal. O hack `pb-[0.24em] -mb-[0.24em]` estende a boundary do clip para cobrir descenders, mas é insuficiente para o "g" de "reimagined" em Plus Jakarta Sans com `leading-[0.85]`.

- [ ] **Step 1: Iniciar dev server**

  ```bash
  bun run dev
  ```

  Aguardar o servidor estar disponível em `http://localhost:3000`.

- [ ] **Step 2: Screenshot Playwright — estado atual (ANTES)**

  Usar a ferramenta `browser_navigate` para abrir `http://localhost:3000`, depois `browser_take_screenshot` para capturar o estado atual do hero.

  Observar: o "g" em "reimagined" está visível completo ou aparece cortado na parte inferior?

- [ ] **Step 3: Editar `HeroContent.tsx` — escalar H1 e aumentar padding de descender**

  Localizar no arquivo (linhas 27-35):
  ```tsx
  <h1 className="hero-headline font-display mt-8 text-4xl font-semibold leading-[1.02] tracking-tight text-white drop-shadow-2xl md:text-6xl md:leading-[1] lg:text-7xl">
    <span className="split-line pb-[0.24em] -mb-[0.24em]">
      <span className="hero-headline-line block">The pen,</span>
    </span>
    <span className="split-line pb-[0.24em] -mb-[0.24em]">
      <span className="hero-headline-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
        reimagined.
      </span>
    </span>
  </h1>
  ```

  Mudar para:
  ```tsx
  <h1 className="hero-headline font-display mt-8 text-6xl font-semibold leading-[0.85] tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl">
    <span className="split-line pb-[0.35em] -mb-[0.35em]">
      <span className="hero-headline-line block">The pen,</span>
    </span>
    <span className="split-line pb-[0.35em] -mb-[0.35em]">
      <span className="hero-headline-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
        reimagined.
      </span>
    </span>
  </h1>
  ```

  **Mudanças aplicadas:**
  - `text-4xl` → `text-6xl` (mobile)
  - `md:text-6xl` → `md:text-8xl`
  - `lg:text-7xl` → `lg:text-9xl`
  - `leading-[1.02] md:leading-[1]` → `leading-[0.85]` (spec)
  - `pb-[0.24em] -mb-[0.24em]` → `pb-[0.35em] -mb-[0.35em]` nos dois wrappers

- [ ] **Step 4: Screenshot Playwright — estado pós-fix (DEPOIS)**

  Usar `browser_take_screenshot` novamente.

  Verificar:
  - O "g" em "reimagined" está completamente visível (sem corte na parte inferior)?
  - As linhas do H1 estão espaçadas corretamente com `leading-[0.85]`?
  - O texto não transborda o container?
  - O layout geral do hero continua correto?

- [ ] **Step 5: Ajustar padding se necessário**

  Se o "g" ainda aparecer cortado no screenshot: aumentar `pb-[0.35em] -mb-[0.35em]` para `pb-[0.42em] -mb-[0.42em]` e tirar novo screenshot.

  Se o "g" aparecer com espaço excessivo abaixo (gap visual entre as linhas): reduzir para `pb-[0.30em] -mb-[0.30em]`.

  Somente avançar quando o screenshot mostrar o "g" completo e o layout visualmente equilibrado.

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/hero/HeroContent.tsx
  git commit -m "style: scale hero H1 to lg:text-9xl and fix descender clipping"
  ```

---

## Task 4: Verificação final

- [ ] **Step 1: Lint**

  ```bash
  bun run lint 2>&1 | grep -E "error|Error" | grep -v "warning" | head -20
  ```

  Esperado: sem novos erros além dos pré-existentes (o projeto já tem 360 erros pre-existentes não relacionados a esta mudança).

- [ ] **Step 2: Screenshot Playwright — desktop 1440px**

  ```
  browser_resize(width=1440, height=900)
  browser_take_screenshot()
  ```

  Verificar: H1 em `lg:text-9xl`, fonte do body em Open Sans, hero visualmente equilibrado.

- [ ] **Step 3: Screenshot Playwright — mobile 375px**

  ```
  browser_resize(width=375, height=812)
  browser_take_screenshot()
  ```

  Verificar: H1 em `text-6xl`, sem overflow, layout correto.

- [ ] **Step 4: Commit de encerramento se pendente**

  Se houver ajustes de lint ou pequenos fixes pós-verificação:
  ```bash
  git add -p
  git commit -m "fix: post-audit visual verification adjustments"
  ```
