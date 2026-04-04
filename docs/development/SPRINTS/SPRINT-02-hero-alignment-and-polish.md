---
title: Sprint 02 - Hero Alignment and Polish
type: sprint
mode: sprint
approach: tdd-first
status: planned
---

# Sprint SPRINT-02 — Hero Alignment and Polish

## 1. Objetivo

Alinhar o hero premium do PenFlow77 ao design system pretendido, à política de motion e às experiências de mobile, fallback e reduced motion, preservando o valor já entregue na landing e removendo os principais pontos de desalinhamento entre spec e experiência real.

> Entrega verificável: o hero fica visualmente e comportamentalmente mais consistente com a baseline de marca, a navegação não transmite hijacking excessivo, reduced motion e fallback parecem experiências intencionais, e os critérios de validação para desktop, tablet e mobile ficam explícitos.

---

## 2. Resumo Executivo

- **Tipo da sprint:** feature / polish / refactor
- **Modo principal do Agent OS:** frontend
- **Fase relacionada:** Fase 02 — Hero como experiência premium confiável
- **Status:** Planejada
- **Prioridade:** Alta
- **Owner principal:** agent
- **Dependências externas:** auditoria da SPRINT-01; specs do hero; design system em `AGENTS.md`
- **Janela estimada:** 2–4 dias

---

## 3. Contexto

- **Problema atual:** o hero já é a parte mais madura do projeto, mas convive com divergências reais em tokens/typography, dúvidas sobre política de scroll e necessidade de validação mais forte em mobile, reduced motion e fallback.
- **Impacto no sistema/produto:** como o hero é o centro emocional da landing, qualquer desalinhamento visual, de motion ou de acessibilidade afeta diretamente a percepção premium e a conversão para private beta.
- **Riscos envolvidos:** degradar a experiência atual em nome de alinhamento teórico, introduzir regressões de performance, quebrar fallback/mobile ou manter scroll excessivamente intrusivo.
- **Áreas afetadas:** `src/components/hero/*`, hooks de hero/scroll, `src/app/globals.css`, possivelmente `src/app/layout.tsx` e artefatos de mídia/fallback conforme necessário.
- **Fluxos de usuário impactados:** primeira impressão da landing, leitura do produto acima da dobra, transição do hero para o storytelling, navegação em reduced motion e navegação em dispositivos sem WebGL adequado.
- **Premissas importantes:** o hero atual já usa Canvas, vídeo, fallback, adaptação por device tier e reduced motion; o trabalho não é recomeçar do zero, e sim alinhar e polir o que já existe.
- **Fora de escopo nesta sprint:** implementação de backend, criação do funil completo de `/auth`/`/beta`/`/dashboard`, introdução de pós-processamento pesado ou reescrita total da landing.

---

## 4. Critérios de Sucesso

- [ ] Tokens visuais críticos do hero e da landing acima da dobra deixam de divergir materialmente do design system decidido.
- [ ] A tipografia principal do hero fica coerente com a direção definida após a auditoria.
- [ ] O comportamento de scroll do hero é validado e, se necessário, reduzido para evitar sensação de trava ou sequestro de navegação.
- [ ] Reduced motion, mobile e fallback entregam uma experiência deliberada, legível e premium mesmo sem a coreografia completa.
- [ ] Qualquer impacto de naming/configuração de deploy que afete experiência pública ou percepção operacional é endereçado ou formalmente adiado com justificativa.

---

## 5. Dependências e Sequenciamento

### Dependências de entrada
- [ ] Auditoria da SPRINT-01 concluída
- [ ] Decisão sobre alinhar código ao spec ou ajustar o próprio spec para tokens/typography
- [ ] Critérios mínimos de validação por breakpoint definidos
- [ ] Lista de gaps reais do hero consolidada

### Ordem macro recomendada
1. Confirmar gaps de hero vindos da auditoria
2. Definir comportamento alvo por desktop/tablet/mobile/reduced motion/fallback
3. Escrever testes e checklists RED
4. Implementar ajustes mínimos em tokens, typography, motion e fallback
5. Refatorar nomes, constantes e configuração se necessário
6. Validar manualmente com smoke checks e lint

