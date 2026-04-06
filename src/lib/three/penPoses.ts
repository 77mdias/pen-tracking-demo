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
  about: {
    // Pen resting/tilted forward — "platform overview" energy
    pen: { rotation: [0.35, -0.2, 0.08], position: [-0.5, -0.3, 0] },
    camera: { position: [0, 0.05, 5.0], fov: 26 },
    lighting: {
      accent: { position: [-1, 0.5, 2], color: "#00e5ff", intensity: 0.5 },
    },
  },
} satisfies Record<string, PenPose>;

/**
 * Mobile-specific pen poses (viewport ≤767px).
 * On mobile, editorial cards are full-width and vertically centered,
 * so the pen is positioned in the UPPER portion of the screen (Y ≈ 0.65–0.9)
 * to stay visible above the card content area.
 * Hero pose omitted: hero uses null (scroll-driven defaults).
 */
export const MOBILE_PEN_POSES = {
  bridge: {
    // Pen drifts upward and back — transitions between hero and features
    pen: { rotation: [0.0, 0.25, 0.0], position: [0, 0.65, -0.4] },
    camera: { position: [0, 0.1, 4.8], fov: 30 },
    lighting: { accent: null },
  },
  aiWriting: {
    // Pen rises to upper-center with a slight lean — visible above the card
    pen: { rotation: [0.45, -0.25, 0.12], position: [0.1, 0.8, 0.1] },
    camera: { position: [0, 0.2, 4.2], fov: 32 },
    lighting: {
      accent: { position: [0.5, 0.5, 1], color: "#ffbb33", intensity: 0.55 },
    },
  },
  smartSync: {
    // Pen upper-center, rotated to show side profile — mirrors aiWriting
    pen: { rotation: [0.05, 0.9, 0.0], position: [-0.1, 0.75, 0.1] },
    camera: { position: [0, 0.15, 4.2], fov: 32 },
    lighting: {
      accent: { position: [-1, 1, -2], color: "#00bfff", intensity: 0.65 },
    },
  },
  focusMode: {
    // Pen floats high and centered — tip peeks prominently above the card
    pen: { rotation: [0.03, 0.0, 0.0], position: [0, 0.9, -0.2] },
    camera: { position: [0, 0.1, 4.2], fov: 30 },
    lighting: { accent: null },
  },
  cta: {
    // Pen elevated and angled — reinforces premium feel above the CTA card
    pen: { rotation: [0.12, 0.4, 0.04], position: [0.15, 0.7, -0.2] },
    camera: { position: [0, 0.1, 4.5], fov: 30 },
    lighting: { accent: null },
  },
  about: {
    // Pen resting/tilted forward — mobile variant for AboutSection
    pen: { rotation: [0.3, -0.15, 0.06], position: [0, 0.5, -0.2] },
    camera: { position: [0, 0.1, 4.8], fov: 30 },
    lighting: {
      accent: { position: [-1, 0.5, 2], color: "#00e5ff", intensity: 0.45 },
    },
  },
} satisfies Record<string, PenPose>;

export type PoseName = keyof typeof PEN_POSES;
