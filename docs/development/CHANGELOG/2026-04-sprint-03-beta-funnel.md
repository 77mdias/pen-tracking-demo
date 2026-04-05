# 2026-04 Sprint 03 — Beta Funnel Foundation

Data: 2026-04-05
Sprint: SPRINT-03
Fase: PHASE-03
Commits: `789aee5` (código), `97bd641` (documentação)

## Contexto

Esta entrada registra a transformação de `/auth`, `/beta` e `/dashboard` de placeholders estáticos e desconectados em um funil navegável com estado simulado compartilhado.
O objetivo foi criar coerência funcional sem fingir backend, auth ou persistência reais.

## Mudanças registradas

### Novos arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/lib/funnelStore.ts` | Camada de estado simulado — tipos `FunnelState` e `FunnelStatus`, funções `simulateSignIn()`, `simulateJoinBeta()`, `getFunnelState()`, `setFunnelState()`, `resetFunnelState()`. Persistência via localStorage (key: `penflow77:funnel-state`). |
| `src/components/funnel/FunnelProvider.tsx` | React context wrapper — `FunnelProvider`, `useFunnel()`, `useFunnelSafe()`. Hidratação segura com flag `isHydrated`. |
| `src/components/funnel/FunnelStatusBadge.tsx` | Badge visual "Demo simulation" com dot amber — usado em todas as páginas do funil. |

### Páginas reescritas

| Rota | Antes | Depois |
|------|-------|--------|
| `/auth` | Server component estático, botão sem handler | Client component com form de email, validação básica, simulated sign-in → localStorage → redirect `/beta` |
| `/beta` | Server component estático, posição #214 hardcoded | Client com posição dinâmica (gerada 180-250), botão "Join private beta", contexto do usuário, confirmação de join |
| `/dashboard` | Server component estático, cards hardcoded | Client personalizado com greeting do usuário, queue status inline se betaJoined; acesso direto mostra preview + CTA para funil |

### Modelo de estado simulado

```typescript
interface FunnelState {
  isSignedIn: boolean;
  userEmail: string;
  displayName: string;
  betaJoined: boolean;
  betaPosition: number;      // gerado 180-250
  betaWave: string;          // "Wave 1 — Waiting"
  joinedAt: string;          // ISO timestamp
  enteredAt: string;
  funnelStatus: FunnelStatus; // 'exploring' | 'queued' | 'wave-invited' | 'access-granted'
}
```

### Jornada implementada

```
/auth (form email)
  → simulateSignIn(email) → localStorage
  → push /beta

/beta (queue status)
  → lê contexto do localStorage
  → exibe posição dinâmica + nome do usuário
  → botão "Join private beta" → simulateJoinBeta() → localStorage
  → push /dashboard

/dashboard (control center)
  → lê contexto do localStorage
  → se tem contexto: personalized greeting + queue status inline
  → se acesso direto: preview estático + CTA "Start the journey" → /auth
```

### Honestidade do fluxo

- `FunnelStatusBadge` em todas as páginas: "Demo simulation"
- Copy explícita: "This is a simulated experience", "This is a simulated queue"
- Footnote no `/beta`: "Your position is generated locally and is not connected to a real waiting list"
- Dashboard sem contexto: mostra "Dashboard Preview" — não parece rota protegida

### Validação

- `bun run lint`: 0 erros, 106 warnings (preexistentes)
- `npx tsc --noEmit`: 0 erros
- `npx next build`: sucesso, 7 páginas geradas

### Regressões registradas para PHASE-04

1. Alterações no `funnelStore.ts` devem manter compatibilidade com tipos existentes
2. `FunnelProvider` deve envolver conteúdo de cada página do funil
3. Acesso direto a `/dashboard` e `/beta` deve continuar tendo comportamento honesto (preview/explicação)
4. `FunnelStatusBadge` deve permanecer visível em todas as páginas do funil
5. Form de `/auth` deve continuar validando email básico antes de simular sign-in

### Adiado conscientemente

- Autenticação real, JWT, proteção de rota
- Backend NestJS, API REST, Drizzle ORM + PostgreSQL
- Fila persistida, email transacional
- E2E automação do fluxo (PHASE-04)
- Testes automatizados para componentes UI (PHASE-04)

### Implicações operacionais

- Cada página do funil é agora um client component (`'use client'`)
- O `FunnelProvider` é instanciado por página (não há layout compartilhada) — intencional para manter SSG compatível
- Estado persiste via localStorage — sobrevive reload e navegação entre páginas, mas não entre navegadores ou dispositivos
- O módulo `funnelStore.ts` é o único ponto de substituição futura quando backend real for implementado