### Paralelização possível
- Ajustes de design tokens e tipografia
- Ajustes de motion/scroll
- Ajustes de fallback, reduced motion e mobile

### Caminho crítico
- Decisão de design system
- Validação da política de scroll
- Garantia de experiência premium sem animação

---

## 6. Etapa 1 — Discovery Técnico

### Objetivo
Validar, no código e no comportamento, onde o hero atual precisa de alinhamento real.

### Checklist
- [ ] Revisar `HeroSection`, `HeroContent`, `HeroFallback`, `HeroCanvas`, `HeroScrollCue` e hooks associados
- [ ] Revisar `globals.css` e demais tokens usados acima da dobra
- [ ] Identificar classes/fontes divergentes da direção de marca
- [ ] Confirmar o papel de `useScrollHijack` e `useSnapScroll` na experiência real
- [ ] Revisar comportamento quando `reducedMotion` está ativo
- [ ] Revisar experiência em mobile/tablet e fallback sem WebGL
- [ ] Revisar se naming/config de deploy interfere em assets, branding ou ambiente de preview

### Saída esperada
- Lista objetiva de gaps do hero por categoria
- Critérios claros de comportamento por breakpoint e modo de motion
- Mapa de arquivos realmente impactados
- Riscos de regressão identificados

---

## 7. Etapa 2 — Design de Comportamento e Estratégia de Testes

### Objetivo
Definir a experiência alvo do hero antes de alterar o código.

### Checklist
- [ ] Definir como o hero deve se comportar em desktop premium
- [ ] Definir o que deve mudar em tablet e mobile
- [ ] Definir a experiência target para reduced motion
- [ ] Definir a experiência target para fallback sem WebGL
- [ ] Definir o limite aceitável de snap/hijack de scroll
- [ ] Definir critérios visuais mínimos para copy, CTA e legibilidade
- [ ] Definir estratégia de validação manual e automática disponível

### Casos de teste planejados
- [ ] Cenário 1: desktop com WebGL e pointer fino exibe hero premium fluido sem prender o usuário em scroll excessivo.
- [ ] Cenário 2: mobile não tenta comprimir a coreografia desktop; mantém CTA, conteúdo e sensação premium com layout adequado.
- [ ] Cenário 3: reduced motion mostra conteúdo imediatamente e mantém o produto legível e convincente.
- [ ] Cenário 4: fallback sem WebGL continua intencional, sem parecer erro de renderização.
- [ ] Edge case 1: dispositivo tier baixo não tenta renderizar motion cara além do necessário.
- [ ] Regressão 1: ajustes de tokens e tipografia não quebram contraste, hierarquia ou CTA.

### Matriz de testes
| Tipo | Escopo | Obrigatório? | Observações |
|------|--------|--------------|-------------|
| Unitário | hooks/utilitários de hero, se existirem testes | Não inicialmente | Só criar se a sprint introduzir infraestrutura de teste adequada. |
| Integração | comportamento do hero e composição de camadas | Sim | Pode começar por smoke/manual até a baseline automatizada existir. |
| E2E | landing acima da dobra | Desejável | Formalizar em SPRINT-04, mas já definir cenários agora. |
| Regressão | scroll, reduced motion, fallback e CTA | Sim | Mesmo que manual nesta fase. |
| Auth/AuthZ | N/A | Não | Não se aplica ao hero. |

---

## 8. Etapa 3 — Testes Primeiro (TDD)

### Objetivo
Definir sinais observáveis de sucesso antes da implementação do polish.

### Checklist
- [ ] Registrar checklist RED por viewport: 375px, 768px, 1024px e 1440px
- [ ] Registrar checklist RED para reduced motion ligado
- [ ] Registrar checklist RED para fallback/sem WebGL ou tier baixo
- [ ] Identificar o comportamento atual de scroll a ser comparado
- [ ] Identificar assets, cópia e CTA que não podem regredir
- [ ] Priorizar testes manuais/smoke honestos se a automação ainda não existir

