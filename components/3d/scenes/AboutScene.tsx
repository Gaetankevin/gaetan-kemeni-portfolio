"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function AboutScene({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  // Solution 2: Pre-allocate geometries and dispose of them on unmount to prevent memory leaks and GC pressure
  const { torus1Geo, torus2Geo, coreGeo } = useMemo(() => {
    const t1 = new THREE.TorusGeometry(2, 0.02, 16, 100);
    const t2 = new THREE.TorusGeometry(1.5, 0.02, 16, 100);
    const c = new THREE.IcosahedronGeometry(0.5, 1);
    return { torus1Geo: t1, torus2Geo: t2, coreGeo: c };
  }, []);

  useEffect(() => {
    return () => {
      torus1Geo.dispose();
      torus2Geo.dispose();
      coreGeo.dispose();
    };
  }, [torus1Geo, torus2Geo, coreGeo]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.02;
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group position={position}>
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Outer Ring */}
          <mesh geometry={torus1Geo}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          {/* Middle Ring */}
          <mesh geometry={torus2Geo} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>
          {/* Inner Core */}
          <mesh geometry={coreGeo}>
            <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
