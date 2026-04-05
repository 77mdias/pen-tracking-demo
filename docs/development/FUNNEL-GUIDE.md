# Simulated Funnel Guide

PenFlow77 includes a simulated beta funnel that covers the journey from email entry to queue status and a demo dashboard. This document explains how this funnel is implemented and how to maintain it.

## 1. Goal & Philosophy

The goal of the funnel is to provide a **coherent and honest demo experience**.
*   **Coherent:** The pages (`/auth`, `/beta`, `/dashboard`) share state and feel connected.
*   **Honest:** It does not use a real backend, JWT, or database. It explicitly shows a "Demo simulation" badge to manage user expectations.

## 2. Technical Implementation

### 2.1 State Management (`src/lib/funnelStore.ts`)
The core logic resides in a standalone, framework-agnostic module.
*   **Storage:** Uses `localStorage` via the key `penflow77:funnel-state`.
*   **State Shape:** Includes `isSignedIn`, `userEmail`, `displayName`, `betaJoined`, `betaPosition`, etc.
*   **Simulated Actions:**
    *   `simulateSignIn(email)`: Sets the email and display name.
    *   `simulateJoinBeta()`: Generates a random queue position (180–250).

### 2.2 React Context (`src/components/funnel/FunnelProvider.tsx`)
A React Context provider wraps the funnel pages to make the state reactive and accessible via the `useFunnel()` hook.

### 2.3 Page Integration
Each page in the funnel is a Client Component:
*   **`/auth`**: Collects the email, calls `simulateSignIn`, and redirects to `/beta`.
*   **`/beta`**: Displays the user's queue position and allows them to "join" the beta (updating the state).
*   **`/dashboard`**: Shows a personalized greeting and the queue status if the user has joined.

## 3. Handling Edge Cases

The funnel is designed to handle users entering the flow from any page:
*   **Deep Link to `/beta` without state:** Shows an explanation message and a CTA to sign in.
*   **Deep Link to `/dashboard` without state:** Shows a "Dashboard Preview" with static data and a CTA to start the journey.
*   **Signed-in user visiting `/auth`:** Displays a "Welcome back" message instead of the sign-in form.

## 4. Visual Guardrails

Every funnel page includes the `FunnelStatusBadge` component, which displays a "Demo simulation" indicator. This ensures the user is always aware that the experience is a demonstration.

## 5. Future Roadmap

When a real backend is introduced, the transition should be straightforward:
1.  Replace `src/lib/funnelStore.ts` with an API client (e.g., using `Fetch` or `Drizzle`).
2.  Update `FunnelProvider` to handle async loading states.
3.  The UI components consuming `useFunnel()` should remain mostly unchanged if the `FunnelState` interface is preserved.
