'use client';

type HeroCTAProps = {
  isMobile?: boolean;
};

export default function HeroCTA({ isMobile = false }: HeroCTAProps) {
  return (
    <div className="hero-cta mt-10 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        {/* Primary — conic-gradient spinning border */}
        <div className="border-gradient-spin">
          <button
            type="button"
            className="relative bg-[#ef233c] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-150 hover:bg-white hover:text-[#ef233c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef233c] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Join the Private Beta
          </button>
        </div>

        {!isMobile ? (
          <button
            type="button"
            className="hero-cta-secondary relative border border-zinc-700 bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-all duration-200 hover:border-[#ef233c] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Watch the Experience
          </button>
        ) : null}
      </div>

      <p className="font-inter text-center text-xs text-zinc-600 uppercase tracking-widest">
        Limited early access to the demo system.
      </p>
    </div>
  );
}
