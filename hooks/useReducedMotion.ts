'use client';

import useMediaQuery from "@/hooks/useMediaQuery";

export default function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
