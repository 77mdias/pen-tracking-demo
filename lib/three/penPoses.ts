export type PenPose = {
  pen: {
    rotation: [number, number, number];
    position: [number, number, number];
  };
  camera: { position: [number, number, number]; fov: number };
  lighting: {
    accent: {
      position: [number, number, number];
      color: string;
      intensity: number;
    } | null;
  };
};

export const PEN_POSES = {
  hero: {
    pen: { rotation: [0.15, 0.4, 0.0], position: [0, 0, 0] },
    camera: { position: [0, 0.2, 4.0], fov: 30 },
    lighting: { accent: null },
  },
  bridge: {
    pen: { rotation: [0.0, 0.15, 0.0], position: [0, 0.1, 0] },
    camera: { position: [0, 0.3, 4.5], fov: 28 },
    lighting: { accent: null },
  },
  aiWriting: {
    pen: { rotation: [0.6, -0.5, 0.2], position: [-0.1, -0.15, 0] },
    camera: { position: [0.2, 0.4, 3.5], fov: 26 },
    lighting: {
      accent: { position: [0.5, 0.5, 1], color: "#ffbb33", intensity: 0.6 },
    },
  },
  smartSync: {
    pen: { rotation: [0.05, 1.4, 0.0], position: [0.05, 0, 0] },
    camera: { position: [-0.3, 0, 4.2], fov: 32 },
    lighting: {
      accent: { position: [-1, 1, -2], color: "#00bfff", intensity: 0.7 },
    },
  },
  focusMode: {
    pen: { rotation: [0.03, 0.0, 0.0], position: [0, 0.05, 0] },
    camera: { position: [0, 0.1, 3.2], fov: 22 },
    lighting: { accent: null },
  },
  cta: {
    pen: { rotation: [0.25, 0.2, 0.0], position: [0, 0, 0.2] },
    camera: { position: [0, 0.1, 3.8], fov: 28 },
    lighting: { accent: null },
  },
} satisfies Record<string, PenPose>;

export type PoseName = keyof typeof PEN_POSES;
