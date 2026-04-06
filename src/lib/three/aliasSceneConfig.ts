export const aliasSceneConfig = {
  camera: {
    position: [0, 0.1, 3.2] as [number, number, number],
    fov: 35,
  },
  pen: {
    position: [0, 0, 0] as [number, number, number],
    rotation: [0.1, 0.6, 0] as [number, number, number],
    idle: {
      yAmplitude: 0.06,
      yFrequency: 0.6,
      rotationYSpeed: 0.15,
    },
  },
} as const;
