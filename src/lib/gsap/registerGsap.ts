import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

let isRegistered = false;

if (typeof window !== 'undefined' && !isRegistered) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  isRegistered = true;
}

export { gsap, ScrollTrigger };
