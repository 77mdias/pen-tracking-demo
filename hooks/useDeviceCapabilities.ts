'use client';

import { useSyncExternalStore } from "react";

export type DeviceTier = 'high' | 'medium' | 'low';

export type DeviceCapabilities = {
  tier: DeviceTier;
  supportsWebGL: boolean;
  dpr: number;
  hardwareConcurrency: number;
  deviceMemory: number;
  recommendedMaxDpr: number;
};

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
};

let cachedSupportsWebGL: boolean | null = null;
const SERVER_SNAPSHOT: DeviceCapabilities = {
  tier: "high",
  supportsWebGL: true,
  dpr: 1,
  hardwareConcurrency: 8,
  deviceMemory: 8,
  recommendedMaxDpr: 1.5,
};
let lastSnapshot: DeviceCapabilities = SERVER_SNAPSHOT;

function detectWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  if (cachedSupportsWebGL !== null) return cachedSupportsWebGL;

  try {
    const canvas = document.createElement("canvas");
    cachedSupportsWebGL = Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    cachedSupportsWebGL = false;
  }

  return cachedSupportsWebGL;
}

function resolveTier({
  dpr,
  hardwareConcurrency,
  deviceMemory,
  supportsWebGL,
}: {
  dpr: number;
  hardwareConcurrency: number;
  deviceMemory: number;
  supportsWebGL: boolean;
}): DeviceTier {
  if (!supportsWebGL || hardwareConcurrency <= 4 || deviceMemory <= 4 || dpr > 2.75) {
    return "low";
  }

  if (hardwareConcurrency <= 8 || deviceMemory <= 8 || dpr > 2) {
    return "medium";
  }

  return "high";
}

function resolveRecommendedMaxDpr(tier: DeviceTier): number {
  if (tier === "low") return 1;
  if (tier === "medium") return 1.25;
  return 1.5;
}

function getDeviceCapabilitiesSnapshot(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  const navigatorWithDeviceMemory = window.navigator as NavigatorWithDeviceMemory;
  const dpr = window.devicePixelRatio || 1;
  const hardwareConcurrency = navigatorWithDeviceMemory.hardwareConcurrency ?? 4;
  const deviceMemory = navigatorWithDeviceMemory.deviceMemory ?? 4;
  const supportsWebGL = detectWebGLSupport();

  const tier = resolveTier({ dpr, hardwareConcurrency, deviceMemory, supportsWebGL });

  const nextSnapshot: DeviceCapabilities = {
    tier,
    supportsWebGL,
    dpr,
    hardwareConcurrency,
    deviceMemory,
    recommendedMaxDpr: resolveRecommendedMaxDpr(tier),
  };

  const unchanged =
    nextSnapshot.tier === lastSnapshot.tier &&
    nextSnapshot.supportsWebGL === lastSnapshot.supportsWebGL &&
    nextSnapshot.dpr === lastSnapshot.dpr &&
    nextSnapshot.hardwareConcurrency === lastSnapshot.hardwareConcurrency &&
    nextSnapshot.deviceMemory === lastSnapshot.deviceMemory &&
    nextSnapshot.recommendedMaxDpr === lastSnapshot.recommendedMaxDpr;

  if (unchanged) {
    return lastSnapshot;
  }

  lastSnapshot = nextSnapshot;
  return lastSnapshot;
}

export default function useDeviceCapabilities(): DeviceCapabilities {
  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};

    const handler = () => onStoreChange();
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  };

  return useSyncExternalStore(subscribe, getDeviceCapabilitiesSnapshot, () => SERVER_SNAPSHOT);
}
