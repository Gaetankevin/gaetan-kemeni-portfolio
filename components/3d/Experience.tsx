"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Preload } from "@react-three/drei";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { SignatureObject } from "./SignatureObject";
import { AboutScene } from "./scenes/AboutScene";
import { EcosystemScene } from "./scenes/EcosystemScene";
import { WorksScene } from "./scenes/WorksScene";
import { ContactScene } from "./scenes/ContactScene";
import { useEffect, useRef, useState } from "react";
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

    const ctx = gsap.context(() => {
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

      // SECTION 1 (Hero to About) - Vol rapide entre 10% et 15%
      tl.to(camera.position, { x: 20, y: 0, z: -15, ease: "power1.inOut", duration: 5 }, 10);
      tl.to(lookAtTarget.current, { x: 20, y: 0, z: -20, ease: "power1.inOut", duration: 5 }, 10);
      
      // SECTION 2 (About to Ecosystem) - Vol rapide entre 45% et 50%
      tl.to(camera.position, { x: 40, y: 0, z: -35, ease: "power1.inOut", duration: 5 }, 45);
      tl.to(lookAtTarget.current, { x: 40, y: 0, z: -40, ease: "power1.inOut", duration: 5 }, 45);

      // SECTION 3 (Ecosystem to Realisations) - Vol rapide entre 70% et 75%
      tl.to(camera.position, { x: 60, y: 0, z: -55, ease: "power1.inOut", duration: 5 }, 70);
      tl.to(lookAtTarget.current, { x: 60, y: 0, z: -60, ease: "power1.inOut", duration: 5 }, 70);

      // SECTION 4 (Realisations to Contact) - Vol rapide entre 90% et 95%
      tl.to(camera.position, { x: 80, y: 0, z: -75, ease: "power1.inOut", duration: 5 }, 90);
      tl.to(lookAtTarget.current, { x: 80, y: 0, z: -80, ease: "power1.inOut", duration: 5 }, 90);
    });

    return () => ctx.revert();
  }, [camera]);

  useFrame(() => {
    // Smoothly interpolate the camera's lookAt to always face the center
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export function Experience({ scrollProgress = 0 }: { scrollProgress?: number }) {
  // Mobile check state for adaptive geometry and materials
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Performance optimization: Mount/unmount 3D scenes dynamically based on active viewport progress
  // to avoid rendering MeshTransmissionMaterial calculations on invisible objects.
  const showHero = scrollProgress < 18;
  const showAbout = scrollProgress >= 8 && scrollProgress < 52;
  const showEcosystem = scrollProgress >= 43 && scrollProgress < 77;
  const showWorks = scrollProgress >= 68 && scrollProgress < 97;
  const showContact = scrollProgress >= 88;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      // Cap DPR to 1.5 to save ~40% GPU power on Retina/High-DPI displays
      dpr={[1, 1.5]}
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
        castShadow={!isMobile} 
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

      {/* THE 5 SCENES SCATTERED IN SPACE - DYNAMICALLY MOUNTED */}
      {showHero && (
        <group position={[0, 0, 0]}>
          <SignatureObject isMobile={isMobile} />
        </group>
      )}
      
      {showAbout && <AboutScene position={[20, 0, -20]} />}
      {showEcosystem && <EcosystemScene position={[40, 0, -40]} isMobile={isMobile} />}
      {showWorks && <WorksScene position={[60, 0, -60]} isMobile={isMobile} />}
      {showContact && <ContactScene position={[80, 0, -80]} />}

      <CameraRig />

      {/* Disabled multisampling and DepthOfField to resolve lag on mobile and lower-end GPUs */}
      <EffectComposer multisampling={0}>
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      {/* Precompile all shader programs during loading to avoid render stutters on dynamic mount */}
      <Preload all />
    </Canvas>
  );
}
