import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

let isRegistered = false;

if (typeof window !== 'undefined' && !isRegistered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  isRegistered = true;
}

export { gsap, ScrollTrigger };
