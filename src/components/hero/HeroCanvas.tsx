'use client';

import type { DeviceTier } from "@/hooks/useDeviceCapabilities";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroScene from "@/components/hero/HeroScene";
import { heroCamera } from "@/lib/three/heroCamera";

type HeroCanvasProps = {
  reducedMotion: boolean;
  enablePointerParallax: boolean;
  scrollProgressRef: { current: number };
  penTargetRef: { current: import('@/lib/three/penPoses').PenPose | null };
  motionScale: number;
  maxDpr: number;
  tier: DeviceTier;
};

export default function HeroCanvas({
  reducedMotion,
  enablePointerParallax,
  scrollProgressRef,
  penTargetRef,
  motionScale,
  maxDpr,
  tier,
}: HeroCanvasProps) {
  const [camX, camY, camZ] = heroCamera.position;

  return (
    <div className="absolute inset-0">
      <Canvas
        className="absolute inset-0"
        dpr={[1, maxDpr]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [camX, camY, camZ], fov: heroCamera.fov, near: 0.1, far: 100 }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <Suspense fallback={null}>
          <HeroScene
            reducedMotion={reducedMotion}
            enablePointerParallax={enablePointerParallax}
            scrollProgressRef={scrollProgressRef}
            penTargetRef={penTargetRef}
            motionScale={motionScale}
            tier={tier}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
