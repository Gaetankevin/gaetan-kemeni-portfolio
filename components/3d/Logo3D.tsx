"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ScalesGeometry } from "./ScalesGeometry";

function LogoModel() {
  const meshRef = useRef<THREE.Group>(null);

  // Infinite slow rotation for the logo
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      // Slight floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group scale={1.8} position={[0, -0.2, 0]}>
      <ScalesGeometry meshRef={meshRef} />
    </group>
  );
}

export function Logo3D() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={2} color="#8b5cf6" />
        <pointLight position={[-2, -2, 2]} intensity={1} color="#f5f3ff" />
        <LogoModel />
      </Canvas>
    </div>
  );
}
