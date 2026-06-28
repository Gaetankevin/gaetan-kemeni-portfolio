"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

export function PortfolioOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".portfolio-section");
      
      // Master timeline running from scroll 0% to 100%
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
          // HERO : Entrance animation on load (independent from scroll)
          const heroElements = section.querySelectorAll('.hero-elem');
          gsap.fromTo(
            heroElements,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: "power3.out", delay: 0.2 }
          );

          // HERO : Scroll exit (scroll 5% to 10%)
          tl.to(heroElements, { opacity: 0, y: -40, stagger: 1, duration: 5 }, 5);
        } 
        else if (index === 1) {
          // ABOUT : Slideshow from 15% to 45% (4 slides)
          const slides = section.querySelectorAll('.about-elem');
          slides.forEach((slide, i) => {
            const start = 15 + i * 7.5;
            tl.fromTo(slide, 
              { opacity: 0, y: 35 }, 
              { opacity: 1, y: 0, duration: 3.75 }, 
              start
            );
            tl.to(slide, 
              { opacity: 0, y: -35, duration: 3.75 }, 
              start + 3.75
            );
          });
        } 
        else if (index === 2) {
          // ECOSYSTEM : Slideshow from 50% to 70% (2 slides)
          const slides = section.querySelectorAll('.eco-elem');
          slides.forEach((slide, i) => {
            const start = 50 + i * 10;
            tl.fromTo(slide,
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 5 },
              start
            );
            tl.to(slide,
              { opacity: 0, y: -35, duration: 5 },
              start + 5
            );
          });
        } 
        else if (index === 3) {
          // WORKS : Slideshow from 75% to 90% (3 slides)
          const slides = section.querySelectorAll('.work-elem');
          slides.forEach((slide, i) => {
            const start = 75 + i * 5;
            tl.fromTo(slide,
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 2.5 },
              start
            );
            tl.to(slide,
              { opacity: 0, y: -35, duration: 2.5 },
              start + 2.5
            );
          });
        } 
        else if (index === 4) {
          // CONTACT : Simple fade in from 95% to 100%
          tl.fromTo(section,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 5 },
            95
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
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
      <section className="portfolio-section absolute inset-0 pointer-events-none">
        {/* Slide 1 : Titre */}
        <div className="about-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 mix-blend-difference text-white pointer-events-auto">
          <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
            Parcours & Philosophie
          </h2>
          <h3 className="text-3xl md:text-5xl font-extralight tracking-tight uppercase">
            Mon Voyage <br />
            <span className="font-bold">Technologique.</span>
          </h3>
        </div>
        
        {/* Slide 2 : Formation */}
        <div className="about-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 mix-blend-difference text-white pointer-events-auto">
          <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
            Formation
          </h2>
          <h3 className="max-w-2xl text-2xl md:text-4xl font-light tracking-tight leading-snug">
            Diplômé en <span className="italic font-normal">Licence Professionnelle Génie Logiciel</span>, je conçois des architectures applicatives complètes et durables.
          </h3>
        </div>

        {/* Slide 3 : Philosophie */}
        <div className="about-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 mix-blend-difference text-white pointer-events-auto">
          <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
            Philosophie
          </h2>
          <p className="max-w-xl text-lg md:text-2xl font-light tracking-wide leading-relaxed">
            Passionné par la résolution de problèmes complexes, j'interviens sur tout le cycle de vie pour concevoir des applications web, mobiles et desktop robustes.
          </p>
        </div>
        
        {/* Slide 4 : Compétences */}
        <div className="about-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 mix-blend-difference text-white pointer-events-auto">
          <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-6">
            Éventail Technique
          </h2>
          <p className="max-w-md text-sm md:text-base opacity-70 mb-8 font-light tracking-wide">
            De l'architecture système aux interfaces utilisateurs interactives.
          </p>
          <div className="flex flex-wrap gap-2 justify-end max-w-md">
            <Badge variant="outline" className="text-white border-white/20 px-3 py-1 font-extralight tracking-wider uppercase text-[9px] bg-white/5 backdrop-blur-sm">Licence Génie Logiciel</Badge>
            <Badge variant="outline" className="text-white border-white/20 px-3 py-1 font-extralight tracking-wider uppercase text-[9px] bg-white/5 backdrop-blur-sm">Applications Web</Badge>
            <Badge variant="outline" className="text-white border-white/20 px-3 py-1 font-extralight tracking-wider uppercase text-[9px] bg-white/5 backdrop-blur-sm">Applications Mobiles</Badge>
            <Badge variant="outline" className="text-white border-white/20 px-3 py-1 font-extralight tracking-wider uppercase text-[9px] bg-white/5 backdrop-blur-sm">Applications Desktop</Badge>
          </div>
        </div>
      </section>

      {/* SECTION 3 : ECOSYSTEME */}
      <section className="portfolio-section absolute inset-0 pointer-events-none">
        {/* Slide 1 : Frontend */}
        <div className="eco-elem opacity-0 absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24 text-white pointer-events-auto">
          <div className="w-full max-w-xl mix-blend-difference">
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium text-white/50 mb-12">
              L'Art du Frontend
            </h2>
            <h3 className="text-xs uppercase tracking-widest opacity-40 mb-6 border-b border-white/20 pb-4">Frontend & 3D</h3>
            <ul className="space-y-4 text-lg md:text-2xl font-extralight">
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">01</span> Vue.js / Nuxt</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">02</span> React / Next.js</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">03</span> Three.js / GSAP</li>
            </ul>
          </div>
        </div>
        
        {/* Slide 2 : Backend */}
        <div className="eco-elem opacity-0 absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24 text-white pointer-events-auto">
          <div className="w-full max-w-xl mix-blend-difference">
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium text-white/50 mb-12">
              La Force du Backend
            </h2>
            <h3 className="text-xs uppercase tracking-widest opacity-40 mb-6 border-b border-white/20 pb-4">Backend & Data</h3>
            <ul className="space-y-4 text-lg md:text-2xl font-extralight">
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">04</span> Laravel / PHP</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">05</span> Django / FastAPI</li>
              <li className="flex items-center gap-6"><span className="text-xs font-bold w-4 opacity-50">06</span> Node.js / Prisma</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4 : REALISATIONS */}
      <section className="portfolio-section absolute inset-0 pointer-events-none">
        {/* Slide 1 : Projet E-Commerce */}
        <div className="work-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 text-white pointer-events-auto">
          <div className="w-full max-w-2xl mix-blend-difference">
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-12">
              Projet Sélectionné (1/3)
            </h2>
            <div className="group cursor-pointer">
              <h3 className="text-3xl md:text-6xl font-light tracking-tight group-hover:italic transition-all">Plateforme E-Commerce</h3>
              <p className="text-sm uppercase tracking-widest opacity-50 mt-4">Vue.js • Laravel • Stripe</p>
              <p className="text-xs opacity-60 mt-4 font-light max-w-md ml-auto leading-relaxed">
                Solution de vente en ligne complète et hautement performante, intégrant des systèmes de paiement sécurisés et un suivi d'inventaire dynamique.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2 : Projet SaaS */}
        <div className="work-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 text-white pointer-events-auto">
          <div className="w-full max-w-2xl mix-blend-difference">
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-12">
              Projet Sélectionné (2/3)
            </h2>
            <div className="group cursor-pointer">
              <h3 className="text-3xl md:text-6xl font-light tracking-tight group-hover:italic transition-all">SaaS Analytique</h3>
              <p className="text-sm uppercase tracking-widest opacity-50 mt-4">Next.js • FastAPI • PostgreSQL</p>
              <p className="text-xs opacity-60 mt-4 font-light max-w-md ml-auto leading-relaxed">
                Tableau de bord d'analyse de données massives en temps réel, optimisé pour les performances et la visualisation claire d'indicateurs clés.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 3 : Projet WebGL */}
        <div className="work-elem opacity-0 absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 text-white pointer-events-auto">
          <div className="w-full max-w-2xl mix-blend-difference">
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium opacity-60 mb-12">
              Projet Sélectionné (3/3)
            </h2>
            <div className="group cursor-pointer">
              <h3 className="text-3xl md:text-6xl font-light tracking-tight group-hover:italic transition-all">Expérience WebGL 3D</h3>
              <p className="text-sm uppercase tracking-widest opacity-50 mt-4">React • Three.js • GSAP</p>
              <p className="text-xs opacity-60 mt-4 font-light max-w-md ml-auto leading-relaxed">
                Création d'environnements tridimensionnels interactifs de haute volée artistique, synchronisés sur le scroll pour un rendu cinématique.
              </p>
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
