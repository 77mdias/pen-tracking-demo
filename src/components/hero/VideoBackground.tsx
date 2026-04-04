"use client";

import useReducedMotion from "@/hooks/useReducedMotion";

type VideoBackgroundProps = {
  className?: string;
};

export default function VideoBackground({ className }: VideoBackgroundProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "blur(24px) saturate(0.8) brightness(0.65)",
          opacity: 0.28,
          transform: "scale(1.05)",
        }}
        src="/videos/animation.mp4"
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
      />
      {/* Dark overlay to ensure 3D pen remains the protagonist */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
