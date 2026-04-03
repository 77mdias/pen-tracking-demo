import Link from "next/link";

export default function BetaPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 pt-28 pb-12">
      <section className="glass-panel w-full max-w-2xl p-8 md:p-10">
        <p className="font-inter mb-4 text-[10px] uppercase tracking-[0.2em] text-[#ef233c]">Private Beta</p>
        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">Beta queue status</h1>
        <p className="font-inter mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
          This page represents the private beta funnel from the PRD. Users can join the queue and monitor their access wave before entering the full dashboard experience.
        </p>

        <div className="mt-8 grid gap-4 border border-zinc-800 bg-black/40 p-5 sm:grid-cols-2">
          <div>
            <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Current position</p>
            <p className="font-manrope mt-2 text-4xl font-semibold text-white">#214</p>
          </div>
          <div>
            <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Wave</p>
            <p className="font-manrope mt-2 text-4xl font-semibold text-white">Waiting</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ef233c]"
          >
            Join private beta
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
          >
            Open dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
