# Cinematic Scroll Hijack — Plano de Implementação

## Context

O site PenFlow77 tem animações 3D da caneta muito sutis: rotação de apenas 15° entre hero e seção, diferenças de pose entre features quase imperceptíveis (beat aiWriting usa rotation `[0.29, 0.57, 0.05]` vs base `[0.15, 0.4, 0]`). As seções de features têm layout uniforme e as transições entre dobras são visualmente opacas.

**Objetivo:** Implementar scroll hijack estilo Apple.com — cada seção aloca scroll height suficiente para a caneta 3D executar uma coreografia dramática (poses editoriais com até 80° de rotação) antes de liberar o scroll. O texto entra após a caneta assentar.

**Princípio mantido:** GSAP atualiza refs → HeroScene lê refs no useFrame → lerp suave. Nenhum novo animation system.

---

## Decisão de Arquitetura

| Antes                                                       | Depois                                                                 |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| `productIntroProgressRef: { current: number }` (0–1 global) | `penTargetRef: { current: PenPose \| null }` (pose discreta por seção) |
| Stacked lerp beats (4 ranges sequenciais, sutil)            | Lerp direto para pose destino (dramático)                              |
| Seções empilhadas via scroll contínuo                       | Panels com `pin: true` via GSAP ScrollTrigger                          |
| Lógica de beats hardcoded no HeroScene (linhas 89–178)      | HeroScene lê apenas `penTargetRef`                                     |

---

## Critical Files

| Arquivo                                            | Ação                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| `components/hero/HeroScene.tsx`                    | Modificar — substituir beat logic por penTargetRef lerp + FOV animation  |
| `components/hero/HeroCanvas.tsx`                   | Modificar — trocar `productIntroProgressRef` por `penTargetRef`          |
| `components/hero/HeroSection.tsx`                  | Modificar — trocar `useProductIntroScrollProgress` por `useScrollHijack` |
| `hooks/useScrollHijack.ts`                         | **Criar** — hook central do scroll hijack                                |
| `lib/three/penPoses.ts`                            | **Criar** — todas as poses dramáticas por seção                          |
| `lib/gsap/scrollHijackConfig.ts`                   | **Criar** — constantes de timing e altura                                |
| `components/product-intro/ProductIntroSection.tsx` | Refatorar — remover bug de Bridge duplicada, remover hooks obsoletos     |
| `components/product-intro/ProductIntroBridge.tsx`  | Redesign — texto flutuante sem card, com `data-scroll-section="bridge"`  |
| `components/product-intro/FeatureAIWriting.tsx`    | Redesign — texto à direita, sem círculo de ícone                         |
| `components/product-intro/FeatureSmartSync.tsx`    | Redesign — texto à esquerda, sem círculo de ícone                        |
| `components/product-intro/FeatureFocusMode.tsx`    | Redesign — texto centralizado no fundo, sem círculo de ícone             |
| `hooks/useProductIntroScrollProgress.ts`           | **Deletar**                                                              |
| `hooks/useProductIntroTimeline.ts`                 | **Deletar**                                                              |
| `lib/three/productIntroSceneConfig.ts`             | **Deletar**                                                              |

---

## Phase 0: Preparação

### Task 0.1 — Fetch docs GSAP ScrollTrigger

- Usar Context7 para buscar docs de GSAP ScrollTrigger
- Confirmar APIs: `pin`, `pinSpacing`, `scrub`, `onEnter`, `onEnterBack`, `onLeave`
- Confirmar API: criar multiple ScrollTriggers dentro de `useGSAP`

### Task 0.2 — Ler docs Next.js 16

- Ler `node_modules/next/dist/docs/` para confirmar se há breaking changes relevantes
- Confirmar que `dynamic` import com `ssr: false` funciona igual

### Task 0.3 — Criar `lib/three/penPoses.ts`

Definir tipo `PenPose` e o objeto `PEN_POSES` com todas as seções:

```typescript
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
```

### Task 0.4 — Criar `lib/gsap/scrollHijackConfig.ts`

```typescript
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
```

---

## Phase 1: HeroScene — Substituir Beat Logic

### Task 1.1 — Adicionar FOV animation

Em `HeroScene.tsx`, no `useFrame`, inicializar `targetFov = heroSceneConfig.camera.fov`.

Após o bloco de cálculo de targets, antes do lerp final:

```typescript
import { PerspectiveCamera } from "three";
// ... no useFrame:
const cam = state.camera as PerspectiveCamera;
cam.fov = lerp(cam.fov, targetFov, factor);
cam.updateProjectionMatrix();
```

