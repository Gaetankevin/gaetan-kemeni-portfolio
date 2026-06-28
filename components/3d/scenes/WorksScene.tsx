"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export function WorksScene({ 
  position, 
  isMobile = false 
}: { 
  position: [number, number, number]; 
  isMobile?: boolean; 
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Solution 2: Pre-allocate geometries and dispose of them on unmount to prevent memory leaks and GC pressure
  const boxGeo = useMemo(() => new THREE.BoxGeometry(2, 3, 0.05), []);

  useEffect(() => {
    return () => {
      boxGeo.dispose();
    };
  }, [boxGeo]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
      });
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {[0, 1, 2].map((i) => (
          <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
            <mesh 
              position={[(i - 1) * 2.5, i * 0.5 - 0.5, i * -2]} 
              rotation={[0.1, -0.2, 0]}
              geometry={boxGeo}
            >
              {/* Option 2: Fallback to lightweight meshPhysicalMaterial on mobile devices */}
              {isMobile ? (
                <meshPhysicalMaterial
                  transmission={1}
                  thickness={0.5}
                  roughness={0.1}
                  color="#ffffff"
                  clearcoat={1}
                />
              ) : (
                <MeshTransmissionMaterial
                  background={new THREE.Color("#000000")}
                  transmission={1}
                  thickness={0.5}
                  roughness={0.1}
                  ior={1.2}
                  chromaticAberration={0.05}
                />
              )}

              <mesh scale={[1.01, 1.01, 1.01]} geometry={boxGeo}>
                 <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
              </mesh>
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
}
