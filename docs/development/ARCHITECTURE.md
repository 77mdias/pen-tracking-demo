# Architecture Overview

This document describes the high-level architecture of PenFlow77, its technical stack, and how different layers interact.

## 1. Technical Stack

*   **Framework:** Next.js 16.2.2 (App Router)
*   **Language:** TypeScript 5
*   **Styling:** Tailwind CSS 4
*   **Animations:** GSAP 3 + `@gsap/react`
*   **3D Rendering:** Three.js + `@react-three/fiber` (R3F) + `@react-three/drei`
*   **Deployment:** Cloudflare Workers via OpenNext
*   **State Management:** React Context + `localStorage` (Simulated Funnel)

## 2. Project Layers

### 2.1 Core Application (`src/app`)
*   **Landing (`/`):** The primary experience. Orchestrates the Hero and Product sections.
*   **Funnel (`/auth`, `/beta`, `/dashboard`):** A simulated journey from email entry to queue status and a demo dashboard.

### 2.2 Components (`src/components`)
*   **Hero (`/hero`):** Complex 3D/GSAP orchestration. Includes the R3F canvas, fallbacks, and content.
*   **Funnel (`/funnel`):** UI components specific to the simulated funnel (e.g., status badges, providers).
*   **Layout (`/layout`):** Shared layout components (Header, Footer).
*   **Product Intro (`/product-intro`):** Narrative sections below the Hero.

### 2.3 Hooks (`src/hooks`)
*   Custom hooks handle complex logic like device capability detection, scroll progress tracking, GSAP timelines, and R3F integration.
*   Example: `useDeviceCapabilities` determines if the user's device can handle the 3D experience.

### 2.4 State & Lib (`src/lib`)
*   **Funnel Store (`/funnelStore.ts`):** A dedicated logic layer for the simulated funnel state.
*   **Three.js Utils (`/three`):** Helper functions and constants for the 3D scene (poses, math).

## 3. Interaction Patterns

### 3.1 3D & Scroll Integration
The project uses a "Sticky Hero" pattern where the 3D scene stays fixed while the user scrolls through different narrative content. GSAP is used to interpolate between different "Pen Poses" (defined in `src/lib/three/penPoses.ts`) based on the scroll progress.

### 3.2 Simulated State
The funnel state is kept in a React Context (`FunnelProvider`) which persists to `localStorage`. This allows the `/auth`, `/beta`, and `/dashboard` pages to feel connected without a real backend.

## 4. Performance & Adaptability

The application is designed to be "resilient" by:
1.  **Device Tiering:** Detecting GPU capabilities and adjusting the 3D scene (Max DPR, shadows, resolution).
2.  **Fallbacks:** Providing a static/video fallback if WebGL is not supported.
3.  **Acessibility:** Respecting `prefers-reduced-motion` by disabling complex transitions and 3D movement.

## 5. Development Workflow

The project follows a structured "Agent OS" workflow:
*   **Phases:** High-level milestones (e.g., Phase 03: Beta Funnel Foundation).
*   **Sprints:** Focused periods of development (e.g., Sprint 03).
*   **Tasks:** Atomic units of work with binary acceptance criteria.

All operational documentation is kept in `docs/development/`.