### Task 1.2 — Substituir lógica de beats por penTargetRef

**Remover** o bloco inteiro `// --- Phase 5: Product Intro Scroll Choreography ---` (linhas 89–178 de HeroScene.tsx).

**Novo bloco** — inserir após o cálculo dos hero scroll targets e antes do lerp final:

```typescript
// Product Intro: override com pose discreta quando penTargetRef está ativo
const activePose = penTargetRef?.current;
if (activePose && !reducedMotion) {
  targetPosX = activePose.pen.position[0];
  targetPosY = activePose.pen.position[1];
  targetPosZ = activePose.pen.position[2];
  targetRotX = activePose.pen.rotation[0];
  targetRotY = activePose.pen.rotation[1];
  targetRotZ = activePose.pen.rotation[2];
  targetCameraX = activePose.camera.position[0];
  targetCameraY = activePose.camera.position[1];
  targetCameraZ = activePose.camera.position[2];
  targetFov = activePose.camera.fov;

  if (accentLightRef.current) {
    const acc = activePose.lighting.accent;
    const targetIntensity = acc ? acc.intensity : 0;
    accentLightRef.current.intensity = lerp(
      accentLightRef.current.intensity,
      targetIntensity,
      factor,
    );
    if (acc) {
      accentLightRef.current.position.set(
        acc.position[0],
        acc.position[1],
        acc.position[2],
      );
      accentLightRef.current.color.set(acc.color);
    }
  }
}
```

**Nota:** Quando `penTargetRef.current === null` (usuário está no hero), o bloco é ignorado e só os hero scroll effects rodam — sem regressão.

### Task 1.3 — Atualizar type de HeroSceneProps

Trocar:

```typescript
productIntroProgressRef: {
  current: number;
}
```

por:

```typescript
penTargetRef: {
  current: import("@/lib/three/penPoses").PenPose | null;
}
```

Remover o import de `productIntroSceneConfig`.

---

## Phase 2: HeroCanvas — Atualizar Props

### Task 2.1 — Atualizar HeroCanvasProps

Em `HeroCanvas.tsx`:

- Remover `productIntroProgressRef: { current: number }`
- Adicionar `penTargetRef: { current: import('@/lib/three/penPoses').PenPose | null }`
- Passar `penTargetRef` para `<HeroScene>`

---

## Phase 3: Hook useScrollHijack

### Task 3.1 — Criar `hooks/useScrollHijack.ts`

```typescript
"use client";

import { RefObject, MutableRefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap/registerGsap";
import { PEN_POSES, PenPose } from "@/lib/three/penPoses";
import { SCROLL_HIJACK_CONFIG } from "@/lib/gsap/scrollHijackConfig";

type UseScrollHijackProps = {
  scope: RefObject<HTMLElement | null>;
  penTargetRef: MutableRefObject<PenPose | null>;
  reducedMotion: boolean;
};
```

**Implementação dentro de `useGSAP`:**

1. Se `reducedMotion`, return imediato (sem ScrollTriggers).

2. Buscar todos os `[data-scroll-section]` dentro de `scope.current`.

3. Para cada elemento `el` com `data-scroll-section="sectionId"`:

   **ScrollTrigger de pin:**

   ```typescript
   ScrollTrigger.create({
     trigger: el,
     start: "top top",
     end: `+=${SCROLL_HIJACK_CONFIG.pinExtraScrollVh[sectionId]}`,
     pin: true,
     pinSpacing: true,
     scrub: false, // pin não é scrubbed, apenas determina quando o bloco ativa
     onEnter: () => {
       penTargetRef.current = PEN_POSES[sectionId];
     },
     onEnterBack: () => {
       penTargetRef.current = PEN_POSES[sectionId];
     },
   });
   ```

   **Timeline de texto (scrubbed separadamente):**

   ```typescript
   const t = SCROLL_HIJACK_CONFIG.text;
   const tl = gsap.timeline({
     scrollTrigger: {
       trigger: el,
       start: "top top",
       end: `+=${SCROLL_HIJACK_CONFIG.pinExtraScrollVh[sectionId]}`,
       scrub: SCROLL_HIJACK_CONFIG.scrub,
     },
   });

   tl.fromTo(
     el.querySelector(".section-label"),
     { opacity: 0, y: 12 },
     { opacity: 1, y: 0, duration: 0.08 },
     t.labelEnterAt,
   );

   tl.fromTo(
     el.querySelectorAll(".section-headline-line"),
     { opacity: 0, y: 36 },
     { opacity: 1, y: 0, duration: 0.12, stagger: 0.04 },
     t.headlineEnterAt,
   );

   tl.fromTo(
     el.querySelector(".section-body"),
     { opacity: 0 },
     { opacity: 1, duration: 0.08 },
     t.bodyEnterAt,
   );

   tl.to(
     [
       el.querySelector(".section-label"),
       ...el.querySelectorAll(".section-headline-line"),
       el.querySelector(".section-body"),
     ],
     { opacity: 0, duration: 0.06 },
     t.exitStartAt,
   );
   ```

