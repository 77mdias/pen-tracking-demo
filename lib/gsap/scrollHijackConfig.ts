export const SCROLL_HIJACK_CONFIG = {
  // Quantidade de scroll alocada por seção (além do min-h-screen)
  pinExtraScrollVh: {
    bridge: "150vh",
    aiWriting: "200vh",
    smartSync: "200vh",
    focusMode: "200vh",
  },
  // Posições de entrada do texto dentro do progresso de scroll da seção (0–1)
  text: {
    labelEnterAt: 0.28,
    headlineEnterAt: 0.32,
    bodyEnterAt: 0.42,
    exitStartAt: 0.88,
  },
  scrub: 1.2,
} as const;
