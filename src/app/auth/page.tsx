'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FunnelProvider, useFunnel } from '@/components/funnel/FunnelProvider';
import FunnelStatusBadge from '@/components/funnel/FunnelStatusBadge';
import AliasLayout from '@/components/alias/AliasLayout';

function AuthContent() {
  const { state, signIn, isHydrated } = useFunnel();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter an email address.');
      return;
    }

    // Basic email shape check — this is a demo, no real validation needed
    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief "processing" delay for realism
    setTimeout(() => {
      signIn(trimmed);
      router.push('/beta');
    }, 600);
  };

  // Already signed in — show welcome + nav
  if (isHydrated && state.isSignedIn) {
    return (
      <AliasLayout>
        <section className="relative w-full bg-black border border-zinc-800 border-dashed rounded-none p-8 md:p-10 group hover:border-[#ef233c]/50 transition-all duration-500">
          {/* Corner markers — DS2 signature */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ef233c]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ef233c]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ef233c]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ef233c]" />
          <div className="mb-6 flex items-center justify-between">
            <FunnelStatusBadge />
          </div>
          <p className="font-mono mb-4 text-[10px] uppercase tracking-widest text-[#ef233c] font-bold">[ Access ]</p>
          <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Welcome back{state.displayName ? `, ${state.displayName}` : ''}
          </h1>
          <p className="font-inter mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
            You&apos;re already signed in as <span className="text-zinc-200">{state.userEmail}</span>.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/beta"
              className="inline-flex items-center justify-center border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ef233c]"
            >
              Continue to beta
            </Link>
            <button
              type="button"
              onClick={() => {
                router.push('/');
              }}
              className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
            >
              Back to landing
            </button>
          </div>
        </section>
      </AliasLayout>
    );
  }

  // Sign-in form
  return (
    <AliasLayout>
      <section className="relative w-full bg-black border border-zinc-800 border-dashed rounded-none p-8 md:p-10 group hover:border-[#ef233c]/50 transition-all duration-500">
        {/* Corner markers — DS2 signature */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ef233c]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ef233c]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ef233c]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ef233c]" />
        <div className="mb-6 flex items-center justify-between">
          <FunnelStatusBadge />
        </div>
        <p className="font-mono mb-4 text-[10px] uppercase tracking-widest text-[#ef233c] font-bold">[ Access ]</p>
        <h1 className="font-manrope text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Sign in to PenFlow77
        </h1>
        <p className="font-inter mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
          Enter your email to start the private beta demo. This is a simulated experience — no account is created or stored.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email-input" className="font-inter mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-400">
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-none border border-zinc-700 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c]"
              required
            />
            {error && (
              <p className="font-inter mt-2 text-xs text-[#ef233c]" role="alert">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-[#ef233c] bg-[#ef233c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-150 hover:bg-transparent hover:text-[#ef233c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef233c] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Continue with email'}
          </button>
        </form>

        <div className="mt-6">
          <Link
            href="/beta"
            className="inline-flex w-full items-center justify-center border border-zinc-700 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
          >
            Skip to beta status
          </Link>
        </div>
      </section>
    </AliasLayout>
  );
}

export default function AuthPage() {
  return (
    <FunnelProvider>
      <AuthContent />
    </FunnelProvider>
  );
}
