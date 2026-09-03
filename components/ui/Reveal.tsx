"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  as?: "div" | "span" | "p" | "header" | "section" | "li";
  className?: string;
  /** translate distance in px before reveal */
  y?: number;
  x?: number;
  /** seconds */
  delay?: number;
  duration?: number;
  /** reveal on mount rather than on scroll into view */
  immediate?: boolean;
};

/**
 * Lightweight entrance animation: fade + slide, cleared on mount or when
 * scrolled into view. Pure CSS transition + IntersectionObserver, with a
 * timeout failsafe — content can never remain hidden.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  y = 16,
  x = 0,
  delay = 0,
  duration = 0.8,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate || reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }
    const failsafe = setTimeout(() => setShown(true), 1500);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
          clearTimeout(failsafe);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [immediate, reduced]);

  const style = reduced
    ? undefined
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate(${x}px, ${y}px)`,
        transition: `opacity ${duration}s ease, transform ${duration}s cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${delay}s`,
        willChange: "opacity, transform",
      };

  return createElement(as, { ref, className, style }, children);
}
