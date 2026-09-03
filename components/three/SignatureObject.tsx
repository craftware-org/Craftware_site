"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInViewOnce, useIsTouch, useMouseNormalized, useReducedMotion } from "@/lib/hooks";
import type { RefObject } from "react";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

/** Static CSS/SVG stand-in used for reduced-motion: a glass monolith with a glowing C. */
function StaticMonolith({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute inset-[-14%] bg-[radial-gradient(circle_at_50%_46%,rgba(139,92,246,0.5),rgba(34,211,238,0.14)_46%,transparent_72%)] blur-3xl" />
      <svg viewBox="0 0 220 240" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sig-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#221a3a" />
            <stop offset="1" stopColor="#0c0b16" />
          </linearGradient>
          <linearGradient id="sig-side" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#161226" />
            <stop offset="1" stopColor="#0a0912" />
          </linearGradient>
          <linearGradient id="sig-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22D3EE" />
            <stop offset="0.5" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {/* isometric block */}
        <polygon points="70,40 150,55 150,190 70,205" fill="url(#sig-face)" stroke="url(#sig-edge)" strokeWidth="1.5" />
        <polygon points="150,55 185,42 185,175 150,190" fill="url(#sig-side)" stroke="url(#sig-edge)" strokeWidth="1.5" />
        <polygon points="70,40 105,27 185,42 150,55" fill="#2a2148" stroke="url(#sig-edge)" strokeWidth="1.5" />
        {/* glowing C on the face */}
        <path
          d="M128 95 A34 34 0 1 0 128 150"
          fill="none"
          stroke="url(#sig-edge)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M128 95 A34 34 0 1 0 128 150"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

type Props = {
  className?: string;
  /** optional external scroll-progress ref (0..1) to spin the object on scroll */
  scrollProgress?: RefObject<number> | null;
  withParallax?: boolean;
};

export default function SignatureObject({
  className = "",
  scrollProgress = null,
  withParallax = true,
}: Props) {
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const pointer = useMouseNormalized();
  const [ref, inView] = useInViewOnce<HTMLDivElement>("0px 0px 20% 0px");
  const mounted = useRef(false);
  if (inView) mounted.current = true;

  if (reduced) return <StaticMonolith className={className} />;

  return (
    <div ref={ref} className={className}>
      {mounted.current ? (
        <Scene
          pointer={withParallax && !isTouch ? pointer : null}
          scrollProgress={scrollProgress}
          quality={isTouch ? "low" : "high"}
          particles={isTouch ? 24 : 90}
        />
      ) : (
        <StaticMonolith className="h-full w-full" />
      )}
    </div>
  );
}
