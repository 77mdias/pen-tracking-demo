'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FunnelProvider, useFunnel } from '@/components/funnel/FunnelProvider';
import FunnelStatusBadge from '@/components/funnel/FunnelStatusBadge';
import AliasLayout from '@/components/alias/AliasLayout';

const AboutSection = dynamic(
  () => import('@/components/about/AboutSection'),
  { ssr: true }
);

const VideoBackground = dynamic(
  () => import('@/components/hero/VideoBackground'),
  { ssr: false, loading: () => null }
);

function BetaContent() {
  const { state, joinBeta, isHydrated } = useFunnel();

  const hasContext = isHydrated && state.isSignedIn;
  const hasJoined = isHydrated && state.betaJoined;

  const displayPosition = hasJoined ? `#${state.betaPosition.toLocaleString()}` : '#—';
  const displayWave = hasJoined ? state.betaWave : 'Waiting';

  return (
    <div className="relative bg-black">
      <VideoBackground className="fixed inset-0 z-0" />
      <div className="relative z-10">
        <AliasLayout showVideo={false}>
          {/* Glass panel form — becomes left column of AliasLayout */}
          <section className="relative w-full bg-black border border-zinc-800 border-dashed rounded-none p-8 md:p-10 group hover:border-[#ef233c]/50 transition-all duration-500">
            {/* Corner markers — DS2 signature */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ef233c]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ef233c]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ef233c]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ef233c]" />
            <div className="mb-6 flex items-center justify-between">
              <FunnelStatusBadge />
              {hasContext && state.displayName && (
                <span className="font-inter text-xs text-zinc-500">
                  {state.displayName}
                </span>
              )}
            </div>

            <p className="font-mono mb-4 text-[10px] uppercase tracking-widest text-[#ef233c] font-bold">[ Private Beta ]</p>
            <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Beta queue status
            </h1>
            <p className="font-inter mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
              {hasContext
                ? `You're in the private beta queue. We'll notify you when it's your turn to access the full dashboard experience.`
                : 'This page shows your position in the private beta queue. Sign in from the auth page to get your personalized queue status.'}
            </p>

            {/* Queue stats */}
            <div className="mt-8 border border-zinc-800 border-dashed bg-black rounded-none">
              <div className="flex items-center justify-between border-b border-zinc-800 border-dashed p-4">
                <span className="font-mono text-[10px] text-[#ef233c] tracking-widest uppercase font-bold">[ Queue Status ]</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#ef233c] animate-pulse rounded-none"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-800 rounded-none"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-800 rounded-none"></div>
                </div>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Current position</p>
                  <p className="font-manrope mt-2 text-5xl font-medium text-white tracking-tighter">
                    {displayPosition}
                  </p>
                </div>
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Wave</p>
                  <p className="font-manrope mt-2 text-5xl font-medium text-white tracking-tighter">
                    {displayWave}
                  </p>
                </div>
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
        </AliasLayout>

        {/* AboutSection below — video bg continues from parent wrapper */}
        <AboutSection variant="home" />
      </div>
    </div>
  );
}

export default function BetaPage() {
  return (
    <FunnelProvider>
      <BetaContent />
    </FunnelProvider>
  );
}
