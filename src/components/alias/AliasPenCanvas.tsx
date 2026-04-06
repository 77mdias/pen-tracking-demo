'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import AliasPenScene from '@/components/alias/AliasPenScene';
import { aliasSceneConfig } from '@/lib/three/aliasSceneConfig';
import type { DeviceTier } from '@/hooks/useDeviceCapabilities';

type AliasPenCanvasProps = {
  reducedMotion: boolean;
  motionScale: number;
  maxDpr: number;
  tier: DeviceTier;
};

export default function AliasPenCanvas({
  reducedMotion,
  motionScale,
  maxDpr,
  tier,
}: AliasPenCanvasProps) {
  const [cx, cy, cz] = aliasSceneConfig.camera.position;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{
          position: [cx, cy, cz],
          fov: aliasSceneConfig.camera.fov,
          near: 0.1,
          far: 100,
        }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <Suspense fallback={null}>
          <AliasPenScene
            reducedMotion={reducedMotion}
            motionScale={motionScale}
            tier={tier}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
