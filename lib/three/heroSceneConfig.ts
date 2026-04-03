export const heroSceneConfig = {
  camera: {
    position: [0, 0.2, 4],
    fov: 30,
  },
  pen: {
    position: [0, 0, 0],
    rotation: [0.15, 0.4, 0],
    idle: {
      yAmplitude: 0.04,
      rotationAmplitude: 0.03,
    },
  },
  lighting: {
    key: {
      position: [3, 2, 4],
      intensity: 1.6,
    },
    fill: {
      position: [-2, 1, 2],
      intensity: 0.6,
    },
    rim: {
      position: [0, 2, -3],
      intensity: 0.8,
    },
  },
  scroll: {
    rotationRangeDegrees: 15,
    cameraShift: 0.3,
  },
} as const;
