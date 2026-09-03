"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { words as splitWords } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** delay before the reveal starts, seconds */
  delay?: number;
  /** stagger between words, seconds */
  stagger?: number;
  /** reveal on mount instead of on scroll */
  immediate?: boolean;
};

/**
 * Word-by-word mask reveal. Each word sits in an overflow-hidden box; the
 * inner span slides up from 110% to 0. Driven by IntersectionObserver + CSS
 * (no GSAP) with a timeout failsafe so text can never stay hidden.
 */
export default function RevealText({
  children,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.05,
  immediate = false,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const parts = splitWords(children);

  useEffect(() => {
    if (immediate || reduced) {
      setRevealed(true);
      return;
    }
    const el = root.current;
    if (!el) {
      setRevealed(true);
      return;
    }
    const failsafe = setTimeout(() => setRevealed(true), 1600);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
          clearTimeout(failsafe);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [immediate, reduced]);

  return createElement(
    as,
    { ref: root, className },
    parts.map((w, i) => (
      <span key={i}>
        <span
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.08em",
            marginBottom: "-0.08em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform:
                revealed || reduced ? "translateY(0)" : "translateY(110%)",
              transition: reduced
                ? "none"
                : "transform 0.85s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${delay + i * stagger}s`,
              willChange: "transform",
            }}
          >
            {w}
          </span>
        </span>
        {i < parts.length - 1 ? " " : ""}
      </span>
    ))
  );
}
