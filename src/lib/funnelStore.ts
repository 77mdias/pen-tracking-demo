/**
 * Simulated funnel state store.
 *
 * This module provides a minimal, localStorage-backed state layer that
 * connects /auth, /beta, and /dashboard into a coherent demo funnel.
 *
 * It is intentionally NOT connected to any real backend, API, or queue.
 * All state is generated client-side for demonstration purposes.
 *
 * Future integration point: replace this entire module with a real
 * API client + session management without changing the consuming pages.
 */

const STORAGE_KEY = 'penflow77:funnel-state';

export type FunnelStatus = 'exploring' | 'queued' | 'wave-invited' | 'access-granted';

export interface FunnelState {
  /** Whether the user has "signed in" through /auth */
  isSignedIn: boolean;
  /** Simulated email — never sent anywhere */
  userEmail: string;
  /** Display name derived from email or default */
  displayName: string;
  /** Whether the user clicked "Join private beta" */
  betaJoined: boolean;
  /** Simulated queue position (generated on join) */
  betaPosition: number;
  /** Access wave label */
  betaWave: string;
  /** ISO timestamp of when the user joined the beta */
  joinedAt: string;
  /** When the user first entered the funnel */
  enteredAt: string;
  /** Overall funnel status label */
  funnelStatus: FunnelStatus;
}

const DEFAULT_STATE: FunnelState = {
  isSignedIn: false,
  userEmail: '',
  displayName: '',
  betaJoined: false,
  betaPosition: 0,
  betaWave: 'Waiting',
  joinedAt: '',
  enteredAt: new Date().toISOString(),
  funnelStatus: 'exploring',
};

function generatePosition(): number {
  // Simulated position between 180–250 — looks plausible without being real
  return Math.floor(Math.random() * 71) + 180;
}

function deriveDisplayName(email: string): string {
  if (!email) return '';
  const local = email.split('@')[0];
  return local.charAt(0).toUpperCase() + local.slice(1);
}

/**
 * Read the current funnel state from localStorage.
 * Returns the default state if nothing is stored or if parsing fails.
 */
export function getFunnelState(): FunnelState {
  if (typeof window === 'undefined') return DEFAULT_STATE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw) as Partial<FunnelState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

/**
 * Persist the full funnel state to localStorage.
 */
export function setFunnelState(state: FunnelState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Reset the funnel state to defaults (e.g., for testing or "sign out").
 */
export function resetFunnelState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Simulate signing in: accept an email and transition to the funnel.
 * Returns the updated state — does NOT persist (caller should call setFunnelState).
 */
export function simulateSignIn(email: string): FunnelState {
  const existing = getFunnelState();
  return {
    ...existing,
    isSignedIn: true,
    userEmail: email,
    displayName: deriveDisplayName(email),
    enteredAt: existing.enteredAt || new Date().toISOString(),
    funnelStatus: 'exploring' as FunnelStatus,
  };
}

/**
 * Simulate joining the private beta.
 * Generates a plausible queue position and wave label.
 */
export function simulateJoinBeta(): FunnelState {
  const existing = getFunnelState();
  if (!existing.isSignedIn) return existing; // can't join without "signing in"

  return {
    ...existing,
    betaJoined: true,
    betaPosition: generatePosition(),
    betaWave: 'Wave 1 — Waiting',
    joinedAt: new Date().toISOString(),
    funnelStatus: 'queued' as FunnelStatus,
  };
}
