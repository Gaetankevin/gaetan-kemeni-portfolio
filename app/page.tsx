"use client";

import { Experience } from "@/components/3d/experience";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Testimonials } from "@/components/sections/Testimonials";
import { LegalStats } from "@/components/sections/LegalStats";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

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
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-full px-6 py-2 mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <span className="text-xs uppercase tracking-[0.3em] text-violet-300 font-medium">Lancement Bêta - 2026</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 font-sans tracking-tighter text-white drop-shadow-2xl">
            La Justice, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-400 to-indigo-500">Augmentée.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light mb-12 max-w-2xl leading-relaxed">
            La première LegalTech de référence au Cameroun. Connectez-vous instantanément avec des avocats, notaires et huissiers certifiés.
          </p>
          <div className="flex gap-6">
            <button className="bg-white text-black hover:bg-zinc-200 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              Espace Justiciable
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] backdrop-blur-md transition-all">
              Rejoindre l'Ordre
            </button>
          </div>
        </section>

        {/* VISION & STATS */}
        <section id="vision" className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-6 md:px-24">
          <div className="max-w-xl w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:bg-white/[0.04]">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-violet-400 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-violet-400/50"></span> Notre Mission
            </h2>
            <h3 className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight">
              Démocratiser l'accès au droit par l'innovation.
            </h3>
            <p className="text-white/60 leading-relaxed font-light text-lg mb-8">
              SosJuristes n'est pas un simple annuaire. C'est un écosystème numérique sécurisé offrant des formulaires dynamiques, un matching IA de précision, et des consultations chiffrées de bout en bout pour garantir le secret professionnel.
            </p>
          </div>
          
          {/* Composant de statistiques intégré pour le côté premium */}
          <div className="max-w-md w-full relative">
            <div className="absolute -inset-10 bg-violet-500/10 blur-[100px] rounded-full z-0"></div>
            <div className="relative z-10">
              <LegalStats />
            </div>
          </div>
        </section>

        {/* CIBLES */}
        <section id="cibles" className="min-h-screen flex items-center justify-start px-6 md:px-24">
          <div className="max-w-2xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[32px] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-500 mb-10 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-zinc-500/50"></span> L'Écosystème
            </h2>
            <div className="space-y-12">
              <div className="group">
                <h4 className="text-3xl text-white font-light mb-4 group-hover:text-violet-300 transition-colors">Pour les Justiciables</h4>
                <p className="text-white/50 font-light leading-relaxed text-lg">
                  Recherchez par critères (ville, tarif, langue), obtenez un score de pertinence via notre IA, et réglez vos honoraires en toute sécurité via Mobile Money ou Carte Bancaire.
                </p>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
              <div className="group">
                <h4 className="text-3xl text-white font-light mb-4 group-hover:text-indigo-300 transition-colors">Pour les Professionnels</h4>
                <p className="text-white/50 font-light leading-relaxed text-lg">
                  Profitez d'un onboarding KYC automatisé (OCR), recevez des leads qualifiés, gérez votre agenda synchronisé et émettez des factures conformes automatiquement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FONCTIONNALITÉS */}
        <section id="features" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-24 relative">
          <div className="max-w-5xl w-full text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400 mb-6">Technologies</h2>
            <h3 className="text-4xl md:text-6xl font-light text-white tracking-tight">Le standard de demain.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
            {[
              { title: "Matching IA", desc: "Algorithme personnalisé analysant le besoin et la complexité pour trouver l'expert idéal." },
              { title: "Visioconférence Native", desc: "Consultation sécurisée via WebRTC, sans installation externe, avec horodatage." },
              { title: "Messagerie Chiffrée", desc: "Confidentialité totale des échanges juridiques et transferts de pièces jointes (AWS S3)." },
              { title: "Paiement Automatisé", desc: "Intégration Flutterwave et Mobile Money avec génération automatique de factures PDF." }
            ].map((feat, i) => (
              <div key={i} className="group relative bg-white/[0.01] border border-white/10 rounded-[28px] p-10 overflow-hidden backdrop-blur-2xl hover:bg-white/[0.03] transition-all duration-700">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h4 className="text-white text-2xl font-light mb-4">{feat.title}</h4>
                <p className="text-white/40 font-light leading-relaxed text-lg">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEMOIGNAGES */}
        <section className="py-32 px-6 md:px-24 flex justify-center">
          <div className="w-full max-w-6xl relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet-900/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
            <div className="relative z-10">
              <Testimonials />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>
    </>
  );
}