4. Na última seção (`focusMode`), adicionar `onLeave` que seta `penTargetRef.current = PEN_POSES.cta`.

5. Cleanup automático pelo `useGSAP` context (revertOnUpdate: true).

---

## Phase 4: Wiring no HeroSection

### Task 4.1 — Atualizar HeroSection.tsx

**Remover:**

```typescript
import useProductIntroScrollProgress from "@/hooks/useProductIntroScrollProgress";
const productIntroProgressRef = useProductIntroScrollProgress({
  scope: productIntroContainerRef,
  reducedMotion: !enableScrollNarrative,
});
```

**Adicionar:**

```typescript
import { useRef } from "react"; // já importado
import type { PenPose } from "@/lib/three/penPoses";
import useScrollHijack from "@/hooks/useScrollHijack";

const penTargetRef = useRef<PenPose | null>(null);
useScrollHijack({
  scope: productIntroContainerRef,
  penTargetRef,
  reducedMotion: !enableScrollNarrative,
});
```

**Atualizar `<HeroCanvas>` JSX:**

```diff
- productIntroProgressRef={productIntroProgressRef}
+ penTargetRef={penTargetRef}
```

---

## Phase 5: Refatorar ProductIntroSection

### Task 5.1 — Limpar ProductIntroSection.tsx

**Remover:**

- Import e chamada de `useProductIntroTimeline`
- O bloco duplicado de `<ProductIntroBridge />` (linha 32 — o primeiro render)
- O div wrapper com `max-w-7xl mx-auto px-6 py-16 gap-24`

**Estrutura limpa:**

```tsx
export default function ProductIntroSection() {
  return (
    <section className="relative w-full">
      <ProductIntroBridge />
      <FeatureAIWriting />
      <FeatureSmartSync />
      <FeatureFocusMode />
      <ProductIntroCTA />
    </section>
  );
}
```

### Task 5.2 — Deletar arquivos obsoletos

```
hooks/useProductIntroScrollProgress.ts
hooks/useProductIntroTimeline.ts
lib/three/productIntroSceneConfig.ts
```

---

## Phase 6: Redesign das Seções

> **Nota sobre z-index:** O canvas R3F vive em `z-[1]`. O conteúdo das seções vive em `z-[10]`. Isso já está correto — os painéis de texto ficam sobre o canvas.

> **Nota sobre `min-h-screen`:** O GSAP `pin: true` com `pinSpacing: true` adiciona automaticamente um espaçador após o elemento pinado correspondente ao `end` do ScrollTrigger. O elemento em si pode ser apenas `min-h-screen`.

### Task 6.1 — ProductIntroBridge.tsx

```tsx
<div
  data-scroll-section="bridge"
  className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center"
>
  <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-6 opacity-0">
    The Ecosystem
  </p>
  <h2 className="font-heading text-5xl md:text-7xl font-semibold leading-[0.9] tracking-tight text-white">
    <span className="section-headline-line block opacity-0">More than</span>
    <span className="section-headline-line block opacity-0">a pen.</span>
  </h2>
  <p className="section-body mt-6 max-w-md text-base text-white/60 leading-relaxed opacity-0">
    A new kind of writing experience — where premium hardware meets an
    intelligent digital layer.
  </p>
</div>
```

### Task 6.2 — FeatureAIWriting.tsx

Texto à **direita**, sem círculo de ícone:

```tsx
<div
  data-scroll-section="aiWriting"
  className="relative w-full min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24"
>
  <div className="glass-panel rounded-2xl p-8 max-w-sm w-full">
    <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-4 opacity-0">
      AI Writing Assist
    </p>
    <h3 className="section-headline-line font-heading text-2xl md:text-3xl font-semibold text-white mb-4 opacity-0">
      Write. Refine. Evolve.
    </h3>
    <p className="section-body text-sm text-white/60 leading-relaxed opacity-0">
      Intelligent suggestions that sharpen your clarity without breaking your
      flow. The pen learns your style, suggests refinements, and keeps your
      voice intact.
    </p>
  </div>
</div>
```

