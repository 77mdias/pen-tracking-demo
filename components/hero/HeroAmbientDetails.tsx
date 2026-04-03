'use client';

export default function HeroAmbientDetails() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[15]" aria-hidden>
      <div
        className="liquid-blob bg-[#007bff]"
        style={{
          width: 500,
          height: 500,
          top: -100,
          left: -100,
          opacity: 0.2,
          animationDuration: "15s",
        }}
      />
      <div
        className="liquid-blob bg-purple-600"
        style={{
          width: 400,
          height: 400,
          top: "40%",
          right: -100,
          opacity: 0.15,
          animationDuration: "20s",
          animationDelay: "-5s",
        }}
      />
      <div
        className="liquid-blob bg-cyan-600"
        style={{
          width: 600,
          height: 600,
          bottom: -150,
          left: "20%",
          opacity: 0.15,
          animationDuration: "25s",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
