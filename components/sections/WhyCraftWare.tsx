"use client";

import RevealText from "@/components/ui/RevealText";
import { values } from "@/content/values";
import { useReducedMotion } from "@/lib/hooks";

/** Precomputed hexagon positions (%), literal strings so SSR and client match exactly. */
const ORBIT: { left: string; top: string }[] = [
  { left: "100%", top: "50%" },
  { left: "75%", top: "93.301%" },
  { left: "25%", top: "93.301%" },
  { left: "0%", top: "50%" },
  { left: "25%", top: "6.699%" },
  { left: "75%", top: "6.699%" },
];

export default function WhyCraftWare() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="relative overflow-hidden py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_70%)] blur-2xl" />

      <div className="mx-auto max-w-[1600px] px-6 text-center sm:px-10">
        <p className="kicker">
          <span className="font-display text-violet">06</span> — Why CraftWare
        </p>
        <RevealText
          as="h2"
          className="mx-auto mt-4 font-display text-[clamp(1.8rem,4.6vw,2.75rem)] font-bold tracking-tight"
        >
          Design × Technology × Marketing
        </RevealText>
      </div>

      {/* orbit */}
      <div className="relative mx-auto mt-20 flex h-[340px] w-[340px] items-center justify-center sm:h-[440px] sm:w-[440px]">
        <div className="absolute inset-0 rounded-full border border-hair" />
        <div className="absolute inset-[14%] rounded-full border border-white/[0.06]" />

        <div
          className="absolute inset-0"
          style={
            reduced
              ? undefined
              : { animation: "cw-orbit 44s linear infinite" }
          }
        >
          {values.map((v, i) => {
            const pos = ORBIT[i % ORBIT.length];
            return (
              <div
                key={v}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top }}
              >
                <span
                  className="block whitespace-nowrap rounded-full border border-hair-strong bg-ink/80 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-text-hi backdrop-blur-sm"
                  style={
                    reduced
                      ? undefined
                      : { animation: "cw-orbit 44s linear infinite reverse" }
                  }
                >
                  {v}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="font-display text-sm font-semibold tracking-[0.18em] text-gradient">
            CRAFTWARE
          </div>
          <div className="meta-label mt-1">The engine</div>
        </div>
      </div>

      <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
        06 / 09
      </span>

      <style>{`
        @keyframes cw-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
