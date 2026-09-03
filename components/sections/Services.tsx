"use client";

import { useState } from "react";
import RevealText from "@/components/ui/RevealText";
import { services } from "@/content/services";
import { useIsTouch } from "@/lib/hooks";

export default function Services() {
  const isTouch = useIsTouch();
  const [active, setActive] = useState<string | null>(null);

  const open = (id: string) => setActive(id);
  const close = () => setActive(null);
  const toggle = (id: string) => setActive((cur) => (cur === id ? null : id));

  return (
    <section id="services" className="relative overflow-hidden py-28 sm:py-36">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light" />

      <div className="mx-auto max-w-[1400px] px-6 text-center sm:px-10">
        <p className="kicker">
          <span className="font-display text-violet">03</span> — Capabilities
        </p>
        <RevealText
          as="h2"
          className="mx-auto mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,4.8vw,2.9rem)] font-bold tracking-tight"
        >
          EVERYTHING YOUR BRAND NEEDS TO GROW.
        </RevealText>
      </div>

      <ul
        className="mx-auto mt-16 max-w-[1180px] px-6 sm:px-10"
        onMouseLeave={() => !isTouch && close()}
      >
        {services.map((s) => {
          const isActive = active === s.id;
          return (
            <li
              key={s.id}
              className="relative border-t border-hair last:border-b"
              onMouseEnter={() => !isTouch && open(s.id)}
              data-cursor-label="Explore"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(460px_220px_at_22%_50%,rgba(139,92,246,0.2),transparent_70%)] transition-opacity duration-400"
                style={{ opacity: isActive ? 1 : 0 }}
              />

              <button
                type="button"
                onClick={() => isTouch && toggle(s.id)}
                className="relative flex w-full items-baseline gap-5 py-5 text-left sm:gap-7"
                aria-expanded={isActive}
              >
                <span
                  className={`font-display text-xs transition-colors sm:text-[13px] ${
                    isActive ? "text-violet" : "text-text-low"
                  }`}
                >
                  {s.id}
                </span>
                <span
                  className={`font-display font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "text-[clamp(1.9rem,5vw,3.25rem)] text-gradient"
                      : "text-[clamp(1.15rem,2.4vw,1.5rem)] text-text-mid"
                  }`}
                >
                  {s.name}
                </span>
              </button>

              {/* CSS grid-rows accordion — no measuring, no JS animation lib */}
              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  gridTemplateRows: isActive ? "1fr" : "0fr",
                  opacity: isActive ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-5 pb-8 pl-9 sm:flex-row sm:items-end sm:justify-between sm:pl-[3.25rem]">
                    <p className="max-w-[44ch] text-sm leading-relaxed text-text-mid">
                      {s.line}
                    </p>
                    <div className="flex flex-wrap gap-2.5 sm:justify-end">
                      {s.keywords.map((k, i) => (
                        <span
                          key={k}
                          className="rounded-full border border-hair-strong bg-white/[0.03] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-text-hi transition-[transform,opacity] duration-500"
                          style={{
                            transform: isActive ? "translateY(0)" : "translateY(8px)",
                            opacity: isActive ? 1 : 0,
                            transitionDelay: isActive ? `${0.1 + i * 0.05}s` : "0s",
                          }}
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="meta-label mt-14 text-center">
        {isTouch ? "Tap a service to expand" : "Hover a service to expand"}
      </p>
      <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
        03 / 09
      </span>
    </section>
  );
}
