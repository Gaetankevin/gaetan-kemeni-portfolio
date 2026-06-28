"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export function SignatureObject() {
  const meshRef = useRef<THREE.Mesh>(null);

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
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Icosahedron provides a nice crystal-like base geometry */}
        <icosahedronGeometry args={[1.5, 0]} />
        
        {/* High-end glass/crystal material for "épure" and cinematic look */}
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
      </mesh>
      
      {/* Inner geometric core to add complexity to the refraction */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
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
