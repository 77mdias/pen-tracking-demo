'use client';

import Link from 'next/link';
import { FunnelProvider, useFunnel } from '@/components/funnel/FunnelProvider';
import FunnelStatusBadge from '@/components/funnel/FunnelStatusBadge';

function BetaContent() {
  const { state, joinBeta, isHydrated } = useFunnel();

  const hasContext = isHydrated && state.isSignedIn;
  const hasJoined = isHydrated && state.betaJoined;

  // Position: use real simulated value if joined, otherwise show placeholder
  const displayPosition = hasJoined ? `#${state.betaPosition.toLocaleString()}` : '#—';
  const displayWave = hasJoined ? state.betaWave : 'Waiting';

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 pt-28 pb-12">
      <section className="glass-panel w-full max-w-2xl p-8 md:p-10">
        <div className="mb-6 flex items-center justify-between">
          <FunnelStatusBadge />
          {hasContext && state.displayName && (
            <span className="font-inter text-xs text-zinc-500">
              {state.displayName}
            </span>
          )}
        </div>

        <p className="font-inter mb-4 text-[10px] uppercase tracking-[0.2em] text-[#ef233c]">Private Beta</p>
        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Beta queue status
        </h1>
        <p className="font-inter mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
          {hasContext
            ? `You're in the private beta queue. We'll notify you when it's your turn to access the full dashboard experience.`
            : 'This page shows your position in the private beta queue. Sign in from the auth page to get your personalized queue status.'}
        </p>

        {/* Queue stats */}
        <div className="mt-8 grid gap-4 border border-zinc-800 bg-black/40 p-5 sm:grid-cols-2">
          <div>
            <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Current position</p>
            <p className="font-manrope mt-2 text-4xl font-semibold text-white">
              {displayPosition}
            </p>
          </div>
          <div>
            <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Wave</p>
            <p className="font-manrope mt-2 text-4xl font-semibold text-white">
              {displayWave}
            </p>
          </div>
        </div>

        {/* Joined confirmation */}
        {hasJoined && state.joinedAt && (
          <div className="mt-4 rounded-sm border border-emerald-800/50 bg-emerald-950/30 px-4 py-3">
            <p className="font-inter text-xs text-emerald-300/80">
              ✓ Joined on {new Date(state.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        )}

        {/* CTA area */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {hasContext && !hasJoined ? (
            <button
              type="button"
              onClick={() => joinBeta()}
              className="border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ef233c]"
            >
              Join private beta
            </button>
          ) : hasJoined ? (
            <div className="rounded-sm border border-zinc-700 bg-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              ✓ Already joined
            </div>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center justify-center border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ef233c]"
            >
              Sign in to join
            </Link>
          )}

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
          >
            Open dashboard
          </Link>
        </div>

        {/* Honesty footnote */}
        <p className="font-inter mt-6 text-[11px] leading-relaxed text-zinc-600">
          This is a simulated queue. Your position is generated locally and is not connected to a real waiting list or server.
        </p>
      </section>
    </main>
  );
}

export default function BetaPage() {
  return (
    <FunnelProvider>
      <BetaContent />
    </FunnelProvider>
  );
}
