# 2026-04 Baseline

Data: 2026-04-03

## Contexto

Esta entrada registra o baseline atual do projeto PenFlow77 e a criação da camada inicial de documentação operacional em `docs/development/`.

## Baseline do produto/código

No momento desta baseline:
- a entrega principal do repositório é a landing page em `/`
- o hero premium já existe com abordagem visual avançada e adaptação por fallback/device tier
- há storytelling de produto abaixo do hero
- as rotas `/auth`, `/beta` e `/dashboard` existem como superfícies visuais estáticas
- o build/deploy está preparado para OpenNext + Cloudflare
- não há base evidenciada de auth real, backend, banco, fila persistida ou email operacional dentro deste snapshot

## Baseline de stack

Stack observável nesta baseline:
- Next.js 16.2.2
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- GSAP
- three / React Three Fiber / drei
- Bun
- OpenNext + Cloudflare Workers

## Baseline documental criada nesta mudança

Esta baseline substitui o README boilerplate e introduz a primeira camada de documentação operacional e de execução:
- `README.md`
- `docs/development/README.md`
- `docs/development/CURRENT-STATE.md`
- `docs/development/ROADMAP.md`
- `docs/development/CHANGELOG.md`
- `docs/development/changelog/README.md`
- `docs/development/changelog/2026-04-baseline.md`
- `docs/development/SPRINTS.md`
- `docs/development/TASKS.md`
- `docs/development/sprints/`
- `docs/development/tasks/`

## Leituras operacionais estabelecidas

A partir desta baseline:
- `CURRENT-STATE` passa a ser a referência factual do que existe
- `ROADMAP` passa a concentrar próximos passos em `Now / Next / Later`
- `CHANGELOG` passa a registrar baselines e mudanças relevantes
- `SPRINTS` passa a ser a fonte canônica da convenção de sprints desta camada
- `TASKS` passa a ser a fonte canônica da convenção de phase boards desta camada
- specs de produto e hero continuam válidos como intenção, mas não substituem o estado real do código

## Divergências explicitadas por esta baseline

Esta documentação passa a deixar explícito que:
- a maturidade real do projeto está concentrada na landing e no hero
- as rotas secundárias ainda são placeholders
- há divergências entre spec e implementação em tokens, tipografia e escopo funcional
- a documentação anterior não separava com clareza realidade implementada de intenção de produto

