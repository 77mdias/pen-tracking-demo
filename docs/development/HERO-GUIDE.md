# Hero Experience Guide

O Hero do PenFlow77 é a peça central da experiência visual do projeto, utilizando uma stack avançada de **Three.js (R3F)**, **GSAP** e **Custom Scroll Hooks**. Este guia explica como essa orquestração funciona.

## 1. Arquitetura do Componente (`HeroSection.tsx`)

O `HeroSection` atua como um coordenador de cena. Ele não renderiza apenas o 3D, mas gerencia a transição entre estados visuais:
- **`HeroCanvas`**: Carregado via `next/dynamic` (SSR: false) para evitar conflitos de hidratação com WebGL.
- **`VideoBackground`**: Camada de vídeo atmosférico que roda atrás ou integrada à cena.
- **`HeroFallback`**: Renderizado automaticamente se `supportsWebGL` for falso ou se o dispositivo for de baixíssima performance.

## 2. Orquestração de Scroll e Pose

A narrativa visual é baseada em "Poses" da caneta 3D.
- **Definição de Poses**: Em `src/lib/three/penPoses.ts`, definimos coordenadas `(x, y, z)` e rotações para cada seção da landing page.
- **`useHeroScrollProgress`**: Rastreia exatamente onde o usuário está na seção de scroll fixo.
- **`useSnapScroll`**: Implementa o "Scroll Hijack" controlado. Quando o usuário usa o wheel, ele não faz o scroll nativo imediatamente; o hook intercepta e navega entre os "steps" da narrativa.

## 3. Integração GSAP (`useHeroTimeline`)

O GSAP é usado para garantir interpolações suaves que o CSS puro não conseguiria em propriedades 3D:
- Criamos uma timeline mestra sincronizada com o `scrollProgress`.
- Animamos a entrada dos textos (`HeroContent`) e os estados da caneta.
- **Reduced Motion**: O hook detecta a preferência do sistema e desabilita as animações de movimento, mantendo apenas crossfades simples para acessibilidade.

## 4. Adaptabilidade (Device Tiering)

Usamos o hook `useDeviceCapabilities` para classificar o hardware do usuário:
- **High Tier**: Sombras suaves, DPR alto (resolução nativa), efeitos de pós-processamento.
- **Medium/Low Tier**: Sombras desativadas, DPR limitado a 1.5 ou 1.0, simplificação da geometria.
- **Mobile**: A narrativa de scroll fixo é simplificada para evitar problemas de performance em browsers móveis.

## 5. Manutenção e Alterações

- **Para mudar a posição da caneta**: Edite o objeto de poses em `src/lib/three/penPoses.ts`.
- **Para ajustar o timing da animação**: O controle está no `useHeroTimeline.ts`.
- **Para adicionar uma nova seção no scroll**: Adicione o ref no `productIntroContainerRef` e atualize os passos no `useSnapScroll`.

---

*Nota: Esta é uma área de alta complexidade. Sempre teste em modo "Reduced Motion" e em dispositivos móveis após qualquer alteração no HeroCanvas.*
