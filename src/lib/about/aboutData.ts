export interface TechStackCard {
  name: string;
  description: string;
  /** SVG path data rendered inside a 24×24 viewBox */
  iconPath: string;
}

export interface ProjectStat {
  label: string;
  value: string;
  category: 'codebase' | 'product';
}

export interface ProductHighlight {
  text: string;
}

export const TECH_STACK_CARDS: TechStackCard[] = [
  {
    name: 'Next.js 16',
    description: 'App Router with RSC and server actions',
    iconPath: 'M12 2L2 19.5h20L12 2z',
  },
  {
    name: 'React 19',
    description: 'Latest concurrent features and transitions',
    iconPath: 'M12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.4-3.3 2.1-6.6 2.1-10S13.4 5.3 12 2zM2 12h20M12 2c-1.4 3.3-2.1 6.6-2.1 10s.7 6.7 2.1 10',
  },
  {
    name: 'TypeScript 5',
    description: 'Strict typing across the entire codebase',
    iconPath: 'M3 5h18v14H3V5zm9.5 4h-3v1.5h1v5h1v-5h1V9zm2.5 0v6.5h1.5v-2.5h.5c1.1 0 2-.9 2-2s-.9-2-2-2h-2zm1.5 1.5h.5a.5.5 0 0 1 0 1h-.5v-1z',
  },
  {
    name: 'Three.js + R3F',
    description: '3D scenes and WebGL rendering via React Three Fiber',
    iconPath: 'M12 2l-8 4.5v9L12 20l8-4.5v-9L12 2zm0 2.2l5.5 3.1v6.4L12 16.8l-5.5-3.1V7.3L12 4.2z',
  },
  {
    name: 'GSAP',
    description: 'Scroll-driven animations and timeline orchestration',
    iconPath: 'M3 12h2v4H3v-4zm4-3h2v7H7V9zm4-4h2v11h-2V5zm4 2h2v9h-2V7zm4-2h2v11h-2V5z',
  },
  {
    name: 'TailwindCSS v4',
    description: 'Utility-first styling with custom design tokens',
    iconPath: 'M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C13.3 10.74 14.42 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.7 7.26 14.58 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.3 16.74 9.42 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.7 13.26 9.58 12 7 12z',
  },
];

export const PROJECT_STATS: ProjectStat[] = [
  // Codebase – real metrics
  { label: 'Components', value: '22+', category: 'codebase' },
  { label: 'Pages', value: '4', category: 'codebase' },
  { label: 'Source Files', value: '46', category: 'codebase' },
  { label: 'Phases Shipped', value: '8', category: 'codebase' },
  // Product – aspirational / fictional
  { label: 'AI Features', value: '3', category: 'product' },
  { label: 'Writing Modes', value: '7', category: 'product' },
  { label: 'Sync Devices', value: '5', category: 'product' },
  { label: 'Beta Waitlist', value: '2.4K+', category: 'product' },
];

export const PRODUCT_HIGHLIGHTS: ProductHighlight[] = [
  { text: 'Real-time AI suggestions powered by on-device inference' },
  { text: 'Seamless cross-device sync — phone, tablet, and desktop' },
  { text: 'Focus Mode blocks distractions so you stay in flow' },
];

export const GITHUB_URL = 'https://github.com/77mdias/pen-tracking-demo';

export const PRODUCT_DESCRIPTION = `PenFlow77 is a next-generation smart pen platform designed for writers,
students, and professionals who demand more from their tools. Every stroke
is captured in real time, enriched by AI, and surfaced exactly where you need it.

Built on a modern stack — Next.js, React 19, Three.js, and GSAP — the
interface feels as fluid as the ideas you commit to paper. The 3D pen
visualization isn't a gimmick; it mirrors exactly how the hardware tracks
motion and pressure.

From first draft to final export, PenFlow77 keeps your creative process
uninterrupted. Smart sync means nothing is ever lost, and Focus Mode
ensures your best thinking reaches the page.`;
