"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, client-side. */
export function ensureGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  registered = true;
  return { gsap, ScrollTrigger };
}

/**
 * Split a string into words wrapped in <span class="reveal-line"><span>word</span></span>
 * groups by line is overkill for our needs — we reveal by word instead, which
 * survives responsive reflow. Returns an array of words for JSX rendering.
 */
export const words = (text: string) => text.split(/(\s+)/).filter((w) => w.trim().length);

export { gsap, ScrollTrigger };
