'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroCTA from "@/components/hero/HeroCTA";

type HeroMobileProps = {
  reducedMotion?: boolean;
};

export default function HeroMobile({ reducedMotion = false }: HeroMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set([".hero-cta", ".hero-headline", ".hero-subheadline"], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Set initial hidden state — GSAP will animate FROM these values
    gsap.set([".hero-cta", ".hero-headline", ".hero-subheadline"], {
      opacity: 0,
      y: 16,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.2,
    });

    tl.to(".hero-cta", { opacity: 1, y: 0, duration: 0.6 })
      .to(".hero-headline", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
      .to(".hero-subheadline", { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
  }, { scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <div ref={containerRef} className="mx-auto flex w-full max-w-sm flex-col items-center text-center px-6">
      {/* 1. Editorial badge — identical classes to HeroContent badge */}
      <div className="border-gradient-spin inline-flex items-center gap-2 bg-black/60 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ef233c] shadow-[0_0_8px_#ef233c]" />
        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Smart Pen Premium Demo
        </span>
      </div>

      {/* 2. CTA — primary, full-width on mobile. Secondary button suppressed by isMobile=true */}
      <div className="mt-8 w-full">
        <HeroCTA isMobile={true} />
      </div>

      {/* 3. Headline — below CTA, two lines with gradient on second */}
      <h1 className="hero-headline font-display mt-8 text-4xl font-semibold leading-[0.9] tracking-tight text-white drop-shadow-2xl">
        <span className="block">The pen,</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
          reimagined.
        </span>
      </h1>

      {/* 4. Subheadline — short mobile copy */}
      <p className="hero-subheadline font-inter mt-4 text-base font-normal leading-relaxed text-zinc-300">
        Premium writing precision with an intelligent layer built for focus.
      </p>
    </div>
  );
}

