"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function ContactScene({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Particle sphere geometry
  const particlesCount = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount; i++) {
      const r = 2.5 + Math.random() * 0.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <group position={position}>
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0.2} wireframe />
        </mesh>
        
        {/* Core light */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>

        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesCount}
              array={positions}
              itemSize={3}
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} sizeAttenuation={true} />
        </points>
      </Float>
    </group>
  );
}
