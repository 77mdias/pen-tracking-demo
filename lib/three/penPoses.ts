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
    // Pen recedes behind text — deep background, zoomed out camera
    pen: { rotation: [0.0, 0.3, 0.0], position: [0, 0.15, -1.0] },
    camera: { position: [0, 0.2, 5.5], fov: 26 },
    lighting: { accent: null },
  },
  aiWriting: {
    // Pen shifts to the LEFT side — content card sits on the RIGHT
    pen: { rotation: [0.5, -0.4, 0.15], position: [-1.2, -0.1, 0] },
    camera: { position: [0.1, 0.3, 3.8], fov: 28 },
    lighting: {
      accent: { position: [0.5, 0.5, 1], color: "#ffbb33", intensity: 0.6 },
    },
  },
  smartSync: {
    // Pen shifts to the RIGHT side — content card sits on the LEFT
    pen: { rotation: [0.05, 1.2, 0.0], position: [1.2, 0, 0] },
    camera: { position: [-0.1, 0.1, 4.2], fov: 30 },
    lighting: {
      accent: { position: [-1, 1, -2], color: "#00bfff", intensity: 0.7 },
    },
  },
  focusMode: {
    // Pen floats well above center — content card is centered below
    pen: { rotation: [0.03, 0.0, 0.0], position: [0, 1.1, -0.5] },
    camera: { position: [0, 0.15, 3.8], fov: 25 },
    lighting: { accent: null },
  },
  cta: {
    // Pen recedes: parks high-right, out of CTA text area
    pen: { rotation: [0.15, 0.5, 0.05], position: [1.0, 0.6, -0.5] },
    camera: { position: [0, 0.1, 4.5], fov: 28 },
    lighting: { accent: null },
  },
} satisfies Record<string, PenPose>;

export type PoseName = keyof typeof PEN_POSES;
