"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import type { RefObject } from "react";

type Props = {
  pointer?: RefObject<{ x: number; y: number }> | null;
  quality?: "high" | "low";
  scrollProgress?: RefObject<number> | null;
};

/** Extruded open "C" band that sits proud of the monolith's front face. */
function useCGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const rOuter = 0.36;
    const rInner = 0.2;
    shape.absarc(0, 0, rOuter, Math.PI * 0.32, Math.PI * 1.68, false);
    shape.absarc(0, 0, rInner, Math.PI * 1.68, Math.PI * 0.32, true);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 32,
    });
    geo.center();
    return geo;
  }, []);
}

/**
 * The signature object: a stepped architectural monolith — frosted violet
 * glass massing, lit from within, with a glowing "C" on its face. Standard
 * MeshStandardMaterial only (no transmission / FBO passes) so it renders
 * reliably on every GPU.
 */
export default function GlassMonolith({ pointer, scrollProgress }: Props) {
  const group = useRef<THREE.Group>(null);
  const cMark = useRef<THREE.Mesh>(null);
  const cGeo = useCGeometry();

  const blocks = useMemo(
    () => [
      { size: [1.2, 2.0, 0.92] as const, pos: [0, 0, 0] as const, main: true },
      { size: [0.66, 0.5, 1.05] as const, pos: [0.36, 0.98, 0.02] as const, main: false },
      { size: [1.34, 0.32, 0.62] as const, pos: [-0.1, -1.02, 0.14] as const, main: false },
    ],
    []
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const px = pointer?.current?.x ?? 0;
    const py = pointer?.current?.y ?? 0;
    const sp = scrollProgress?.current ?? 0;

    const targetY = -0.4 + px * 0.5 + t * 0.12 + sp * Math.PI * 1.1;
    const targetX = 0.12 - py * 0.3 + Math.sin(t * 0.3) * 0.04;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.4, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, px * 0.1, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, 0.05 - py * 0.08 + Math.sin(t * 0.7) * 0.04, 3, delta);

    if (cMark.current) {
      (cMark.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.7 + Math.sin(t * 1.5) * 0.4;
    }
  });

  return (
    <group ref={group} rotation={[0.12, -0.5, 0]} scale={1.05}>
      {/* inner glow core */}
      <mesh scale={[0.58, 1.55, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1c1340" emissive="#7c5cff" emissiveIntensity={0.9} roughness={0.6} />
      </mesh>

      {blocks.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={b.main ? "#8f7bd8" : "#a99ae6"}
            emissive="#5b3fb0"
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.28}
            transparent
            opacity={0.86}
          />
          <Edges threshold={15} color={b.main ? "#d8ccff" : "#a08bff"} />
        </mesh>
      ))}

      {/* glowing C on the front face */}
      <mesh ref={cMark} geometry={cGeo} position={[0, 0.14, 0.52]} scale={1.5}>
        <meshStandardMaterial color="#170d2b" emissive="#8b5cf6" emissiveIntensity={1.7} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh geometry={cGeo} position={[0, 0.14, 0.44]} scale={1.72}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}
