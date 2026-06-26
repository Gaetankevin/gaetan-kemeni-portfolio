"use client";

import { Experience } from "@/components/experience";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      
      {/* HEADER FIXE */}
      <Header />

      {/* BACKGROUND 3D CANVAS */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#06070b]">
        <Canvas
          shadows
          camera={{
            position: [0, 0, 5],
            fov: 30,
          }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#06070b"]} />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* CONTENU HTML SÉMANTIQUE */}
      <main className="relative z-10 w-full">
        
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 font-sans tracking-tighter text-white">
            La Justice, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-600">Simplement.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-2xl leading-relaxed">
            La plateforme LegalTech de référence au Cameroun. Connectez-vous avec les meilleurs professionnels du droit en quelques clics.
          </p>
          <button className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-medium tracking-wide transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Démarrer l'expérience
          </button>
        </section>

        {/* VISION */}
        <section id="vision" className="min-h-screen flex items-center px-6 md:px-24">
          <div className="max-w-xl bg-[#06070b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400 mb-6">Notre Vision</h2>
            <h3 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
              Démocratiser l'accès au droit
            </h3>
            <p className="text-white/70 leading-relaxed font-light text-lg">
              Nous avons conçu SosJuristes pour digitaliser les interactions juridiques dans un cadre sécurisé, légalement conforme et profondément humain. Une ambition nationale, taillée pour l'innovation.
            </p>
          </div>
        </section>

        {/* CIBLES */}
        <section className="min-h-screen flex items-center justify-end px-6 md:px-24">
          <div className="max-w-xl bg-[#06070b]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-12 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <h2 className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500 mb-8">Pour qui ?</h2>
            <div className="space-y-10">
              <div>
                <h4 className="text-2xl text-white font-medium mb-3">Justiciables</h4>
                <p className="text-zinc-400 font-light leading-relaxed">Particuliers et entreprises recherchant une assistance ou un service juridique rapide et transparent.</p>
              </div>
              <div className="h-[1px] w-full bg-white/10"></div>
              <div>
                <h4 className="text-2xl text-white font-medium mb-3">Professionnels</h4>
                <p className="text-zinc-400 font-light leading-relaxed">Avocats, notaires, huissiers et fiscalistes. Un canal de visibilité premium et un outil de gestion clientèle puissant.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FONCTIONNALITÉS */}
        <section id="features" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-24">
          <div className="max-w-5xl w-full text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-400 mb-6">L'Écosystème</h2>
            <h3 className="text-4xl md:text-5xl font-light text-white">L'Excellence Numérique</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <div className="bg-[#06070b]/60 border border-white/10 rounded-[28px] p-8 backdrop-blur-xl hover:border-violet-500/50 transition-colors duration-500">
              <h4 className="text-white text-2xl font-medium mb-3">Matching IA</h4>
              <p className="text-white/60 font-light leading-relaxed">Algorithme personnalisé pour trouver l'expert idéal selon la complexité de votre dossier.</p>
            </div>
            <div className="bg-[#06070b]/60 border border-white/10 rounded-[28px] p-8 backdrop-blur-xl hover:border-violet-500/50 transition-colors duration-500">
              <h4 className="text-white text-2xl font-medium mb-3">Visioconférence</h4>
              <p className="text-white/60 font-light leading-relaxed">Consultation sécurisée depuis n'importe où, avec enregistrement optionnel.</p>
            </div>
            <div className="bg-[#06070b]/60 border border-white/10 rounded-[28px] p-8 backdrop-blur-xl hover:border-violet-500/50 transition-colors duration-500">
              <h4 className="text-white text-2xl font-medium mb-3">Messagerie Chiffrée</h4>
              <p className="text-white/60 font-light leading-relaxed">Confidentialité totale des échanges juridiques et transferts de documents.</p>
            </div>
            <div className="bg-[#06070b]/60 border border-white/10 rounded-[28px] p-8 backdrop-blur-xl hover:border-violet-500/50 transition-colors duration-500">
              <h4 className="text-white text-2xl font-medium mb-3">Paiement Sécurisé</h4>
              <p className="text-white/60 font-light leading-relaxed">Mobile Money et Cartes Bancaires avec facturation automatique et transparente.</p>
            </div>
          </div>
        </section>

        {/* TEMOIGNAGES */}
        <section className="py-32 px-6 md:px-24 flex justify-center">
          <div className="w-full max-w-5xl">
            <Testimonials />
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>
    </>
  );
}
