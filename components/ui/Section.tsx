import type { ReactNode } from "react";

type Props = {
  id?: string;
  index?: string; // "03"
  total?: string; // "09"
  kicker?: string; // "Capabilities"
  className?: string;
  children: ReactNode;
};

/** Consistent section frame: id anchor, corner index, kicker line. */
export default function Section({
  id,
  index,
  total = "09",
  kicker,
  className = "",
  children,
}: Props) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
      {index ? (
        <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
          {index} / {total}
        </span>
      ) : null}
      {kicker ? <span className="sr-only">{kicker}</span> : null}
    </section>
  );
}
