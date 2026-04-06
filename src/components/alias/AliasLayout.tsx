'use client';

import dynamic from 'next/dynamic';
import useDeviceCapabilities from '@/hooks/useDeviceCapabilities';
import useReducedMotion from '@/hooks/useReducedMotion';

const AliasPenCanvas = dynamic(
  () => import('@/components/alias/AliasPenCanvas'),
  { ssr: false, loading: () => null }
);

type AliasLayoutProps = {
  children: React.ReactNode;
};

export default function AliasLayout({ children }: AliasLayoutProps) {
  const reducedMotion = useReducedMotion();
  const { tier, supportsWebGL, recommendedMaxDpr } = useDeviceCapabilities();

  // motionScale per tier — same mapping as HeroSection
  const motionScale = tier === 'low' ? 0.5 : tier === 'medium' ? 0.8 : 1;

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-0 px-6 pt-28 pb-12 md:grid-cols-2 md:gap-8">
      {/* Left column: glass panel form content (always visible) */}
      <div className="w-full max-w-2xl">
        {children}
      </div>

      {/* Right column: 3D pen — hidden below md (per D-7), hidden if no WebGL */}
      <div
        className="relative hidden h-[500px] md:block"
        aria-hidden="true"
      >
        {supportsWebGL && (
          <AliasPenCanvas
            reducedMotion={reducedMotion}
            motionScale={motionScale}
            maxDpr={recommendedMaxDpr}
            tier={tier}
          />
        )}
      </div>
    </main>
  );
}
