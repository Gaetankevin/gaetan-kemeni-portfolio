"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export function SignatureObject({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Solution 2: Pre-allocate geometries and dispose of them on unmount to prevent memory leaks and GC pressure
  const { crystalGeo, coreGeo } = useMemo(() => {
    const crystal = new THREE.IcosahedronGeometry(1.5, 0);
    const core = new THREE.OctahedronGeometry(0.8, 0);
    return { crystalGeo: crystal, coreGeo: core };
  }, []);

  useEffect(() => {
    return () => {
      crystalGeo.dispose();
      coreGeo.dispose();
    };
  }, [crystalGeo, coreGeo]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} castShadow receiveShadow geometry={crystalGeo}>
        {/* Option 2: Fallback to lightweight meshPhysicalMaterial on mobile devices */}
        {isMobile ? (
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.5}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
            color="#ffffff"
          />
        ) : (
          <MeshTransmissionMaterial
            background={new THREE.Color("#000000")}
            transmission={1}
            thickness={1.5}
            roughness={0.1}
            ior={1.5}
            chromaticAberration={0.04}
            anisotropy={0.3}
            color="#ffffff"
            attenuationDistance={2}
            attenuationColor="#ffffff"
          />
        )}
      </mesh>
      
      {/* Inner geometric core to add complexity to the refraction */}
      <mesh geometry={coreGeo}>
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe 
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}
