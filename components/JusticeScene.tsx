"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScalesOfJustice() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (groupRef.current) {
      // Setup initial state
      groupRef.current.position.set(0, 0.5, 0);
      groupRef.current.rotation.set(0, 0, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        },
      });

      // Animate position and rotation over the entire scroll length
      tl.to(groupRef.current.position, {
        x: 1.5,
        y: -2,
        z: -1,
        ease: "power1.inOut",
      }, 0)
      .to(groupRef.current.rotation, {
        x: Math.PI * 0.5,
        y: Math.PI * 2,
        ease: "power1.inOut",
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Floating effect
  useFrame((state) => {
    if (meshRef.current) {
      // Use state.clock.elapsedTime instead of Date.now() for smoother R3F animations
      // Avoids the THREE.Clock deprecation if we just use the delta/elapsed from useFrame directly
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

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
    <group ref={groupRef} scale={1.2}>
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
    </group>
  );
}
