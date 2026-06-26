"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ScalesOfJustice } from "@/components/3d/JusticeScene";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#06070b]">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10 bg-[#06070b] overflow-y-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet-900/10 blur-[120px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 w-full">
          <RegisterForm />
        </div>
      </div>

      {/* Right side: 3D Visual */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-950 border-l border-white/5 overflow-hidden">
        {/* Decorative elements over the 3D canvas */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#06070b] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-12 right-12 z-10">
          <div className="text-xl font-bold tracking-widest text-white">
            SOS<span className="font-light text-white/70">JURISTES</span>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <h2 className="text-3xl font-light text-white mb-4">L'excellence juridique à portée de main.</h2>
          <p className="text-white/50 text-lg font-light leading-relaxed">
            Rejoignez le premier écosystème numérique qui connecte les justiciables aux meilleurs professionnels du droit au Cameroun, de manière sécurisée et confidentielle.
          </p>
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            camera={{
              position: [0, 0, 5],
              fov: 35,
            }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={["#030305"]} />
            <Suspense fallback={null}>
              <ScalesOfJustice />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
