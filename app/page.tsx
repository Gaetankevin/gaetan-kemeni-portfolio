import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PortfolioOverlay } from "@/components/layout/PortfolioOverlay";
import { Experience } from "@/components/3d/Experience";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      
      {/* COUCHE 0 : Canvas Fixe */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#09090b]">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50 text-xs tracking-[0.4em] uppercase font-extralight">Loading Experience...</div>}>
          <Experience />
        </Suspense>
      </div>

      {/* COUCHE 1 : DOM Sémantique */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        <PortfolioOverlay />
      </div>

      {/* COUCHE 2 : Moteur de Scroll (Scroll Track pour GSAP) */}
      <main className="scroll-track relative w-full h-[500vh] opacity-0 pointer-events-none">
        {/* Cet élément ne sert qu'à créer la barre de défilement pour GSAP ScrollTrigger */}
      </main>
    </>
  );
}
