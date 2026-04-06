'use client';

import Link from 'next/link';
import { FunnelProvider, useFunnel } from '@/components/funnel/FunnelProvider';
import FunnelStatusBadge from '@/components/funnel/FunnelStatusBadge';

const demoCards = [
  { label: 'Device', value: 'Connected', icon: '🖊️' },
  { label: 'Sync', value: 'Active', icon: '🔄' },
  { label: 'AI Assist', value: 'Beta', icon: '✨' },
];

function DashboardContent() {
  const { state, isHydrated } = useFunnel();

  const hasContext = isHydrated && state.isSignedIn;

  // Direct access without funnel context — show preview + CTA
  if (!hasContext) {
    return (
      <main className="bg-black mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 pt-28 pb-12">
        <section className="relative w-full max-w-2xl bg-black border border-zinc-800 border-dashed rounded-none p-8 md:p-10 group hover:border-[#ef233c]/50 transition-all duration-500">
          {/* Corner markers — DS2 signature */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ef233c]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ef233c]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ef233c]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ef233c]" />
          <div className="mb-6 flex items-center justify-between">
            <FunnelStatusBadge />
          </div>
          <p className="font-mono mb-4 text-[10px] uppercase tracking-widest text-[#ef233c] font-bold">[ Dashboard Preview ]</p>
          <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Control center preview
          </h1>
          <p className="font-inter mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            This is a preview of the PenFlow dashboard. To access the full experience, sign in and join the private beta first.
          </p>

          {/* Demo cards — static preview */}
          <section className="mt-8 grid gap-4 sm:grid-cols-3">
            {demoCards.map((card) => (
              <article key={card.label} className="relative bg-black border border-zinc-800 border-dashed rounded-none p-5">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ef233c]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ef233c]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ef233c]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ef233c]" />
                <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">{card.label}</p>
                <p className="font-manrope mt-2 text-2xl font-semibold text-white">{card.value}</p>
              </article>
            ))}
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ef233c]"
            >
              Start the journey
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
            >
              Back to landing
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Has funnel context — show personalized dashboard
  return (
    <main className="bg-black mx-auto min-h-screen w-full max-w-6xl px-6 pt-28 pb-12">
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <FunnelStatusBadge />
          {state.betaJoined && (
            <span className="rounded-none border border-emerald-800/50 bg-emerald-950/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-emerald-400">
              Beta member
            </span>
          )}
        </div>
        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">
          PenFlow control center
        </h1>
        <p className="font-inter mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {state.displayName
            ? `Welcome back, ${state.displayName}. Here&apos;s your pen&apos;s current status.`
            : 'Your pen&apos;s current status.'}
        </p>
      </section>

      {/* Status cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        {demoCards.map((card) => (
          <article key={card.label} className="relative bg-black border border-zinc-800 border-dashed rounded-none p-6">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ef233c]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ef233c]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ef233c]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ef233c]" />
            <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">{card.label}</p>
            <p className="font-manrope mt-2 text-2xl font-semibold text-white">{card.value}</p>
          </article>
        ))}
      </section>

      {/* Queue status inline if joined */}
      {state.betaJoined && (
        <section className="mt-6 border border-zinc-800 bg-black/30 p-5">
          <p className="font-inter mb-3 text-[10px] uppercase tracking-widest text-zinc-500">Beta queue</p>
          <div className="flex items-baseline gap-6">
            <div>
              <p className="font-inter text-xs text-zinc-500">Position</p>
              <p className="font-manrope text-2xl font-semibold text-white">#{state.betaPosition.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-inter text-xs text-zinc-500">Wave</p>
              <p className="font-manrope text-2xl font-semibold text-white">{state.betaWave}</p>
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/beta"
          className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
        >
          Beta queue
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
        >
          Back to landing
        </Link>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <FunnelProvider>
      <DashboardContent />
    </FunnelProvider>
  );
}
