'use client';

import HeroCTA from "@/components/hero/HeroCTA";

type HeroContentProps = {
  isTablet?: boolean;
};

export default function HeroContent({ isTablet = false }: HeroContentProps) {
  const subheadline = "A premium writing experience designed around precision, focus, and a new intelligent layer of control.";

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

      <h1 className="hero-headline font-display mt-8 text-6xl font-semibold leading-[0.85] tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl">
        <span className="split-line pb-[0.35em] -mb-[0.35em]">
          <span className="hero-headline-line block">The pen,</span>
        </span>
        <span className="split-line pb-[0.35em] -mb-[0.35em]">
          <span className="hero-headline-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
            reimagined.
          </span>
        </span>
      </h1>

      <p
        className={`hero-subheadline font-inter max-w-2xl rounded-sm border border-white/10 bg-black/35 px-5 py-3 text-lg font-normal leading-relaxed text-zinc-100 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-sm md:text-xl ${
          isTablet ? "mt-6" : "mt-8"
        }`}
      >
        {subheadline}
      </p>

      <p className="hero-support-copy font-inter mt-2 max-w-md text-center text-base text-zinc-200 italic opacity-0">
        Built for the way you actually think.
      </p>

      <HeroCTA />
    </div>
  );
}
