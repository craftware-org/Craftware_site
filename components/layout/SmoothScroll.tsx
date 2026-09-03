"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Momentum smooth-scroll. GSAP ScrollTrigger is driven from Lenis' rAF so
 * scroll-scrubbed timelines stay in sync. Skipped for prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const { ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // in-page hash links → smooth scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const target = url.hash && document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
