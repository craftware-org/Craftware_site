"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const WORDS = ["CRAFT", "CREATE", "GROW"];

/**
 * Act 00. CRAFTWARE assembles → snaps through CRAFT · CREATE · GROW → curtain wipe up.
 * ~1.9s total. Locks scroll while visible. Skipped for reduced motion.
 * Deliberately CSS-driven (no AnimatePresence) so the exit can never hang.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [wordIndex, setWordIndex] = useState(-1);

  useEffect(() => {
    if (reduced) {
      setMounted(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setWordIndex(0), 700));
    t.push(setTimeout(() => setWordIndex(1), 1050));
    t.push(setTimeout(() => setWordIndex(2), 1400));
    t.push(setTimeout(() => setLeaving(true), 1850));
    t.push(
      setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
      }, 2600)
    );
    return () => {
      t.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  if (reduced || !mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: leaving ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(600px_400px_at_50%_50%,#000,transparent_80%)]" />

      <div className="relative text-center">
        {wordIndex < 0 ? (
          <div className="flex overflow-hidden font-display text-2xl font-bold tracking-[0.14em] sm:text-3xl">
            {"CRAFTWARE".split("").map((c, i) => (
              <span
                key={i}
                className="inline-block [animation:cw-rise_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${0.05 + i * 0.04}s` }}
              >
                {c}
              </span>
            ))}
          </div>
        ) : (
          <div
            key={wordIndex}
            className="font-display text-4xl font-bold tracking-tight text-gradient [animation:cw-swap_0.3s_ease-out_both] sm:text-6xl"
          >
            {WORDS[wordIndex]}
          </div>
        )}

        <div className="mx-auto mt-6 h-px w-40 overflow-hidden bg-hair">
          <div className="h-full origin-left bg-[linear-gradient(90deg,#8b5cf6,#22d3ee)] [animation:cw-bar_1.85s_linear_both]" />
        </div>
      </div>

      <style>{`
        @keyframes cw-rise {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes cw-swap {
          from { transform: translateY(18px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes cw-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
