export type HeroMaterialPreset = {
  roughness: number;
  metalness: number;
};

export const heroMaterialPresets = {
  penBody: {
    roughness: 0.35,
    metalness: 0.8,
  },
  penAccent: {
    roughness: 0.2,
    metalness: 0.95,
  },
} as const satisfies Record<string, HeroMaterialPreset>;