### Task 6.3 — FeatureSmartSync.tsx

Texto à **esquerda**:

```tsx
<div
  data-scroll-section="smartSync"
  className="relative w-full min-h-screen flex items-center justify-start px-6 md:px-16 lg:px-24"
>
  <div className="glass-panel rounded-2xl p-8 max-w-sm w-full">
    <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-4 opacity-0">
      Smart Sync
    </p>
    <h3 className="section-headline-line font-heading text-2xl md:text-3xl font-semibold text-white mb-4 opacity-0">
      Every stroke, everywhere.
    </h3>
    <p className="section-body text-sm text-white/60 leading-relaxed opacity-0">
      Your writing lives across every device, in real time. Capture a thought on
      the pen, find it on your laptop seconds later.
    </p>
  </div>
</div>
```

### Task 6.4 — FeatureFocusMode.tsx

Texto **centralizado no fundo**:

```tsx
<div
  data-scroll-section="focusMode"
  className="relative w-full min-h-screen flex flex-col items-center justify-end pb-16 px-6"
>
  <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center">
    <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-4 opacity-0">
      Focus Mode
    </p>
    <h3 className="section-headline-line font-heading text-2xl md:text-3xl font-semibold text-white mb-4 opacity-0">
      Silence the noise.
    </h3>
    <p className="section-body text-sm text-white/60 leading-relaxed opacity-0">
      A distraction-free writing mode that strips away everything but you and
      the page. Deep work, protected.
    </p>
  </div>
</div>
```

---

## Phase 7: Polish

### Task 7.1 — Tuning de poses (iteração visual)

- Abrir `lib/three/penPoses.ts` no browser com `bun run dev`
- Ajustar valores das rotações para as poses visualmente corretas
- Focar em: AI Writing não cortar o frustum, Smart Sync mostrar o lado correto da caneta
- Lerp factor: `delta * 4.5` (atual) — se quiser mais snap usar `delta * 6`, mais suave `delta * 3`

### Task 7.2 — Reduced motion (verificação)

- `reducedMotion: true` → `useScrollHijack` retorna imediatamente, sem ScrollTriggers
- `penTargetRef.current` permanece `null` → HeroScene usa apenas hero scroll
- Texto das seções: `opacity-0` inicial precisa de override em CSS:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .section-label,
    .section-headline-line,
    .section-body {
      opacity: 1 !important;
    }
  }
  ```
  Adicionar em `app/globals.css`.

### Task 7.3 — Mobile

- `useScrollHijack` já recebe `reducedMotion` como guard. Em mobile, HeroSection passa `!enableScrollNarrative` (que é `true` quando mobile). Portanto nenhuma mudança adicional necessária.
- Verificar que as seções de feature renderizam corretamente em 375px sem pinning (layout empilhado).

### Task 7.4 — Performance

- Verificar que `cam.updateProjectionMatrix()` dentro do `useFrame` não causa GC — é uma operação de matrix math, não alloca memória, OK.
- Verificar 60fps no Chrome DevTools Performance tab.
- Sem novas texturas ou post-processing introduzidos.

---

## Verificação End-to-End

```bash
bun run dev  # http://localhost:3000
```

**Checklist de verificação:**

1. [ ] **Hero** — caneta flutua suavemente, parallax de mouse funciona
2. [ ] **Scroll → Bridge** — canvas sticky, texto "More than a pen." aparece, caneta sobe e se endireita (de `[0.15,0.40,0]` para `[0.00,0.15,0]`), fov muda de 30 → 28
3. [ ] **Scroll → AI Writing** — caneta gira para pose de escrita (`[0.60,-0.50,0.20]`), texto aparece à direita, accent light dourada visível
4. [ ] **Scroll → Smart Sync** — caneta vira para perfil lateral (`[0.05,1.40,0]`), câmera recua para fov 32, texto à esquerda, accent light cyan
5. [ ] **Scroll → Focus Mode** — caneta vai para frontal direto (`[0.03,0.00,0.00]`), câmera zoom in fov 22, texto no centro-baixo
6. [ ] **Scroll → CTA** — caneta retorna para pose `cta`, botão visível
7. [ ] **Scroll back (onEnterBack)** — voltar scroll reativa cada seção corretamente
8. [ ] **Reduced motion** — abrir DevTools > Rendering > prefers-reduced-motion: reduce → texto visível, sem animações, caneta estática
9. [ ] **Mobile 375px** — seções sem pinning, layout empilhado, sem canvas 3D
10. [ ] **Build** — `bun run build` sem erros TypeScript
