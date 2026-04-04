"use client";

import { useEffect, useState, useRef } from "react";
import type { LucideIcon } from "lucide-react";

export type BadgeData = {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
};

type FloatingBadgesProps = {
  badges: BadgeData[];
  side: "left" | "right";
  className?: string;
};

const CROSSFADE_INTERVAL = 3500;
const CROSSFADE_DURATION = 800;

/**
 * Centerpiece: a crossfading showcase card positioned in the visual center
 * of the layout gap. Cycles through all badge items with smooth opacity transitions.
 */
function CrossfadeShowcase({ badges }: { badges: BadgeData[] }) {
  const count = badges.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(count - 1);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeRef.current);
      setActiveIndex((i) => (i + 1) % count);
      setIsCrossfading(true);
      setTimeout(() => setIsCrossfading(false), CROSSFADE_DURATION + 200);
    }, CROSSFADE_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = badges[activeIndex];
  const prev = badges[prevIndex];

  return (
    <div className="relative w-65 h-40">
      {/* Previous card — fades out */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isCrossfading ? 0 : 1,
          transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
        }}
        aria-hidden={isCrossfading}
      >
        <div className="glass-panel p-5 rounded-xl text-center w-full max-w-60">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="shrink-0">
              <prev.icon className="h-4 w-4 text-[#ef233c]" strokeWidth={1.8} />
            </div>
            <span className="font-manrope text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#ef233c] to-[#ff6b6b]">
              {prev.value}
            </span>
          </div>
          <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
            {prev.label}
          </p>
          <p className="font-inter text-xs text-zinc-600 leading-snug">
            {prev.description}
          </p>
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {badges.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-4 bg-[#ef233c]"
                    : i === prevIndex && isCrossfading
                      ? "w-2 bg-[#ef233c]/50"
                      : "w-1 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* New card — fades in */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isCrossfading ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
        }}
      >
        <div className="glass-panel p-5 rounded-xl text-center w-full max-w-60">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="shrink-0">
              <active.icon
                className="h-4 w-4 text-[#ef233c]"
                strokeWidth={1.8}
              />
            </div>
            <span className="font-manrope text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#ef233c] to-[#ff6b6b]">
              {active.value}
            </span>
          </div>
          <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
            {active.label}
          </p>
          <p className="font-inter text-xs text-zinc-600 leading-snug">
            {active.description}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {badges.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-4 bg-[#ef233c]"
                    : i === prevIndex && isCrossfading
                      ? "w-2 bg-[#ef233c]/50"
                      : "w-1 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders floating spec badges: small ones on the side +
 * a crossfading showcase card in the visual center.
 * Badges appear staggered via GSAP in useScrollHijack.
 */
export default function FloatingBadges({
  badges,
  side,
  className,
}: FloatingBadgesProps) {
  const positionClass =
    side === "right"
      ? "left-0 right-[35%] justify-start"
      : "left-[35%] right-0 justify-end";

  const staggerOffsets =
    side === "right" ? ["ml-0", "ml-10", "ml-6"] : ["mr-0", "mr-10", "mr-6"];

  return (
    <div
      className={`hidden lg:flex absolute inset-0 items-center pointer-events-none ${positionClass} px-24`}
      aria-hidden="true"
    >
      {/* Small side badges — staggered stack */}
      <div className="flex flex-col gap-3">
        {badges.map((badge, i) => {
          const rotation =
            i === 0
              ? "-rotate-1"
              : i === 1
                ? "rotate-[0.5deg]"
                : "-rotate-[0.3deg]";

          return (
            <div
              key={badge.label}
              className={`floating-badge pointer-events-none p-2.5 w-33.75 opacity-0 ${staggerOffsets[i]} ${rotation}`}
            >
              <div className="flex items-start gap-2 mb-1">
                <div className="shrink-0 mt-0.5">
                  <badge.icon
                    className="h-3.5 w-3.5 text-[#ef233c]"
                    strokeWidth={1.8}
                  />
                </div>
                <span className="font-manrope text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-[#ef233c] to-[#ff6b6b]">
                  {badge.value}
                </span>
              </div>
              <p className="font-inter text-[8px] uppercase tracking-[0.15em] text-zinc-500 mb-0.5">
                {badge.label}
              </p>
              <p className="font-inter text-[10px] text-zinc-600 leading-snug">
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Centerpiece: always centered in the viewport, floating gently */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 floating-badge-center ${className ?? ""}`}
      >
        <CrossfadeShowcase badges={badges} />
      </div>
    </div>
  );
}
