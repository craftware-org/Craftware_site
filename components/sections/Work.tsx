"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import RevealText from "@/components/ui/RevealText";
import ProjectArt from "@/components/ui/ProjectArt";
import { projects } from "@/content/projects";
import { ensureGsap } from "@/lib/animations";
import { useIsTouch, useReducedMotion } from "@/lib/hooks";

function Panel({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label="View Project"
      className="group relative flex h-[68vh] max-h-[560px] w-[86vw] shrink-0 flex-col overflow-hidden rounded-lg border border-hair-strong bg-[#0c0c12] transition-colors hover:border-white/25 sm:w-[720px]"
    >
      <ProjectArt project={project} className="h-[58%] w-full" />
      <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-bold tracking-tight sm:text-2xl">
            {project.name}
          </h3>
          <span className="shrink-0 text-[11px] text-text-mid sm:text-xs">
            {project.industry}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-hair-strong px-3 py-1 text-[11px] text-text-mid"
            >
              {s}
            </span>
          ))}
        </div>
        {project.result && (
          <p className="text-[13px] text-cyan">Result — {project.result}</p>
        )}
      </div>
      <span className="pointer-events-none absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-violet px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-white opacity-0 shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-opacity duration-300 group-hover:opacity-100">
        View Project
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const pinned = !isTouch && !reduced;

  useEffect(() => {
    if (!pinned || !section.current || !track.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const el = track.current;

    const ctx = gsap.context(() => {
      const distance = () => el.scrollWidth - window.innerWidth + 120;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [pinned]);

  return (
    <section id="work" ref={section} className="relative overflow-hidden py-28 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 text-center sm:px-10">
        <p className="kicker">
          <span className="font-display text-violet">04</span> — Work
        </p>
        <RevealText
          as="h2"
          className="mt-4 font-display text-[clamp(1.9rem,4.8vw,2.9rem)] font-bold tracking-tight"
        >
          WORK WE&apos;VE CRAFTED.
        </RevealText>
        <p className="mt-3 text-[13px] text-text-mid">
          Ideas are easy. Execution is everything.
        </p>
      </div>

      <div
        className={`mt-16 ${
          pinned
            ? ""
            : "flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
        }`}
      >
        <div
          ref={track}
          className={
            pinned
              ? "flex gap-8 px-6 will-change-transform sm:px-10"
              : "flex gap-6"
          }
        >
          {projects.map((p) => (
            <div key={p.slug} className={pinned ? "" : "snap-center"}>
              <Panel project={p} />
            </div>
          ))}
        </div>
      </div>

      <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
        04 / 09
      </span>
    </section>
  );
}
