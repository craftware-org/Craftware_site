import Image from "next/image";
import type { Project } from "@/content/projects";

const wash: Record<Project["accent"], string> = {
  violet:
    "radial-gradient(600px 300px at 32% 20%, rgba(139,92,246,0.42), transparent 60%), linear-gradient(160deg, #1A1730, #0D0C16)",
  blue: "radial-gradient(600px 300px at 32% 20%, rgba(59,130,246,0.4), transparent 60%), linear-gradient(160deg, #101a2e, #0C0C12)",
  cyan: "radial-gradient(600px 300px at 32% 20%, rgba(34,211,238,0.32), transparent 60%), linear-gradient(160deg, #0c2128, #0C0C12)",
};

/** Screenshot when available, else a branded abstract placeholder. */
export default function ProjectArt({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (project.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={project.image}
          alt={`${project.name} — project preview`}
          fill
          sizes="(max-width: 768px) 90vw, 780px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: wash[project.accent] }}
      aria-hidden
    >
      <span className="px-6 text-center font-display text-2xl font-bold tracking-tight text-white/80 sm:text-4xl">
        {project.name.split(" ").slice(0, 2).join(" ").toUpperCase()}
      </span>
    </div>
  );
}