### Testes a implementar primeiro
- [ ] Teste unitário: utilitários de motion/config, se forem extraídos ou alterados.
- [ ] Teste de integração: renderização do hero com e sem fallback, quando houver harness disponível.
- [ ] Teste de regressão: checklist manual do comportamento de scroll, CTA visível e legibilidade por breakpoint.
- [ ] Teste de autorização/autenticação: não aplicável.
- [ ] Teste de edge case: reduced motion e device tier baixo.
- [ ] Teste de contrato/API: não aplicável.

### Evidência RED
- **Comando executado:** baseline manual do hero em viewports e modos relevantes; lint do repositório antes de mudanças maiores.
- **Falha esperada observada:** divergências conhecidas de tokens/tipografia e necessidade de validar scroll, fallback e reduced motion contra os specs.
- **Observações:** enquanto não houver suite de UI formal, a evidência RED é operacional/manual e deve ser registrada com clareza.

---

## 9. Etapa 4 — Implementação

### Objetivo
Ajustar apenas o necessário para que o hero fique alinhado, estável e premium.

### Checklist
- [ ] Atualizar tokens e typography do hero conforme decisão da auditoria
- [ ] Ajustar comportamento de scroll se houver sensação de hijack excessivo
- [ ] Ajustar reduced motion para conteúdo imediatamente disponível
- [ ] Ajustar fallback para parecer intencional e não degradado
- [ ] Ajustar mobile/tablet sem tentar reproduzir a coreografia desktop por inteiro
- [ ] Revisar nomenclatura/configuração ligada à experiência, se relevante
- [ ] Atualizar documentação mínima impactada

### Regras obrigatórias
- Não reimplementar o hero inteiro se o problema for de alinhamento pontual.
- Não deixar duas estratégias de animação competirem no mesmo elemento.
- Não introduzir regressões visuais no CTA principal.
- Não comprometer performance para perseguir fidelity desnecessária.
- Se não houver automação suficiente, compensar com checklists manuais explícitos.
- Toda correção de comportamento relevante deve virar caso de regressão para SPRINT-04.

### Mudanças previstas
- **Backend:** nenhuma
- **API:** nenhuma
- **Frontend:** componentes do hero, hooks de scroll/motion, tokens globais e possíveis ajustes de layout acima da dobra
- **Banco/Schema:** nenhuma
- **Infra/Config:** eventual ajuste de naming/config apenas se afetar experiência pública ou consistência operacional
- **Docs:** atualização de critérios de validação e, se necessário, do resultado da auditoria

---

## 10. Etapa 5 — Refatoração

### Objetivo
Deixar o hero mais legível e configurável sem alterar o comportamento validado.

### Checklist
- [ ] Centralizar constantes novas ou dispersas
- [ ] Refinar nomes de hooks/configs ambíguos
- [ ] Remover duplicação entre variantes desktop/mobile/fallback
- [ ] Garantir que o reduced motion não fique dependente de lógica espalhada
- [ ] Garantir que ajustes de typography/tokens não introduzam inconsistência em outros componentes
- [ ] Rodar validação novamente após refactor

### Saída esperada
- Hero mais fácil de manter
- Melhor correspondência entre intenção visual e implementação
- Menos risco de regressão em alterações futuras

---

## 11. Etapa 6 — Validação, QA e Rollout

### Testes obrigatórios finais
- [ ] Executar lint
- [ ] Executar build se a sprint tocar comportamento crítico de produção
- [ ] Validar desktop em 1440px e 1024px
- [ ] Validar tablet em 768px
- [ ] Validar mobile em 375px
- [ ] Validar reduced motion e fallback/manual smoke

### Comandos finais
```bash
bun run lint
bun run build
```

### Rollout
- **Estratégia de deploy:** liberar como melhoria incremental da landing principal.
- **Uso de feature flag:** não previsto inicialmente; usar branch/worktree e validação manual forte antes do merge.
- **Plano de monitoramento pós-release:** revisar hero em produção/preview em múltiplos breakpoints e dispositivos de referência.
- **Métricas a observar:** legibilidade do hero, estabilidade do scroll, percepção premium, taxa de regressão visual.
- **Alertas esperados:** jitter, travamento em scroll, CTA menos visível, fallback degradado ou regressão de mobile.

