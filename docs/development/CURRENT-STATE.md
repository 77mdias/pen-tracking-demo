# CURRENT-STATE

## Snapshot

Data de baseline: 2026-04-03.

PenFlow77 é, hoje, um frontend de demonstração premium centrado na landing page. A implementação mais madura está na experiência de marketing em `/`, com hero visual avançado e seções narrativas de produto. As rotas `/auth`, `/beta` e `/dashboard` existem, mas operam como placeholders visuais e não como fluxos funcionais de produto.

## Classificação rápida

| Área | Status | Leitura correta |
| --- | --- | --- |
| Landing `/` | Implementado | Principal entrega atual do repositório |
| Hero premium | Implementado com ressalvas | Já combina 3D, fallback, vídeo e hooks de scroll, mas ainda precisa validação contra os próprios specs |
| Storytelling abaixo do hero | Implementado | Há composição explícita de seções de produto |
| `/auth` | Placeholder | Tela estática sem autenticação real |
| `/beta` | Placeholder | Fila simulada com valor fixo |
| `/dashboard` | Placeholder | Painel visual com dados mockados |
| Backend/API/DB/email | Planejado | Descrito nos specs, não evidenciado como implementação ativa neste snapshot |
| Testes automatizados | Parcial/inexistente | Há lint, mas não há script de teste no `package.json` |
| Documentação operacional | Parcial | Esta baseline cria a base em `docs/development/` |

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

Os specs pedem evitar scroll hijacking pesado e sequências que prendam o usuário (`HERO_SPEC_smart_pen.md:401-408`, `HERO_TECHNICAL_BUILD_PLAN_smart_pen.md:574-586`).

A implementação atual do hero usa hooks chamados `useScrollHijack` e `useSnapScroll`, ligados diretamente ao container das seções abaixo do hero em `src/components/hero/HeroSection.tsx:11-12` e `src/components/hero/HeroSection.tsx:53-68`.

Isso não significa, por si só, que a experiência esteja errada, mas significa que existe uma área clara de verificação: o comportamento real de scroll precisa ser validado contra a diretriz documental de não travar nem forçar a navegação.

### 2.2 Design system parcialmente alinhado

`AGENTS.md` define `#050a14` como background da página e especifica uma família tipográfica baseada em Montserrat/Open Sans (`AGENTS.md:101-115`).

A implementação atual diverge em pontos importantes:
- `src/app/globals.css:2-18` define `--color-bg: #000000`
- `src/app/globals.css:24-29` e `src/app/globals.css:41-50` mostram o uso de famílias ligadas a `Inter`, `Manrope`, `font-heading` e `font-display`, não a uma implementação evidente de Montserrat/Open Sans

Leitura correta:
- há um design system em uso na aplicação
- mas ele não está totalmente alinhado ao design system descrito em `AGENTS.md`
- a documentação precisava separar intenção de spec e realidade do CSS atual

### 2.3 Deploy configurado, mas com sinais de inconsistência de nomenclatura

O nome do pacote é `penflow77` em `package.json:1`, enquanto o worker configurado em `wrangler.jsonc:3` usa `pen-tracking-demo`, e o serviço auto-referenciado segue esse mesmo nome em `wrangler.jsonc:10-15`.

Isto sugere pelo menos uma divergência operacional de naming entre produto/repo e infraestrutura publicada.

## 3. O que é placeholder

### 3.1 `/auth`

A rota `/auth` é uma tela estática com texto institucional, um botão visual de continuação por email e um link para `/beta` em `src/app/auth/page.tsx:4-25`.

O que não aparece neste arquivo:
- formulário real
- validação
- chamada de API
- sessão
- estado autenticado

Classificação correta: placeholder visual de entrada no funil.

### 3.2 `/beta`

A rota `/beta` representa a fila da private beta, mas os dados são estáticos. O cartão mostra posição `#214` e wave `Waiting`, além de um botão visual de join e link para `/dashboard` em `src/app/beta/page.tsx:12-35`.

O que isso significa operacionalmente:
- a página comunica a ideia do fluxo
- mas ainda não existe fila dinâmica, persistência ou integração
- o botão principal ainda não executa a entrada em uma fila real

Classificação correta: placeholder de estado de beta.

### 3.3 `/dashboard`

A rota `/dashboard` é um mock visual sustentado por um array local com três cards: `Device`, `Sync` e `AI` em `src/app/dashboard/page.tsx:1-7`. Os cards são renderizados diretamente a partir desse array em `src/app/dashboard/page.tsx:20-26`.

Não há evidência, neste snapshot, de:
- autenticação protegendo a rota
- fetch de dados
- mutações
- integrações com backend

Classificação correta: dashboard demonstrativo, não produto funcional.

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
- Spec: `#050a14` como page background em `AGENTS.md:103-109`
- Código: `--color-bg: #000000` em `src/app/globals.css:2-4`

### Divergência 2 — Tipografia base
- Spec: Montserrat/Open Sans em `AGENTS.md:111-115`
- Código: tokens e utility classes apontam para Inter/Manrope/display fonts em `src/app/globals.css:24-29` e `src/app/globals.css:37-50`

### Divergência 3 — Maturidade funcional das rotas
- PRD/TECH_SPEC descrevem auth, beta queue, dashboard e backend em `PRD_production.md:28-50` e `TECH_SPEC_production.md:22-68`
- Código atual entrega apenas superfícies visuais estáticas em `src/app/auth/page.tsx:4-25`, `src/app/beta/page.tsx:12-35` e `src/app/dashboard/page.tsx:19-40`

### Divergência 4 — Política de scroll do hero
- Specs recomendam evitar hijacking forte em `HERO_SPEC_smart_pen.md:401-408`
- Hero atual declara hooks `useScrollHijack` e `useSnapScroll` em `src/components/hero/HeroSection.tsx:11-12` e `src/components/hero/HeroSection.tsx:53-68`

## 9. Resumo executivo

Se alguém entrar neste repositório hoje, a leitura correta é:
- este projeto já possui uma landing premium relevante e tecnicamente ambiciosa
- o hero é a parte mais madura e mais próxima do posicionamento desejado
- o fluxo de produto completo ainda não foi implementado
- os specs continuam úteis, mas não substituem a inspeção do código
- a governança documental precisava de uma camada factual, e esta baseline passa a oferecer isso
