"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export function EcosystemScene({ 
  position, 
  isMobile = false 
}: { 
  position: [number, number, number]; 
  isMobile?: boolean; 
}) {
  const laptopRef = useRef<THREE.Group>(null);
  const serverRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (serverRef.current) {
      serverRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - 1;
    }
    if (laptopRef.current) {
       laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* SERVER RACK (Backend) */}
      <group ref={serverRef} position={[1.5, -1, -1]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, i * 0.5, 0]}>
            <boxGeometry args={[1.5, 0.4, 1.2]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
            {/* Blinking lights */}
            <mesh position={[0.6, 0, 0.61]}>
              <boxGeometry args={[0.05, 0.05, 0.01]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#00ffcc" : "#ffffff"} />
            </mesh>
            <mesh position={[0.4, 0, 0.61]}>
              <boxGeometry args={[0.05, 0.05, 0.01]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* LAPTOP (Frontend) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={laptopRef} position={[-1.5, 1, 1]} rotation={[0.2, 0.5, -0.1]}>
          {/* Base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.4, 0.1, 1.6]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.8, -0.75]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[2.4, 1.6, 0.05]} />
            
            {/* Option 2: Fallback to lightweight meshPhysicalMaterial on mobile devices */}
            {isMobile ? (
              <meshPhysicalMaterial
                transmission={0.9}
                thickness={0.1}
                roughness={0}
                color="#ffffff"
                clearcoat={1}
              />
            ) : (
              <MeshTransmissionMaterial
                background={new THREE.Color("#000000")}
                transmission={0.9}
                thickness={0.1}
                roughness={0}
                ior={1.5}
              />
            )}
          </mesh>
          {/* Screen Glow */}
          <mesh position={[0, 0.8, -0.73]} rotation={[-0.3, 0, 0]}>
             <planeGeometry args={[2.2, 1.4]} />
             <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </Float>
      
      {/* Connecting Data Line */}
      <mesh position={[0, 0, 0]} rotation={[0, -Math.PI/4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
