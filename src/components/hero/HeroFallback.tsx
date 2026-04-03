'use client';

type HeroFallbackProps = {
  className?: string;
  reducedMotion?: boolean;
};

export default function HeroFallback({ className, reducedMotion = false }: HeroFallbackProps) {
  return (
    <div className={className}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,123,255,0.2),transparent_60%)]" />

      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        src="/videos/animation.mp4"
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        muted
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/55 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="glass-panel flex h-64 w-64 items-center justify-center rounded-full md:h-72 md:w-72">
          <div className="h-28 w-28 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent md:h-32 md:w-32" />
        </div>
      </div>
    </div>
  );
}
