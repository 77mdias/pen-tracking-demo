'use client';

import HeroCTA from "@/components/hero/HeroCTA";

type HeroContentProps = {
  isMobile?: boolean;
  isTablet?: boolean;
};

export default function HeroContent({ isMobile = false, isTablet = false }: HeroContentProps) {
  const subheadline = isMobile
    ? "Premium writing precision with an intelligent layer built for focus."
    : "A premium writing experience designed around precision, focus, and a new intelligent layer of control.";

  return (
    <div
      className={`mx-auto flex w-full flex-col items-center text-center ${
        isTablet ? "max-w-4xl" : "max-w-5xl"
      }`}
    >
      {/* Editorial badge with border-gradient spin + red accent dot */}
      <div className="border-gradient-spin inline-flex items-center gap-2 bg-black/60 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ef233c] shadow-[0_0_8px_#ef233c]" />
        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-zinc-400">Smart Pen Premium Demo</span>
      </div>

      <h1 className="hero-headline font-manrope mt-8 text-6xl font-bold leading-[0.85] tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl">
        <span className="split-line">
          <span className="hero-headline-line block">The pen,</span>
        </span>
        <span className="split-line">
          <span className="hero-headline-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
            reimagined.
          </span>
        </span>
      </h1>

      <p
        className={`hero-subheadline font-inter max-w-lg rounded-lg p-2 text-lg font-light leading-relaxed text-zinc-400 md:text-xl ${
          isTablet ? "mt-6" : "mt-8"
        }`}
      >
        {subheadline}
      </p>

      <p className="hero-support-copy font-inter mt-1 max-w-md text-center text-sm text-zinc-500 opacity-0">
        Designed for focused writing sessions with a subtle intelligent layer.
      </p>

      <HeroCTA isMobile={isMobile} />
    </div>
  );
}
