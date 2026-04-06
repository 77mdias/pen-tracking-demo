'use client';

import dynamic from 'next/dynamic';
import useDeviceCapabilities from '@/hooks/useDeviceCapabilities';
import useReducedMotion from '@/hooks/useReducedMotion';

const AliasPenCanvas = dynamic(
  () => import('@/components/alias/AliasPenCanvas'),
  { ssr: false, loading: () => null }
);

const VideoBackground = dynamic(
  () => import('@/components/hero/VideoBackground'),
  { ssr: false, loading: () => null }
);

type AliasLayoutProps = {
  children: React.ReactNode;
  /** When true, pen column renders first (left), form column second (right) */
  reversed?: boolean;
  /** Pass false when the parent page already provides a VideoBackground */
  showVideo?: boolean;
};

export default function AliasLayout({ children, reversed = false, showVideo = true }: AliasLayoutProps) {
  const reducedMotion = useReducedMotion();
  const { tier, supportsWebGL, recommendedMaxDpr } = useDeviceCapabilities();

  const motionScale = tier === 'low' ? 0.5 : tier === 'medium' ? 0.8 : 1;

  const penColumn = (
    <div
      className="relative z-10 hidden min-h-[500px] md:block overflow-visible"
      style={{ height: '70vh' }}
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
  );

  const formColumn = (
    <div className="relative z-10 w-full max-w-2xl">
      {children}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black">
      {showVideo && <VideoBackground className="z-0" />}

      <main className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-0 px-6 pt-28 pb-12 md:grid-cols-2 md:gap-8">
        {reversed ? (
          <>
            {penColumn}
            {formColumn}
          </>
        ) : (
          <>
            {formColumn}
            {penColumn}
          </>
        )}
      </main>
    </div>
  );
}
