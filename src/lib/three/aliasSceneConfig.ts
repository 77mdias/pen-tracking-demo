export const aliasSceneConfig = {
  camera: {
    position: [0, 0.1, 3.8] as [number, number, number],
    fov: 32,
  },
  pen: {
    position: [0, 0, 0] as [number, number, number],
    rotation: [0.1, 0.6, 0] as [number, number, number],
    scale: 0.85,
    idle: {
      yAmplitude: 0.05,
      yFrequency: 0.6,
      rotationYSpeed: 0.15,
    },
  },
} as const;
