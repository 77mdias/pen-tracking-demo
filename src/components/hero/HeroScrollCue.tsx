'use client';

export default function HeroScrollCue() {
  return (
    <div className="hero-scroll-cue absolute bottom-10 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Scroll Down</span>
      <div className="glass-panel h-12 w-px !bg-gradient-to-b from-[#007bff] to-transparent !border-0" />
    </div>
  );
}
