import Link from "next/link";

const cards = [
  { label: "Device", value: "Connected" },
  { label: "Sync", value: "Active" },
  { label: "AI", value: "Beta" },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 pt-28 pb-12">
      <section className="mb-8">
        <p className="font-inter mb-4 text-[10px] uppercase tracking-[0.2em] text-[#ef233c]">Dashboard</p>
        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">PenFlow control center</h1>
        <p className="font-inter mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Simulated dashboard state described in the technical spec. This route serves as the product destination after beta access.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="glass-panel p-6">
            <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">{card.label}</p>
            <p className="font-manrope mt-2 text-2xl font-semibold text-white">{card.value}</p>
          </article>
        ))}
      </section>

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
