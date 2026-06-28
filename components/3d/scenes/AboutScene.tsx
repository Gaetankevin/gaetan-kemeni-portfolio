"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function AboutScene({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={groupRef}>
          {/* Outer Ring */}
          <mesh>
            <torusGeometry args={[2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          {/* Middle Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>
          {/* Inner Core */}
          <mesh>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
