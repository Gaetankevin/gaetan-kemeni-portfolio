import { useMemo } from "react";
import * as THREE from "three";

export function ScalesGeometry({ meshRef }: { meshRef?: React.RefObject<THREE.Group | null> }) {
  const wireMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#a78bfa",
        emissive: "#4c1d95",
        emissiveIntensity: 0.5,
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85,
        wireframe: true,
      }),
    []
  );

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f5f3ff",
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      }),
    []
  );

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0.85, 0]} material={wireMaterial}>
        <torusGeometry args={[1.1, 0.03, 10, 120]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} material={wireMaterial}>
        <torusGeometry args={[0.8, 0.025, 10, 90]} />
      </mesh>
      <mesh position={[0, -0.3, 0]} material={frameMaterial}>
        <boxGeometry args={[0.9, 0.08, 0.12]} />
      </mesh>
      <mesh position={[-0.45, 0.15, 0]} material={wireMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 10]} />
      </mesh>
      <mesh position={[0.45, 0.15, 0]} material={wireMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 10]} />
      </mesh>
      <mesh position={[0, -0.75, 0]} material={wireMaterial}>
        <cylinderGeometry args={[0.12, 0.14, 0.25, 24]} />
      </mesh>
      <mesh position={[0, -1.05, 0]} material={frameMaterial}>
        <torusKnotGeometry args={[0.2, 0.02, 180, 12]} />
      </mesh>
    </group>
  );
}
