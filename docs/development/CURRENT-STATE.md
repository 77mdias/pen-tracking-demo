# CURRENT-STATE

## Snapshot

Data de baseline: 2026-04-03.
Última atualização: 2026-04-05 (pós SPRINT-02 e SPRINT-03).

PenFlow77 é um frontend de demonstração premium centrado na landing page, com um funil beta simulado navegável além da landing. A implementação mais madura está na experiência de marketing em `/`, com hero visual avançado e seções narrativas de produto. As rotas `/auth`, `/beta` e `/dashboard` agora compõem um fluxo simulado coerente com estado compartilhado via localStorage.

## Classificação rápida

| Área | Status | Leitura correta |
| --- | --- | --- |
| Landing `/` | Implementado | Principal entrega atual do repositório |
| Hero premium | Alinhado e polido | 3D, fallback, vídeo, hooks de scroll; tokens alinhados ao design system; reduced-motion corrigido |
| Storytelling abaixo do hero | Implementado | Composição explícita de seções de produto |
| `/auth` | Funil simulado | Form de email → simulated sign-in → localStorage → redirect `/beta` |
| `/beta` | Funil simulado | Queue status dinâmica (posição 180-250), botão join, contexto do usuário |
| `/dashboard` | Funil simulado | Personalizado com funnel context; acesso direto mostra preview + CTA |
| Backend/API/DB/email | Planejado | Descrito nos specs, não evidenciado como implementação ativa |
| Testes automatizados | Parcial/inexistente | Lint e tsc passam; sem suite de testes UI |
| Documentação operacional | Completa | Baseline, auditoria, sprints 01-03 concluídas, changelog atualizado |

## 1. O que está implementado

### 1.1 Landing page e composição principal

A rota raiz renderiza uma landing composta por `HeroSection` e `ProductIntroSection`, não apenas um hero isolado. Isso está explícito em `src/app/page.tsx:1-9`.

A sequência do storytelling abaixo da dobra também está codificada de forma objetiva: a seção agrega bridge, AI Writing, Smart Sync, Focus Mode e CTA final em `src/components/product-intro/ProductIntroSection.tsx:2-21`.

Leitura operacional:
- a home já é uma experiência de marketing multi-seção
- a narrativa principal do produto está concentrada no frontend
- o eixo de valor atual do projeto é conversão/branding, não aplicação funcional

### 1.2 Hero premium

`src/components/hero/HeroSection.tsx` mostra um hero significativamente mais avançado do que um boilerplate visual.

Pontos factuais relevantes:
- `HeroCanvas` é carregado com `next/dynamic` e `ssr: false` em `src/components/hero/HeroSection.tsx:18-30`
- o componente detecta capacidades do dispositivo, reduz movimento, identifica mobile/tablet/desktop e escolhe fallback quando necessário em `src/components/hero/HeroSection.tsx:35-45`
- a árvore principal alterna entre `HeroFallback` e `HeroCanvas`, mantém `VideoBackground`, renderiza `HeroContent`, detalhes ambientes e scroll cue em `src/components/hero/HeroSection.tsx:71-125`

Isso confirma que o hero atual já trabalha com:
- caminho WebGL/3D
- caminho de fallback
- adaptação por device tier
- adaptação por reduced motion
- narrativa visual acima da dobra

### 1.3 Build/deploy frontend

O `package.json` revela a stack real e os comandos operacionais do projeto em `package.json:4-36`.

O estado atual inclui:
- Next.js 16.2.2
- React 19.2.4
- Tailwind CSS 4
- GSAP + `@gsap/react`
- three + R3F + drei
- Bun como interface principal de execução
- build/deploy via OpenNext Cloudflare

A configuração de runtime e deploy também está presente:
- `next.config.ts:10-12` inicializa OpenNext no ambiente de desenvolvimento
- `open-next.config.ts:1-9` define a baseline do adapter Cloudflare
- `wrangler.jsonc:1-19` aponta o worker para `.open-next/worker.js`

## 2. O que está parcial ou com ressalvas

### 2.1 Hero vs. recomendações dos próprios specs

**Status atualizado (pós SPRINT-02):** Policy de scroll decidida pelo owner — manter `e.preventDefault()` no wheel e validar manualmente. Naming clarificado (`disableSnapScroll`). Sem risco de regressão de UX identificado na validação.

### 2.2 Design system parcialmente alinhado

**Status atualizado (pós SPRINT-02):** Background root corrigido (`#050a14`). Reduced-motion CSS expandido para cobrir `.liquid-blob`, `.border-gradient-spin::before`, `.floating-badge`, `.floating-badge-center`, `.fade-slide-in`. H1 scale (`lg:text-9xl`) e body font (`Open Sans` via `var(--font-body)`) confirmados como conformantes.

### 2.3 Deploy configurado, mas com sinais de inconsistência de nomenclatura

**Status:** Pendente de decisão do owner — `penflow77` (npm/brand) vs `pen-tracking-demo` (Cloudflare). Adiado conscientemente para antes do próximo deploy para produção.

## 3. O que é funil simulado (pós SPRINT-03)

### 3.1 `/auth`

