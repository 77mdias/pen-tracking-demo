'use client';

import { ContactShadows } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { DeviceTier } from "@/hooks/useDeviceCapabilities";
import { clamp } from "@/lib/utils/clamp";
import { lerp } from "@/lib/utils/lerp";
import { Group, Object3D, PointLight, PerspectiveCamera } from "three";
import { useMemo, useRef } from "react";
import { heroLighting } from "@/lib/three/heroLighting";
import { heroSceneConfig } from "@/lib/three/heroSceneConfig";

type HeroSceneProps = {
  reducedMotion: boolean;
  enablePointerParallax: boolean;
  scrollProgressRef: { current: number };
  penTargetRef: { current: import("@/lib/three/penPoses").PenPose | null };
  motionScale: number;
  tier: DeviceTier;
};

export default function HeroScene({
  reducedMotion,
  enablePointerParallax,
  scrollProgressRef,
  penTargetRef,
  motionScale,
  tier,
}: HeroSceneProps) {
  const penGroupRef = useRef<Group>(null);
  const accentLightRef = useRef<PointLight>(null);

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
    let targetPosX: number = penX;
    let targetPosY: number = penY;
    let targetPosZ: number = penZ;
    let targetRotX: number = penRotX;
    let targetRotY: number = penRotY;
    let targetRotZ: number = penRotZ;
    const scrollProgress = reducedMotion ? 0 : scrollProgressRef.current;
    const rotationRangeRadians = (heroSceneConfig.scroll.rotationRangeDegrees * Math.PI) / 180;

    // Idle breathing — always active for organic feel
    const idleY = Math.sin(elapsedTime * 0.8) * heroSceneConfig.pen.idle.yAmplitude * motionScale;
    const idleRotZ = Math.sin(elapsedTime * 0.5) * heroSceneConfig.pen.idle.rotationAmplitude * motionScale * 0.6;

    if (!reducedMotion) {
      targetPosY += idleY;
      targetRotZ += idleRotZ;
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

    let targetCameraX = camBaseX + scrollProgress * heroSceneConfig.scroll.cameraShift * motionScale;
    let targetCameraY = camBaseY + scrollProgress * 0.08 * motionScale;
    let targetCameraZ = camBaseZ - scrollProgress * 0.12 * motionScale;
    let targetFov: number = heroSceneConfig.camera.fov;

    // Pen lerp — slower for cinematic transitions between section poses
    const penFactor = clamp(delta * 2.2, 0, 1);
    // Camera lerp — slightly faster to lead the eye
    const camFactor = clamp(delta * 2.5, 0, 1);

    // Product Intro: override with section pose + add idle breathing on top
    const activePose = penTargetRef?.current;
    if (activePose && !reducedMotion) {
      targetPosX = activePose.pen.position[0];
      targetPosY = activePose.pen.position[1] + idleY * 0.5; // reduced idle when posed
      targetPosZ = activePose.pen.position[2];
      targetRotX = activePose.pen.rotation[0];
      targetRotY = activePose.pen.rotation[1];
      targetRotZ = activePose.pen.rotation[2] + idleRotZ * 0.4;
      targetCameraX = activePose.camera.position[0];
      targetCameraY = activePose.camera.position[1];
      targetCameraZ = activePose.camera.position[2];
      targetFov = activePose.camera.fov;

      if (accentLightRef.current) {
        const acc = activePose.lighting.accent;
        const targetIntensity = acc ? acc.intensity : 0;
        accentLightRef.current.intensity = lerp(
          accentLightRef.current.intensity,
          targetIntensity,
          penFactor,
        );
        if (acc) {
          accentLightRef.current.position.set(
            acc.position[0],
            acc.position[1],
            acc.position[2],
          );
          accentLightRef.current.color.set(acc.color);
        }
      }
    }

    penGroupRef.current.position.x = lerp(penGroupRef.current.position.x, targetPosX, penFactor);
    penGroupRef.current.position.y = lerp(penGroupRef.current.position.y, targetPosY, penFactor);
    penGroupRef.current.position.z = lerp(penGroupRef.current.position.z, targetPosZ, penFactor);
    penGroupRef.current.rotation.x = lerp(penGroupRef.current.rotation.x, targetRotX, penFactor);
    penGroupRef.current.rotation.y = lerp(penGroupRef.current.rotation.y, targetRotY, penFactor);
    penGroupRef.current.rotation.z = lerp(penGroupRef.current.rotation.z, targetRotZ, penFactor);

    state.camera.position.x = lerp(state.camera.position.x, targetCameraX, camFactor);
    state.camera.position.y = lerp(state.camera.position.y, targetCameraY, camFactor);
    state.camera.position.z = lerp(state.camera.position.z, targetCameraZ, camFactor);
    state.camera.lookAt(0, 0, 0);

    const cam = state.camera as PerspectiveCamera;
    const newFov = lerp(cam.fov, targetFov, camFactor);
    if (Math.abs(newFov - cam.fov) > 0.001) {
      cam.fov = newFov;
      cam.updateProjectionMatrix();
    }
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#ffffff" />
      <directionalLight
        position={[keyX, keyY, keyZ]}
        intensity={heroLighting.key.intensity * (tier === "low" ? 0.85 : 1)}
        color="#ffffff"
      />
      <directionalLight
        position={[fillX, fillY, fillZ]}
        intensity={heroLighting.fill.intensity * (tier === "low" ? 0.9 : 1) * 0.55}
        color="#d0d0d0"
      />
      <pointLight position={[rimX, rimY, rimZ]} intensity={heroLighting.rim.intensity * 0.5} color="#b0bec5" />
      <pointLight ref={accentLightRef} intensity={0} />

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
