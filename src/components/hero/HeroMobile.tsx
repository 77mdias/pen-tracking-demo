'use client';

type HeroMobileProps = {
  className?: string;
  reducedMotion?: boolean;
};

export default function HeroMobile({ className, reducedMotion = false }: HeroMobileProps) {
  return (
    <div className={className}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,123,255,0.25),transparent_55%)]" />
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-screen"
        src="/videos/animation.mp4"
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/60 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="glass-panel flex h-52 w-52 items-center justify-center rounded-full">
          <div className="h-24 w-24 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}
