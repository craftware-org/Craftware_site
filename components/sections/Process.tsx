"use client";

import { useEffect, useRef } from "react";
import RevealText from "@/components/ui/RevealText";
import { processSteps } from "@/content/process";
import { ensureGsap } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";

export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current || !line.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.8,
          },
        }
      );
      gsap.utils.toArray<HTMLElement>(".proc-node").forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          scrollTrigger: { trigger: node, start: "top 82%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" className="relative overflow-hidden py-28 sm:py-36">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light" />
      <div className="mx-auto max-w-[1600px] px-6 text-center sm:px-10">
        <p className="kicker">
          <span className="font-display text-violet">05</span> — Process
        </p>
        <RevealText
          as="h2"
          className="mt-4 font-display text-[clamp(2rem,5vw,2.9rem)] font-bold tracking-tight"
        >
          FROM IDEA TO IMPACT.
        </RevealText>
      </div>

      <div ref={root} className="relative mx-auto mt-24 max-w-[1400px] px-6 sm:px-10">
        {/* horizontal rail — desktop only; aligns with the dot row below */}
        <div className="pointer-events-none absolute left-10 right-10 top-[68px] hidden h-px md:block">
          <div className="absolute inset-0 bg-hair" />
          <div
            ref={line}
            className="absolute inset-0 origin-left bg-[linear-gradient(90deg,#8b5cf6,#22d3ee)] shadow-[0_0_16px_rgba(139,92,246,0.6)]"
          />
        </div>

        <ol className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-5 md:gap-x-4">
          {processSteps.map((step) => (
            <li key={step.id} className="proc-node flex flex-col items-center text-center">
              {/* fixed-height header so every dot lands on the same line */}
              <div className="flex h-[62px] flex-col items-center justify-start">
                <span className="font-display text-[13px] tracking-[0.2em] text-violet">
                  {step.id}
                </span>
                <span className="mt-2 font-display text-lg font-semibold sm:text-xl">
                  {step.name}
                </span>
              </div>
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute inset-[-7px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.4),transparent_70%)]" />
                <span className="h-3 w-3 rounded-full bg-violet shadow-[0_0_14px_#8b5cf6]" />
              </span>
              <p className="mt-6 max-w-[24ch] text-[12.5px] leading-relaxed text-text-mid">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="meta-label mt-16 text-center">The line draws as you scroll</p>
      <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
        05 / 09
      </span>
    </section>
  );
}
