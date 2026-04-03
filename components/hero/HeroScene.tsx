'use client';

import { ContactShadows } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { DeviceTier } from "@/hooks/useDeviceCapabilities";
import { clamp } from "@/lib/utils/clamp";
import { lerp } from "@/lib/utils/lerp";
import { Group, Object3D } from "three";
import { useMemo, useRef } from "react";
import { heroLighting } from "@/lib/three/heroLighting";
import { heroSceneConfig } from "@/lib/three/heroSceneConfig";

type HeroSceneProps = {
  reducedMotion: boolean;
  enablePointerParallax: boolean;
  scrollProgressRef: { current: number };
  motionScale: number;
  tier: DeviceTier;
};

export default function HeroScene({
  reducedMotion,
  enablePointerParallax,
  scrollProgressRef,
  motionScale,
  tier,
}: HeroSceneProps) {
  const penGroupRef = useRef<Group>(null);
  const gltf = useGLTF("/models/pen3D.glb");
  const penModel = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      const object = child as Object3D & { castShadow?: boolean; receiveShadow?: boolean };
      if ("castShadow" in object) object.castShadow = true;
      if ("receiveShadow" in object) object.receiveShadow = true;
    });
    return clone;
  }, [gltf.scene]);

  const [penX, penY, penZ] = heroSceneConfig.pen.position;
  const [penRotX, penRotY, penRotZ] = heroSceneConfig.pen.rotation;
  const [camBaseX, camBaseY, camBaseZ] = heroSceneConfig.camera.position;
  const [keyX, keyY, keyZ] = heroLighting.key.position;
  const [fillX, fillY, fillZ] = heroLighting.fill.position;
  const [rimX, rimY, rimZ] = heroLighting.rim.position;
  const showContactShadows = tier !== "low";

  useFrame((state, delta) => {
    if (!penGroupRef.current) return;

    const elapsedTime = state.clock.elapsedTime;
    let targetPosX = penX;
    let targetPosY = penY;
    const targetPosZ = penZ;
    let targetRotX = penRotX;
    let targetRotY = penRotY;
    let targetRotZ = penRotZ;
    const scrollProgress = reducedMotion ? 0 : scrollProgressRef.current;
    const rotationRangeRadians = (heroSceneConfig.scroll.rotationRangeDegrees * Math.PI) / 180;

    if (!reducedMotion) {
      targetPosY += Math.sin(elapsedTime) * heroSceneConfig.pen.idle.yAmplitude * motionScale;
      targetRotZ += Math.sin(elapsedTime * 0.7) * heroSceneConfig.pen.idle.rotationAmplitude * motionScale;
    }

    if (enablePointerParallax && !reducedMotion) {
      const maxTilt = (3 * Math.PI) / 180;
      targetRotX += -state.pointer.y * maxTilt * motionScale;
      targetRotY += state.pointer.x * maxTilt * motionScale;
      targetPosX += state.pointer.x * 0.05 * motionScale;
      targetPosY += state.pointer.y * 0.03 * motionScale;
    }

    targetRotY += scrollProgress * rotationRangeRadians * motionScale;
    targetRotX += scrollProgress * 0.06 * motionScale;

    const factor = clamp(delta * 4.5, 0, 1);
    penGroupRef.current.position.x = lerp(penGroupRef.current.position.x, targetPosX, factor);
    penGroupRef.current.position.y = lerp(penGroupRef.current.position.y, targetPosY, factor);
    penGroupRef.current.position.z = lerp(penGroupRef.current.position.z, targetPosZ, factor);
    penGroupRef.current.rotation.x = lerp(penGroupRef.current.rotation.x, targetRotX, factor);
    penGroupRef.current.rotation.y = lerp(penGroupRef.current.rotation.y, targetRotY, factor);
    penGroupRef.current.rotation.z = lerp(penGroupRef.current.rotation.z, targetRotZ, factor);

    const targetCameraX = camBaseX + scrollProgress * heroSceneConfig.scroll.cameraShift * motionScale;
    const targetCameraY = camBaseY + scrollProgress * 0.08 * motionScale;
    const targetCameraZ = camBaseZ - scrollProgress * 0.12 * motionScale;
    state.camera.position.x = lerp(state.camera.position.x, targetCameraX, factor);
    state.camera.position.y = lerp(state.camera.position.y, targetCameraY, factor);
    state.camera.position.z = lerp(state.camera.position.z, targetCameraZ, factor);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.24} color="#cdd6ea" />
      <directionalLight
        position={[keyX, keyY, keyZ]}
        intensity={heroLighting.key.intensity * (tier === "low" ? 0.85 : 1)}
        color="#ffffff"
      />
      <directionalLight
        position={[fillX, fillY, fillZ]}
        intensity={heroLighting.fill.intensity * (tier === "low" ? 0.9 : 1)}
        color="#8da8d7"
      />
      <pointLight position={[rimX, rimY, rimZ]} intensity={heroLighting.rim.intensity} color="#7cc2ff" />

      <group ref={penGroupRef} position={[penX, penY, penZ]} rotation={[penRotX, penRotY, penRotZ]}>
        <primitive object={penModel} />
      </group>

      {showContactShadows ? (
        <ContactShadows position={[0, -1.05, 0]} opacity={0.24} scale={6} blur={2.4} far={2.5} />
      ) : null}
    </>
  );
}

useGLTF.preload("/models/pen3D.glb");
