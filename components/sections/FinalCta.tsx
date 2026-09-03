import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import SignatureObject from "@/components/three/SignatureObject";
import { mailtoHref, whatsappHref } from "@/config/site";

export default function FinalCta() {
  return (
    <section
      id="move"
      className="relative flex min-h-[90svh] items-center overflow-hidden py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_520px_at_24%_40%,rgba(139,92,246,0.24),transparent_64%),radial-gradient(560px_420px_at_90%_78%,rgba(34,211,238,0.1),transparent_62%)]" />

      {/* sibling object drifts behind the text */}
      <div className="pointer-events-none absolute -left-[8%] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 opacity-70 md:block">
        <SignatureObject className="absolute inset-0" withParallax={false} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <RevealText
          as="h2"
          className="max-w-[16ch] font-display text-[clamp(2.4rem,8vw,5.35rem)] font-bold leading-[0.98] tracking-tight"
        >
          YOUR NEXT BIG MOVE STARTS HERE.
        </RevealText>

        <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-text-mid">
          Have an idea? Need more customers? Want to transform your digital
          presence?
        </p>

        <div className="mt-9 flex flex-wrap gap-3.5">
          <MagneticButton href={mailtoHref("Start a project")} cursor="Let's Talk">
            Start a Project
          </MagneticButton>
          <MagneticButton href={whatsappHref()} variant="ghost">
            WhatsApp Us
          </MagneticButton>
        </div>
      </div>

      <span className="meta-label pointer-events-none absolute bottom-6 right-6 sm:right-10">
        09 / 09
      </span>
    </section>
  );
}
