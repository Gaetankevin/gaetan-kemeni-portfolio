"use client";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PortfolioOverlay } from "@/components/layout/PortfolioOverlay";
import { Experience } from "@/components/3d/Experience";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial run
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SmoothScroll />
      
      {/* COUCHE 0 : Canvas Fixe */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#09090b]">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50 text-xs tracking-[0.4em] uppercase font-extralight">Loading Experience...</div>}>
          <Experience scrollProgress={scrollProgress} />
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
