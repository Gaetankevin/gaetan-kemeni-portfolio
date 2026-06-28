"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function PortfolioOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".portfolio-section");
      
      // On crée une seule timeline maîtresse synchronisée au scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sections.forEach((section, index) => {
        if (index === 0) {
          // HERO : Animation d'entrée au chargement (indépendante du scroll)
          const heroElements = section.querySelectorAll('.hero-elem');
          gsap.fromTo(
            heroElements,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: "power3.out", delay: 0.2 }
          );

          // HERO : Sortie échelonnée synchronisée au scroll (dure plus longtemps, de 5% à 20%)
          tl.to(heroElements, { opacity: 0, y: -40, stagger: 2, duration: 10 }, 5);
        } else {
          // Calcul des points d'entrée et de sortie pour un cross-fade fluide
          const enterStart = (index * 20) - 5;
          const exitStart = (index * 20) + 10;

          // Animation d'entrée
          tl.fromTo(
            section,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 10 },
            enterStart
          );

          // Animation de sortie (sauf la dernière section)
          if (index < sections.length - 1) {
            tl.to(
              section,
              { opacity: 0, y: -50, duration: 10 },
              exitStart
            );
          }
        }
      });
    }, containerRef); // Scope au conteneur

    return () => ctx.revert(); // Nettoyage total pour React 18
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
        <h2 className="hero-elem text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
          Ingénieur Full-Stack
        </h2>
        <h1 className="hero-elem text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8">
          Creative <br />
          <span className="font-bold">Technologist.</span>
        </h1>
        <p className="hero-elem max-w-lg text-lg md:text-xl font-extralight leading-relaxed opacity-80 border-l border-white/30 pl-6">
          Construire des expériences numériques immersives où l'art de l'interface visuelle rencontre la puissance des architectures serveurs.
        </p>

        {/* Indicateur de Scroll */}
        <div className="hero-elem absolute bottom-12 left-8 md:left-24 flex flex-col items-start gap-4 opacity-50">
           <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Découvrir l'expérience</span>
           <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
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
