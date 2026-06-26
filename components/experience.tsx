"use client";
import { ScalesOfJustice } from "./JusticeScene";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { PerspectiveCamera } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <fog attach="fog" args={["#06070b", 2, 8]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={42} />
      
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 4]} intensity={1.6} color="#8b5cf6" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#f5f3ff" />
      
      <ScalesOfJustice />
      
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        <Noise opacity={0.045} />
        <Vignette eskil={0.5} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
};