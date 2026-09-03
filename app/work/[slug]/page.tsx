import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectArt from "@/components/ui/ProjectArt";
import RevealText from "@/components/ui/RevealText";
import CaseMetrics from "@/components/sections/CaseMetrics";
import { projects, projectBySlug } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="relative overflow-hidden pt-24">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light" />

      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-hair py-6 text-[12px] text-text-mid">
          <Link href="/#work" className="inline-flex items-center gap-2 hover:text-text-hi">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M11 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All work
          </Link>
          <span className="font-display">
            {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <header className="pt-16 text-center sm:pt-24">
          <p className="kicker tracking-[0.24em]">Case Study — {project.industry}</p>
          <RevealText
            as="h1"
            className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,6vw,4.2rem)] font-bold leading-[1.02] tracking-tight"
          >
            {project.name}
          </RevealText>
        </header>

        <dl className="mt-14 grid grid-cols-2 border border-hair sm:grid-cols-4">
          {[
            ["Industry", project.industry],
            ["Services", project.services.join(" · ")],
            ["Timeline", project.timeline],
            ["Year", project.year],
          ].map(([k, v]) => (
            <div key={k} className="border-hair p-5 [&:not(:last-child)]:border-r [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0">
              <dt className="meta-label">{k}</dt>
              <dd className="mt-2 text-[13px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-12 max-w-[1100px] px-6 sm:px-10">
        <ProjectArt
          project={project}
          className="h-[46vw] max-h-[560px] w-full rounded-xl border border-hair-strong"
        />
      </div>

      <div className="mx-auto max-w-[780px] px-6 sm:px-10">
        {project.sections.map((s) => (
          <section key={s.id} className="mt-28 first:mt-24">
            <div
              className={`font-display text-[15px] tracking-[0.14em] ${
                s.title === "Result" ? "text-cyan" : "text-violet"
              }`}
            >
              {s.id} — {s.title.toUpperCase()}
            </div>
            <p className="mt-6 text-[18px] leading-[1.75] text-[#c7c7d0]">{s.body}</p>
            {s.bullets && (
              <ul className="mt-7 space-y-3.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3.5 text-[15px] leading-relaxed text-text-mid">
                    <span className="text-cyan">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-[1100px] px-6 sm:px-10">
        <CaseMetrics metrics={project.metrics} />
      </div>

      <div className="mx-auto mt-32 max-w-[1100px] border-t border-hair px-6 pt-12 text-center sm:px-10">
        <p className="meta-label tracking-[0.24em]">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="mt-4 inline-flex items-center gap-4 font-display text-[clamp(1.6rem,5vw,3rem)] font-bold tracking-tight transition-colors hover:text-violet"
        >
          {next.name}
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