Client component com form de email, validação básica (presença de `@` e `.`), simulated sign-in que gera contexto no localStorage (`simulateSignIn`) e redireciona para `/beta` após 600ms de delay simulado. Usuário já logado vê "Welcome back, {displayName}" com link para beta.

Componentes: `FunnelProvider`, `useFunnel()`, `FunnelStatusBadge`.
Estado: `{ isSignedIn, userEmail, displayName, ... }`.

### 3.2 `/beta`

Client component com posição dinâmica (gerada aleatoriamente entre 180-250 no momento do join), botão "Join private beta" que chama `simulateJoinBeta()` e atualiza estado, confirmação visual com data de join, nome do usuário exibido. Acesso sem contexto mostra explicação "Sign in from the auth page to get your personalized queue status" + CTA "Sign in to join".

Footnote honesta: "This is a simulated queue. Your position is generated locally and is not connected to a real waiting list."

### 3.3 `/dashboard`

Client component personalizado com greeting ("Welcome back, {displayName}") e queue status inline quando `betaJoined = true`. Acesso direto sem contexto mostra "Dashboard Preview" com cards estáticos e CTA "Start the journey" → `/auth`. Não parece rota protegida — comportamento honesto e compreensível.

Classificação correta: funil simulado coerente, não produto funcional com backend.

## 4. O que continua apenas planejado

Os specs de produto e técnicos descrevem um escopo maior:
- auth com JWT
- backend NestJS
- Drizzle ORM
- PostgreSQL/Neon
- endpoints `/auth/*`, `/beta/*`, `/user/me`
- email notifications

Esses itens aparecem em `PRD_production.md:44-50` e `TECH_SPEC_production.md:4-68`.

Pelo estado do frontend inspecionado e pela stack declarada em `package.json:14-36`, eles devem ser tratados como roadmap, não como capacidade já entregue deste repositório.

## 5. Stack real do projeto

### 5.1 Dependências efetivamente instaladas

A stack real observável no `package.json` é:
- Next.js 16.2.2
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- GSAP
- `@gsap/react`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@opennextjs/cloudflare`
- `wrangler`

### 5.2 Diferença para os specs

`AGENTS.md` ainda fala em dependências hero "to be installed" para GSAP e R3F (`AGENTS.md:24-31`). Isso já não corresponde ao estado atual, porque essas dependências estão instaladas em `package.json:14-24`.

Leitura correta:
- parte da documentação de alto nível envelheceu
- o código atual está mais avançado do que alguns trechos do spec sugerem
- em outros pontos, o código está menos avançado do que o PRD/TECH_SPEC sugerem

## 6. Qualidade, testes e operação

### 6.1 Automação disponível

Os scripts expostos hoje em `package.json:4-12` cobrem:
- desenvolvimento local
- build
- start
- lint
- preview/deploy/upload em Cloudflare
- geração de tipos do Wrangler

### 6.2 Lacunas de verificação

Não há script `test` no `package.json:4-12`.

Portanto, a leitura operacional honesta é:
- lint existe
- build/deploy existem
- a baseline de testes automatizados não está estabelecida neste snapshot
- não há, nesta base documental inicial, evidência de estratégia de CI, smoke tests ou e2e formalizados

## 7. Gaps documentais relevantes

Antes desta baseline, o repositório tinha specs de produto e hero, mas faltava uma camada documental que dissesse claramente:
- o que já foi entregue
- o que é mock
- o que ainda pertence ao roadmap
- onde os specs divergem do código

A nova base em `docs/development/` passa a cumprir esse papel.

Mesmo assim, as camadas de `SPRINTS` e `TASKS` passam a existir como planejamento e acompanhamento operacional, enquanto a governança contínua dessas duas camadas ainda depende de dono, cadência e disciplina de atualização para não virar ruído.

## 8. Divergências importantes de spec vs implementação

### Divergência 1 — Background base
**Resolvida (SPRINT-02):** `--color-bg` corrigido para `#050a14` em `globals.css:4`.

### Divergência 2 — Tipografia base
**Resolvida (SPRINT-02):** Body font usa `var(--font-body)` = Open Sans. H1 usa `lg:text-9xl`. Ambos conformantes.

### Divergência 3 — Maturidade funcional das rotas
**Atualizada (SPRINT-03):** `/auth`, `/beta` e `/dashboard` agora são um funil simulado coerente com estado compartilhado via localStorage. Não são mais placeholders estáticos. Continuam sem backend real.

### Divergência 4 — Política de scroll do hero
**Resolvida (SPRINT-02):** Owner decidiu manter scroll hijack e validar manualmente. Naming clarificado (`disableSnapScroll`).

## 9. Resumo executivo

Se alguém entrar neste repositório hoje, a leitura correta é:
- este projeto já possui uma landing premium relevante e tecnicamente ambiciosa
- o hero está alinhado ao design system e com acessibilidade (reduced-motion) corrigida
- o fluxo de produto existe como funil simulado coerente (`/auth` → `/beta` → `/dashboard`) com estado compartilhado via localStorage
- o backend real, autenticação, fila persistida e dashboard com dados reais continuam como roadmap
- os specs continuam úteis, mas não substituem a inspeção do código
- a governança documental está atualizada com baseline, auditoria, 3 sprints concluídas e changelog
