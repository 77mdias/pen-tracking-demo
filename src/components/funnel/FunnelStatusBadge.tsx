'use client';

/**
 * A subtle badge that communicates this page is part of a simulated demo.
 * Placed at the top of each funnel page to maintain honesty about the
 * absence of real backend/auth/queue systems.
 */
export default function FunnelStatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
      <span className="h-1 w-1 rounded-full bg-amber-400/80" />
      Demo simulation
    </span>
  );
}
