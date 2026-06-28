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
    // We have 4 sections spread over the 400vh scroll-track
    sections.forEach((section, index) => {
      // Calculate start and end points for each section (e.g., 0-25%, 25-50%, etc.)
      const start = `${index * 25}%`;
      const end = `${(index + 1) * 25}%`;

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
          Développeur Front-End
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
          Fusionner le <span className="italic">design sémantique</span> avec la puissance de la <span className="font-medium">3D temps réel</span>.
        </p>
        <p className="max-w-md text-sm md:text-base opacity-60 mt-8 font-light tracking-wide leading-relaxed">
          Création d&apos;interfaces hautement performantes où chaque pixel, chaque animation et chaque ligne de code racontent une histoire cinématique.
        </p>
      </section>

      {/* SECTION 3 : EXPERTISE & WORK */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24 pointer-events-auto text-white opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl">
          <div>
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium text-white/50 mb-12">
              Expertise
            </h2>
            <ul className="space-y-6 text-xl md:text-3xl font-extralight">
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-6">01</span> Next.js & React 19</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-6">02</span> Three.js / R3F</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-6">03</span> GSAP & Lenis</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-6">04</span> UI/UX Cinématique</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4 : CONTACT */}
      <section className="portfolio-section absolute inset-0 flex flex-col justify-center items-center text-center p-8 md:p-24 pointer-events-auto mix-blend-difference text-white opacity-0">
        <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
          Collaborer
        </h2>
        <a href="mailto:contact@example.com" className="group">
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter leading-[0.9] transition-transform duration-500 group-hover:scale-105">
            Démarrons un <br />
            <span className="font-bold border-b border-white/30 pb-2 inline-block mt-4">Nouveau Projet.</span>
          </h1>
        </a>
      </section>
      
    </div>
  );
}
