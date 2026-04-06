'use client';

import { useGLTF, ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Group, Object3D } from 'three';
import { aliasSceneConfig } from '@/lib/three/aliasSceneConfig';
import type { DeviceTier } from '@/hooks/useDeviceCapabilities';

type AliasPenSceneProps = {
  reducedMotion: boolean;
  motionScale: number;
  tier: DeviceTier;
};

export default function AliasPenScene({ reducedMotion, motionScale, tier }: AliasPenSceneProps) {
  const penGroupRef = useRef<Group>(null);
  const gltf = useGLTF('/models/pen3D.glb');

  const penModel = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      const obj = child as Object3D & { castShadow?: boolean; receiveShadow?: boolean };
      if ('castShadow' in obj) obj.castShadow = true;
      if ('receiveShadow' in obj) obj.receiveShadow = true;
    });
    return clone;
  }, [gltf.scene]);

  const [px, py, pz] = aliasSceneConfig.pen.position;
  const [rx, , rz] = aliasSceneConfig.pen.rotation;
  const showContactShadows = tier !== 'low';

  // Per D-2: continuous idle animation — NOT scroll-coupled
  // Per D-3: refs only in useFrame, no useState
  useFrame((state, delta) => {
    if (!penGroupRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Float: sin-wave Y oscillation
    penGroupRef.current.position.y =
      py +
      Math.sin(t * aliasSceneConfig.pen.idle.yFrequency) *
        aliasSceneConfig.pen.idle.yAmplitude *
        motionScale;

    // Slow continuous Y rotation — "display case" spin
    penGroupRef.current.rotation.y +=
      delta * aliasSceneConfig.pen.idle.rotationYSpeed * motionScale;
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight position={[3, 2, 4]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-2, 1, 2]} intensity={0.35} color="#d0d0d0" />
      <pointLight position={[0, 2, -3]} intensity={0.4} color="#b0bec5" />
      {/* Subtle blue accent to match design system #007bff */}
      <pointLight position={[1.5, 0, 2]} intensity={0.3} color="#007bff" />

      <group
        ref={penGroupRef}
        position={[px, py, pz]}
        rotation={[rx, aliasSceneConfig.pen.rotation[1], rz]}
      >
        <primitive object={penModel} />
      </group>

      {showContactShadows && (
        <ContactShadows position={[0, -1.05, 0]} opacity={0.2} scale={5} blur={2} far={2.5} />
      )}
    </>
  );
}

useGLTF.preload('/models/pen3D.glb');
