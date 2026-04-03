'use client';

import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap/registerGsap";

type UseHeroScrollProgressProps = {
  scope: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
};

export default function useHeroScrollProgress({
  scope,
  reducedMotion,
}: UseHeroScrollProgressProps): { current: number } {
  const progressRef = useRef(0);

  useGSAP(
    () => {
      if (reducedMotion) {
        progressRef.current = 0;
        return;
      }

      const triggerElement = scope.current;
      if (!triggerElement) return;

      const scrollTrigger = ScrollTrigger.create({
        trigger: triggerElement,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { scope, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return progressRef;
}
