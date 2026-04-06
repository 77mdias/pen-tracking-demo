'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
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

  // Drag rotation refs — per D-3: refs only in animation path, no useState
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const dragRotXRef = useRef(0);
  const dragRotYRef = useRef(0);

  // CSS cursor state (OK to use useState for CSS-only, not animation path)
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
    setIsGrabbing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerXRef.current;
    const dy = e.clientY - lastPointerYRef.current;
    dragRotYRef.current += dx * 0.008;
    dragRotXRef.current = Math.max(-0.8, Math.min(0.8, dragRotXRef.current + dy * 0.006));
    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  return (
    <div
      className={`absolute inset-0 overflow-visible ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-hidden="true"
    >
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
            isDraggingRef={isDraggingRef}
            dragRotXRef={dragRotXRef}
            dragRotYRef={dragRotYRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
