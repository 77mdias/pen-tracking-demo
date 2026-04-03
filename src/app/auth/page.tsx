import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 pt-28 pb-12">
      <section className="glass-panel w-full max-w-xl p-8 md:p-10">
        <p className="font-inter mb-4 text-[10px] uppercase tracking-[0.2em] text-[#ef233c]">Access</p>
        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">Sign in to PenFlow77</h1>
        <p className="font-inter mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
          This is the authentication entry point for the private beta experience. Connect your account to keep your beta queue and dashboard in sync.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ef233c]"
          >
            Continue with email
          </button>
          <Link
            href="/beta"
            className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
          >
            View beta status
          </Link>
        </div>
      </section>
    </main>
  );
}
