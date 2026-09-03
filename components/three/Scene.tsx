"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import type { RefObject } from "react";
import GlassMonolith from "./GlassMonolith";
import Particles from "./Particles";

type Props = {
  pointer?: RefObject<{ x: number; y: number }> | null;
  scrollProgress?: RefObject<number> | null;
  quality?: "high" | "low";
  particles?: number;
  className?: string;
};

/**
 * Shared WebGL scene for the signature object. One transparent Canvas, lit
 * with coloured point lights (no network HDR, no multi-pass materials) so it
 * renders reliably. Adaptive DPR keeps it cheap.
 */
export default function Scene({
  pointer,
  scrollProgress,
  quality = "high",
  particles = 90,
  className,
}: Props) {
  return (
    <Canvas
      className={className}
      dpr={[1, quality === "high" ? 1.8 : 1.3]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
    >
      <AdaptiveDpr pixelated />

      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#c7b8ff", "#0a0a12", 0.9]} />
      <directionalLight position={[3, 5, 6]} intensity={2.4} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={60} color="#8b5cf6" />
      <pointLight position={[-4, -1, 3]} intensity={45} color="#22d3ee" />
      <pointLight position={[0, 3, -4]} intensity={30} color="#3b82f6" />
      <pointLight position={[0, -3, 2]} intensity={18} color="#6d28d9" />

      <GlassMonolith
        pointer={pointer}
        scrollProgress={scrollProgress}
        quality={quality}
      />
      {particles > 0 && <Particles count={particles} />}
    </Canvas>
  );
}
