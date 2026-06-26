"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScalesGeometry } from "./ScalesGeometry";

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
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      <ScalesGeometry meshRef={meshRef} />
    </group>
  );
}
