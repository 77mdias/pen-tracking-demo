# PenFlow77

PenFlow77 é uma landing page premium para uma smart pen fictícia com foco em storytelling visual, hero 3D e conversão para uma private beta.

Este repositório nao está no estado descrito pelos specs mais ambiciosos. Hoje, o projeto entrega principalmente a experiência de marketing em `/`, enquanto `/auth`, `/beta` e `/dashboard` existem como rotas visuais estáticas que representam fluxos futuros.

## Estado atual, sem maquiagem

- Landing page principal implementada com hero cinematográfico, camadas visuais, fallback e storytelling abaixo da dobra.
- Stack frontend real já instalada: Next.js 16.2.2, React 19.2.4, TypeScript 5, Tailwind CSS 4, GSAP, Three.js, React Three Fiber e drei.
- Build e deploy preparados para OpenNext + Cloudflare Workers.
- Rotas `/auth`, `/beta` e `/dashboard` existem, mas ainda não são fluxos funcionais de produto.
- Não há evidência de autenticação real, backend NestJS, banco, fila de beta persistida ou envio de email dentro deste snapshot.

Para a leitura operacional correta do projeto, comece por:

- `docs/development/README.md`
- `docs/development/CURRENT-STATE.md`
- `docs/development/ROADMAP.md`
- `docs/development/CHANGELOG.md`

## Rotas e status

| Rota | Status | Observação |
| --- | --- | --- |
| `/` | Implementado | Landing premium com hero 3D/fallback e seções de produto |
| `/auth` | Placeholder | Tela estática de entrada, sem formulário funcional ou integração |
| `/beta` | Placeholder | Estado de fila simulado com valores fixos |
| `/dashboard` | Placeholder | Dashboard visual com cards mockados |

## Stack real do repositório

### Frontend
- Next.js 16.2.2
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- GSAP + `@gsap/react`
- three + `@react-three/fiber` + `@react-three/drei`

### Runtime e deploy
- Bun para execução dos scripts do projeto
- OpenNext para build/adapter do app
- Cloudflare Workers para preview/deploy
- Wrangler para tipagem e configuração do worker

## Scripts reais

```bash
bun run dev         # Desenvolvimento local
bun run build       # Build Next + OpenNext Cloudflare
bun run start       # Inicia o servidor Next em modo produção
bun run lint        # ESLint
bun run preview     # Build + preview via OpenNext/Cloudflare
bun run deploy      # Build + deploy via OpenNext/Cloudflare
bun run upload      # Build + upload via OpenNext/Cloudflare
bun run cf-typegen  # Gera tipos do ambiente Cloudflare
```

## O que este repositório ainda não entrega

Os documentos de produto e de arquitetura descrevem uma visão maior do que o estado atual da implementação. Neste snapshot, os itens abaixo devem ser tratados como planejados ou simulados, não como entregas prontas:

- autenticação real com JWT
- backend NestJS
- banco PostgreSQL/Neon
- fila de beta persistida
- dashboard com dados reais
- notificações por email
- operação contínua madura da governança documental de sprints e tarefas (a camada já existe, mas ainda está em estabilização)

## Onde a documentação operacional mora agora

A documentação de trabalho foi consolidada em `docs/development/`:

- `README.md` — hub documental
- `CURRENT-STATE.md` — leitura factual do que existe hoje
- `ROADMAP.md` — próximos passos em Now / Next / Later
- `CHANGELOG.md` — índice do changelog operacional
- `SPRINTS.md` — índice mestre das sprints
- `TASKS.md` — índice mestre dos phase boards
- `changelog/` — entradas de baseline e evolução documental
- `sprints/` — sprints detalhadas da camada atual
- `tasks/` — boards operacionais por fase/sprint

## Observações importantes

- Os specs em `AGENTS.md`, `PRD_production.md`, `TECH_SPEC_production.md`, `UI_SPEC_production.md` e nos documentos do hero continuam úteis como intenção de produto, mas não devem ser lidos como retrato fiel do código atual.
- Há divergências reais entre spec e implementação, incluindo tokens visuais, tipografia e maturidade funcional das rotas secundárias. Elas estão documentadas em `docs/development/CURRENT-STATE.md`.
- Antes de assumir que uma feature existe, valide no código e no `CURRENT-STATE.md`.
