'use client';

type HeroCTAProps = {
  isMobile?: boolean;
};

export default function HeroCTA({ isMobile = false }: HeroCTAProps) {
  return (
    <div className="hero-cta mt-10 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          className="hero-cta-primary rounded-xl bg-[#007bff] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-150 hover:bg-white hover:text-[#007bff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
        >
          Join the Private Beta
        </button>

        {!isMobile ? (
          <button
            type="button"
            className="hero-cta-secondary glass-panel rounded-xl border border-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white/70 transition-all duration-150 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
          >
            Watch the Experience
          </button>
        ) : null}
      </div>

      <p className="text-center text-xs text-gray-500">Limited early access to the demo system.</p>
    </div>
  );
}
