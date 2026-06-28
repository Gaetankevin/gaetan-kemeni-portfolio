"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Noise, Vignette, DepthOfField } from "@react-three/postprocessing";
import { SignatureObject } from "./SignatureObject";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

// The camera rig that reacts to the scroll timeline
function CameraRig() {
  const { camera, size } = useThree();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Dynamic FOV for mobile resilience
    const aspect = size.width / size.height;
    if (camera instanceof THREE.PerspectiveCamera) {
      // eslint-disable-next-line react-hooks/immutability
      camera.fov = aspect < 1 ? 60 : 45;
      camera.updateProjectionMatrix();
    }
  }, [size, camera]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial camera position
    camera.position.set(0, 0, 5);

    // Create a GSAP timeline linked to the scroll container (.scroll-track)
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
    });

    const tl = timelineRef.current;

    // SECTION 1 (Hero to About)
    tl.to(camera.position, {
      x: 3,
      y: 1,
      z: 3,
      ease: "power2.inOut",
    }, 0);
    
    // SECTION 2 (About to Ecosystem)
    tl.to(camera.position, {
      x: -2,
      y: -1,
      z: 4,
      ease: "power2.inOut",
    }, 1);

    // SECTION 3 (Ecosystem to Realisations)
    tl.to(camera.position, {
      x: 2,
      y: -2,
      z: 5,
      ease: "power2.inOut",
    }, 2);

    // SECTION 4 (Realisations to Contact)
    tl.to(camera.position, {
      x: 0,
      y: 0,
      z: 6,
      ease: "power2.inOut",
    }, 3);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [camera]);

  useFrame(() => {
    // Smoothly interpolate the camera's lookAt to always face the center
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export function Experience() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={["#000000"]} />
      
      {/* Surgical lighting: very stark, high contrast */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#ffffff" 
      />
      <spotLight 
        position={[-5, -5, -5]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        color="#888888" 
      />

      {/* Environment for reflections on the glass object */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
          <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
          <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        </group>
      </Environment>

      <SignatureObject />
      <CameraRig />

      <EffectComposer multisampling={4}>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
