"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useIsTouch, useReducedMotion } from "@/lib/hooks";

/**
 * Desktop-only custom cursor.
 *  - idle: small glowing dot
 *  - over [data-cursor-label] / a / button: expands to a ring, optionally with a label
 * Disabled on touch and for prefers-reduced-motion (native cursor stays).
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !isTouch && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.cursor = "on";

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.42, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.42, ease: "power3" });

    const move = (e: PointerEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a,button,[data-cursor-label]"
      );
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursorLabel ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      <div
        ref={dot}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ring}
        className={`absolute flex items-center justify-center rounded-full border border-white/60 transition-[width,height,background-color] duration-300 ${
          active
            ? label
              ? "-left-12 -top-12 h-24 w-24 bg-violet/20 backdrop-blur-[1px]"
              : "-left-6 -top-6 h-12 w-12"
            : "-left-4 -top-4 h-8 w-8"
        }`}
      >
        {label ? (
          <span className="font-display text-[10px] font-medium uppercase tracking-[0.14em] text-white">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
