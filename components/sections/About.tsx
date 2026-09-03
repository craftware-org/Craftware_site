import RevealText from "@/components/ui/RevealText";
import TechConstellation from "@/components/ui/TechConstellation";

const team = ["A", "B", "C", "D"];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 sm:py-36">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light" />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <p className="kicker">
          <span className="font-display text-violet">07</span> — Studio
        </p>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <RevealText
              as="h2"
              className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight"
            >
              WE&apos;RE CRAFTWARE.
            </RevealText>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-text-mid">
              <p>
                We&apos;re a digital growth studio built for businesses that
                don&apos;t want to blend in.
              </p>
              <p>
                We combine design, technology and performance marketing to create
                digital experiences that look exceptional and deliver measurable
                results.
              </p>
            </div>

            <div className="mt-10 flex gap-3">
              {team.map((t) => (
                <div
                  key={t}
                  className="h-16 w-16 rounded-full border border-hair bg-[linear-gradient(150deg,#1a1730,#0c0c12)]"
                  aria-hidden
                />
              ))}
            </div>
          </div>

          <div>
            <p className="meta-label mb-4">Capabilities & tools</p>
            <TechConstellation />
          </div>
        </div>
      </div>

      <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
        07 / 09
      </span>
    </section>
  );
}
