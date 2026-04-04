# ROADMAP

Este roadmap deriva dos gaps reais do estado atual. Ele não repete entregas já concluídas e não trata placeholders como features prontas.

## Now

### 1. Consolidar a leitura factual do projeto

- manter `docs/development/CURRENT-STATE.md` como referência viva do que existe de fato
- usar o novo README como ponto de entrada honesto para onboarding
- evitar que specs de intenção sejam lidos como se descrevessem a implementação atual

### 2. Fechar as divergências mais críticas entre spec e implementação

- decidir se o design system documentado será atualizado para refletir o CSS real ou se o CSS real será ajustado para refletir o design system pretendido
- revisar a divergência de tipografia entre `AGENTS.md` e `src/app/globals.css`
- revisar a divergência de cor base entre `AGENTS.md` e `src/app/globals.css`
- validar se o comportamento de scroll do hero está consistente com a diretriz de evitar hijacking excessivo
- alinhar a nomenclatura de deploy entre `penflow77` e `pen-tracking-demo`

### 3. Estabelecer uma baseline mínima de qualidade

- definir como verificar o frontend além de lint
- introduzir pelo menos smoke tests para as rotas principais ou documentar explicitamente a ausência dessa camada
- documentar critérios objetivos de validação para landing, hero, reduced motion e breakpoints críticos

## Next

### 1. Transformar placeholders em fluxos minimamente funcionais

- converter `/auth` de tela estática para fluxo real ou simulado de autenticação com comportamento verificável
- converter `/beta` de estado fixo para fila simulada consistente
- converter `/dashboard` de cards mockados para uma experiência conectada ao estado do usuário ou a uma camada de simulação mais robusta

### 2. Reconciliar specs de produto com o código vivo

- atualizar `AGENTS.md`, PRD e documentos do hero onde eles já não refletem o estado da stack ou da UI
- separar de forma mais explícita o que é visão aspiracional do que é baseline entregue
- reduzir ambiguidades sobre quais partes do projeto são marketing demo e quais partes são produto simulado

### 3. Formalizar governança de execução

- operar a nova camada de `SPRINTS` como índice e plano de execução derivado do roadmap
- operar e manter os documentos de `TASKS` por sprint/fase com dono, cadência e critérios claros de atualização
- conectar roadmap, changelog e execução sem duplicação de informação

## Later

### 1. Implementar o escopo de produto descrito no TECH_SPEC, se continuar válido

- backend/API real
- auth com sessão/JWT
- persistência de beta queue
- dashboard com dados reais ou semi-reais
- notificações por email

### 2. Endurecer operação e deploy

- revisar a configuração OpenNext/Cloudflare para naming, ambientes e documentação operacional
- ampliar a documentação de deploy, rollback e variáveis de ambiente quando essa complexidade existir de fato

### 3. Evoluir a documentação para um sistema contínuo

- manter entradas de changelog por marco relevante
- adicionar runbooks operacionais quando houver processos recorrentes suficientes para justificar isso
- expandir docs de desenvolvimento sem voltar a cair em documentação aspiracional desconectada do código
