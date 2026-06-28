"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function PortfolioOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLElement>(".portfolio-section");
    
    // Animate each section based on the overall scroll progress
    // We have 5 sections spread over the 500vh scroll-track
    sections.forEach((section, index) => {
      // Calculate start and end points for each section (e.g., 0-20%, 20-40%, etc.)
      const start = `${index * 20}%`;
      const end = `${(index + 1) * 20}%`;

      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".scroll-track",
            start: `${start} top`,
            end: `${parseFloat(start) + 10}% top`,
            scrub: true,
          },
        }
      );

      gsap.to(section, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: ".scroll-track",
          start: `${parseFloat(end) - 10}% top`,
          end: `${end} top`,
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      
      {/* HEADER FIXE (Logo, menu) */}
      <header className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 pointer-events-auto mix-blend-difference text-white">
        <div className="font-sans font-bold text-sm tracking-[0.3em] uppercase">
          Gaëtan K.
        </div>
        <div className="font-extralight text-xs tracking-widest uppercase opacity-70">
          Portfolio 2026
        </div>
      </header>

      {/* SECTION 1 : HERO */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24 pointer-events-auto mix-blend-difference text-white">
        <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
          Ingénieur Full-Stack
        </h2>
        <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9]">
          Creative <br />
          <span className="font-bold">Technologist.</span>
        </h1>
      </section>

      {/* SECTION 2 : ABOUT */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 pointer-events-auto mix-blend-difference text-white opacity-0">
        <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
          L&apos;Épure
        </h2>
        <p className="max-w-xl text-2xl md:text-4xl font-extralight leading-snug">
          Fusionner la <span className="italic">robustesse backend</span> avec la précision du <span className="font-medium">design sémantique</span>.
        </p>
        <p className="max-w-md text-sm md:text-base opacity-60 mt-8 font-light tracking-wide leading-relaxed">
          Création d&apos;architectures complètes où les performances serveur rencontrent des interfaces cinématographiques.
        </p>
      </section>

      {/* SECTION 3 : ECOSYSTEME */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24 pointer-events-auto text-white opacity-0">
        <div className="w-full max-w-6xl">
          <h2 className="text-xs uppercase tracking-[0.5em] font-medium text-white/50 mb-12 mix-blend-difference">
            Écosystème
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mix-blend-difference">
            {/* FRONTEND */}
            <div>
               <h3 className="text-xs uppercase tracking-widest opacity-40 mb-6 border-b border-white/20 pb-4">Frontend & 3D</h3>
               <ul className="space-y-4 text-lg md:text-2xl font-extralight">
                 <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">01</span> Vue.js / Nuxt</li>
                 <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">02</span> React / Next.js</li>
                 <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">03</span> Three.js / GSAP</li>
               </ul>
            </div>
            {/* BACKEND */}
            <div>
               <h3 className="text-xs uppercase tracking-widest opacity-40 mb-6 border-b border-white/20 pb-4">Backend & Data</h3>
               <ul className="space-y-4 text-lg md:text-2xl font-extralight">
                 <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">04</span> Laravel / PHP</li>
                 <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">05</span> Django / FastAPI</li>
                 <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">06</span> Node.js / Prisma</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 : REALISATIONS */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 pointer-events-auto text-white opacity-0">
        <div className="w-full max-w-4xl mix-blend-difference">
          <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-12">
            Réalisations
          </h2>
          <div className="space-y-8">
            <div className="group cursor-pointer">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight group-hover:italic transition-all">Plateforme E-Commerce</h3>
              <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Vue.js • Laravel • Stripe</p>
            </div>
            <div className="group cursor-pointer">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight group-hover:italic transition-all">SaaS Analytique</h3>
              <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Next.js • FastAPI • PostgreSQL</p>
            </div>
            <div className="group cursor-pointer">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight group-hover:italic transition-all">Expérience WebGL 3D</h3>
              <p className="text-xs uppercase tracking-widest opacity-50 mt-2">React • Three.js • GSAP</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 : CONTACT */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-center text-center p-8 md:p-24 pointer-events-auto mix-blend-difference text-white opacity-0">
        <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
          Collaborer
        </h2>
        <a href="mailto:g45398364@gmail.com" className="group">
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter leading-[0.9] transition-transform duration-500 group-hover:scale-105">
            Démarrons un <br />
            <span className="font-bold border-b border-white/30 pb-2 inline-block mt-4">Nouveau Projet.</span>
          </h1>
        </a>
      </section>
      
    </div>
  );
}
