/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getFunnelState, setFunnelState, simulateSignIn, simulateJoinBeta, resetFunnelState } from '@/lib/funnelStore';
import type { FunnelState, FunnelStatus } from '@/lib/funnelStore';

interface FunnelContextValue {
  state: FunnelState;
  isHydrated: boolean;
  signIn: (email: string) => void;
  joinBeta: () => void;
  reset: () => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

/**
 * Provide the funnel state to the component tree.
 *
 * This wraps the raw funnelStore in a React-friendly context + state
 * pattern. The `isHydrated` flag prevents hydration mismatch — the
 * initial server render has no access to localStorage, so we wait
 * for the client to read it and update.
 */
export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FunnelState>(() => {
    // Start with defaults on the server; hydrate on the client
    if (typeof window === 'undefined') {
      return {
        isSignedIn: false,
        userEmail: '',
        displayName: '',
        betaJoined: false,
        betaPosition: 0,
        betaWave: 'Waiting',
        joinedAt: '',
        enteredAt: new Date().toISOString(),
        funnelStatus: 'exploring' as FunnelStatus,
      };
    }
    return getFunnelState();
  });

  const [isHydrated, setIsHydrated] = useState(false);

  // Read from localStorage on mount — this is the "hydration" step.
  useEffect(() => {
    setState(getFunnelState());
    setIsHydrated(true);
  }, []);

  const signIn = useCallback((email: string) => {
    const next = simulateSignIn(email);
    setFunnelState(next);
    setState(next);
  }, []);

  const joinBeta = useCallback(() => {
    const next = simulateJoinBeta();
    setFunnelState(next);
    setState(next);
  }, []);

  const reset = useCallback(() => {
    resetFunnelState();
    setState(getFunnelState());
  }, []);

  const value = useMemo<FunnelContextValue>(
    () => ({ state, isHydrated, signIn, joinBeta, reset }),
    [state, isHydrated, signIn, joinBeta, reset],
  );

  return <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>;
}

/**
 * Consume the funnel context.
 * Throws if used outside of a FunnelProvider.
 */
export function useFunnel(): FunnelContextValue {
  const ctx = useContext(FunnelContext);
  if (!ctx) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return ctx;
}

/**
 * Consume the funnel context safely — returns defaults if outside provider.
 * Useful for pages that might be rendered without the provider (e.g., direct access).
 */
export function useFunnelSafe(): FunnelContextValue {
  const ctx = useContext(FunnelContext);
  const defaultState: FunnelState = {
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

  if (!ctx) {
    return {
      state: defaultState,
      isHydrated: true,
      signIn: () => {},
      joinBeta: () => {},
      reset: () => {},
    };
  }

  return ctx;
}
