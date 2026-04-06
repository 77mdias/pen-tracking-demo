export interface TechStackCard {
  name: string;
  description: string;
  icon: string;
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
    icon: '▲',
  },
  {
    name: 'React 19',
    description: 'Latest concurrent features and transitions',
    icon: '⚛',
  },
  {
    name: 'TypeScript 5',
    description: 'Strict typing across the entire codebase',
    icon: '🔷',
  },
  {
    name: 'Three.js + R3F',
    description: '3D scenes and WebGL rendering via React Three Fiber',
    icon: '🎲',
  },
  {
    name: 'GSAP',
    description: 'Scroll-driven animations and timeline orchestration',
    icon: '🎞',
  },
  {
    name: 'TailwindCSS v4',
    description: 'Utility-first styling with custom design tokens',
    icon: '💨',
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
