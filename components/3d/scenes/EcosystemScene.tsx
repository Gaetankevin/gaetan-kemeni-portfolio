"use client";
import { useRef, useMemo, useEffect } from "react";
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

  // Solution 2: Pre-allocate geometries and dispose of them on unmount to prevent memory leaks and GC pressure
  const { serverUnitGeo, ledGeo, baseGeo, screenGeo, glowGeo, lineGeo } = useMemo(() => {
    const su = new THREE.BoxGeometry(1.5, 0.4, 1.2);
    const led = new THREE.BoxGeometry(0.05, 0.05, 0.01);
    const base = new THREE.BoxGeometry(2.4, 0.1, 1.6);
    const screen = new THREE.BoxGeometry(2.4, 1.6, 0.05);
    const glow = new THREE.PlaneGeometry(2.2, 1.4);
    const line = new THREE.CylinderGeometry(0.02, 0.02, 5);
    return { serverUnitGeo: su, ledGeo: led, baseGeo: base, screenGeo: screen, glowGeo: glow, lineGeo: line };
  }, []);

  useEffect(() => {
    return () => {
      serverUnitGeo.dispose();
      ledGeo.dispose();
      baseGeo.dispose();
      screenGeo.dispose();
      glowGeo.dispose();
      lineGeo.dispose();
    };
  }, [serverUnitGeo, ledGeo, baseGeo, screenGeo, glowGeo, lineGeo]);

  useFrame((state, delta) => {
    if (serverRef.current) {
      serverRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05 - 1;
    }
    if (laptopRef.current) {
       laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* SERVER RACK (Backend) */}
      <group ref={serverRef} position={[1.5, -1, -1]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} geometry={serverUnitGeo} position={[0, i * 0.5, 0]}>
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
            {/* Blinking lights */}
            <mesh geometry={ledGeo} position={[0.6, 0, 0.61]}>
              <meshBasicMaterial color={i % 2 === 0 ? "#00ffcc" : "#ffffff"} />
            </mesh>
            <mesh geometry={ledGeo} position={[0.4, 0, 0.61]}>
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* LAPTOP (Frontend) */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
        <group ref={laptopRef} position={[-1.5, 1, 1]} rotation={[0.2, 0.5, -0.1]}>
          {/* Base */}
          <mesh geometry={baseGeo} position={[0, 0, 0]}>
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Screen */}
          <mesh geometry={screenGeo} position={[0, 0.8, -0.75]} rotation={[-0.3, 0, 0]}>
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
          <mesh geometry={glowGeo} position={[0, 0.8, -0.73]} rotation={[-0.3, 0, 0]}>
             <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </Float>
      
      {/* Connecting Data Line */}
      <mesh geometry={lineGeo} position={[0, 0, 0]} rotation={[0, -Math.PI/4, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