### Responsáveis
- **Backend:** não aplicável
- **Frontend:** owner do hero
- **QA:** QA manual / agent
- **Produto:** owner da experiência da landing
- **Release/Deploy:** maintainer do projeto

### Janela de deploy
- **Horário recomendado:** janela com disponibilidade para validação manual imediata
- **Tempo de monitoramento:** pelo menos 30–60 minutos após publicar preview/release

---

## 12. Checkpoints do Agent OS

- [ ] Checkpoint 1 — Discovery validado
- [ ] Checkpoint 2 — Estratégia de testes aprovada
- [ ] Checkpoint 3 — RED tests concluídos
- [ ] Checkpoint 4 — GREEN alcançado
- [ ] Checkpoint 5 — Refatoração concluída
- [ ] Checkpoint 6 — Validação final concluída

### Log resumido dos checkpoints
| Checkpoint | Responsável | Resultado | Observações |
|-----------|-------------|-----------|-------------|
| Gaps do hero | agent | Pendente | Confirmar quais divergências são de código vs spec |
| Implementação mínima | agent | Pendente | Ajustar sem reescrever a experiência |
| QA final | agent + owner | Pendente | Validar 375, 768, 1024 e 1440 com motion e fallback |

---

## 13. Checklist de Homologação

| Cenário | Resultado esperado | Evidência | Status |
| ------- | ------------------ | --------- | ------ |
| Desktop premium | hero fluido, legível e sem hijack excessivo | validação manual / preview | Pendente |
| Mobile | layout intencional, CTA visível e sem tentativa de coreografia desktop | validação manual / preview | Pendente |
| Reduced motion | conteúdo aparece sem animação dependente | validação manual | Pendente |
| Fallback | experiência parece premium mesmo sem WebGL principal | validação manual | Pendente |
| Tokens e typography | acima da dobra segue a direção decidida | comparação visual e revisão de código | Pendente |

---

## 14. Plano de Rollback

### Gatilhos
- Queda perceptível da qualidade do hero
- Regressão de mobile ou fallback
- Scroll mais intrusivo do que antes
- Build quebrando ou performance piorando de forma material
- CTA ou conteúdo principal ficando menos legível

### Passos
1. Reverter as mudanças do hero para a versão estável anterior
2. Executar smoke check da landing após a reversão
3. Confirmar restauração de desktop, mobile, reduced motion e fallback
4. Registrar qual ajuste causou a regressão
5. Replanejar correção em escopo menor

### Responsáveis
- **Execução técnica:** owner do frontend / agent
- **Revalidação:** QA manual
- **Comunicação:** responsável pela release

### RTO
- Até 30 minutos

---

## 15. Critérios de Aceite

- [ ] Gaps reais do hero foram atacados e não substituídos por reescrita genérica
- [ ] Scroll foi validado contra a diretriz de evitar hijacking excessivo
- [ ] Reduced motion, mobile e fallback foram tratados como experiências de primeira classe
- [ ] Tokens e tipografia seguem a direção decidida
- [ ] Checklist manual executado
- [ ] Rollback definido
- [ ] Documentação mínima atualizada
- [ ] Critérios de sucesso da sprint foram atingidos

---

## 16. Definition of Done

A sprint só pode ser considerada concluída quando:

- [ ] O hero estiver alinhado ao baseline visual/comportamental decidido
- [ ] Os principais breakpoints tiverem sido validados
- [ ] Reduced motion e fallback tiverem smoke checks claros
- [ ] Não houver regressão visível crítica na landing
- [ ] Casos de regressão relevantes estiverem preparados para formalização em SPRINT-04

---

## 17. Instrução padrão para AGENTS.md

```text
When planning or implementing hero work in PenFlow77, always treat the hero as an existing premium experience that needs alignment and polish, not blind reconstruction.

Mandatory rules:
- validate scroll behavior against the “no heavy hijacking” guidance
- preserve premium quality even with reduced motion enabled
- keep mobile and fallback intentional instead of compressed desktop choreography
- align tokens and typography according to the decided design-system source of truth
- record any important hero regressions as candidates for future smoke or automated coverage
```
