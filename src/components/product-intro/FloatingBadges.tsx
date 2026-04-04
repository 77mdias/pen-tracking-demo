'use client';

import type { LucideIcon } from 'lucide-react';

export type BadgeData = {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
};

type FloatingBadgesProps = {
  badges: BadgeData[];
  side: 'left' | 'right';
  className?: string;
};

/**
 * Renders a cluster of floating spec badges in the center gap
 * between the 3D pen and the editorial card. Desktop only.
 * Badges appear staggered via GSAP in useScrollHijack.
 */
export default function FloatingBadges({ badges, side, className }: FloatingBadgesProps) {
  const positionClass = side === 'right'
    ? 'left-0 right-[35%] justify-start'
    : 'left-[35%] right-0 justify-end';

  const staggerOffsets = side === 'right'
    ? ['ml-0', 'ml-10', 'ml-6']
    : ['mr-0', 'mr-10', 'mr-6'];

  return (
    <div
      className={`hidden lg:flex absolute inset-0 items-center pointer-events-none ${positionClass} px-24`}
      aria-hidden="true"
    >
      <div className={`flex flex-col gap-4 ${className ?? ''}`}>
        {badges.map((badge, i) => {
          const rotation = i === 0 ? '-rotate-1' : i === 1 ? 'rotate-[0.5deg]' : '-rotate-[0.3deg]';

          return (
            <div
              key={badge.label}
              className={`floating-badge pointer-events-none p-3 w-[150px] opacity-0 ${staggerOffsets[i]} ${rotation}`}
            >
              <div className="flex items-start gap-2 mb-1.5">
                <div className="flex-shrink-0 mt-0.5">
                  <badge.icon className="h-3.5 w-3.5 text-[#ef233c]" strokeWidth={1.8} />
                </div>
                <span className="font-manrope text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff6b6b]">
                  {badge.value}
                </span>
              </div>
              <p className="font-inter text-[9px] uppercase tracking-[0.15em] text-zinc-500 mb-0.5">
                {badge.label}
              </p>
              <p className="font-inter text-[11px] text-zinc-600 leading-snug">
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
