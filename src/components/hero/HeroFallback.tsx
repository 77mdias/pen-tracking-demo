'use client';

type HeroFallbackProps = {
  className?: string;
  reducedMotion?: boolean;
};

export default function HeroFallback({ className, reducedMotion = false }: HeroFallbackProps) {
  return (
    <div className={className}>
      {/* Ambient blue glow — matches R3F scene lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,123,255,0.2),transparent_60%)]" />

      {/* Pen spotlight glow — replaces abstract glass circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-gradient-to-b from-[#007bff]/20 via-transparent to-transparent blur-2xl md:h-96 md:w-96" />
      </div>

      {/* Pen animation video — now prominently visible */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src="/videos/animation.mp4"
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        muted
        playsInline
        preload={reducedMotion ? "metadata" : "auto"}
      />

      {/* Bottom fade to page background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/55 to-transparent" />
    </div>
  );
}
