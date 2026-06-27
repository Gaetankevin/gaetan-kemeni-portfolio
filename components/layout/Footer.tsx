"use client";

import { ArrowRight, ArrowUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Footer() {
  const { data: session } = useSession();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#06070b] text-white pt-24 overflow-hidden border-t border-white/5 relative z-10">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 mb-24">
          
          {/* Logo */}
          <div className="col-span-1 md:col-span-3">
            <div className="font-bold text-2xl tracking-widest text-white">
              SOS<span className="font-light text-violet-400">JURISTES</span>
            </div>
          </div>

          {/* Pages */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Pages</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium uppercase tracking-wider">
              <li><Link href="/" className="hover:text-white transition-colors duration-300">Accueil</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Plateforme</Link></li>
              <li><Link href="#vision" className="hover:text-white transition-colors duration-300">Vision</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors duration-300">Solutions</Link></li>
              <li>
                {session?.user ? (
                  <Link href="/dashboard" className="hover:text-violet-400 transition-colors duration-300">Mon Tableau de Bord</Link>
                ) : (
                  <Link href="/register" className="hover:text-white transition-colors duration-300">Espace Pro</Link>
                )}
              </li>
            </ul>
          </div>

          {/* Réseaux */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Réseaux</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium uppercase tracking-wider">
              <li><a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Facebook</a></li>
            </ul>
          </div>

          {/* Légales */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Légales</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium uppercase tracking-wider">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Mentions</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">CGU</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Tarification</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-white font-medium mb-6 flex justify-between items-center text-sm">
              <span>Rejoignez notre newsletter</span>
            </h4>
            <div className="relative border-b border-white/20 pb-2 mb-8">
              <input 
                type="email" 
                placeholder="email@votrecabinet.cm" 
                className="w-full bg-transparent outline-none text-white/70 placeholder:text-white/20 text-sm"
              />
              <button className="absolute right-0 top-0 text-white/40 hover:text-white transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex flex-col items-end text-xs font-bold gap-2">
              <button className="text-violet-400">FR</button>
              <button className="text-white/20 hover:text-white transition-colors">EN</button>
            </div>
          </div>
        </div>

        {/* Secondary Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white/50 text-sm mb-12 gap-6">
          <p>SosJuristes© 2026</p>
          <p>Douala | Yaoundé</p>
          <p>+237 600 00 00 00</p>
          <p>contact@sosjuristes.cm</p>
          <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest text-xs">
            <ArrowUp size={14} /> Retour en haut
          </button>
        </div>
      </div>

      {/* Massive Text at Bottom */}
      <div className="w-full overflow-hidden flex justify-center translate-y-[20%]">
        <h1 className="text-[20vw] leading-[0.75] font-bold tracking-tighter text-white select-none whitespace-nowrap">
          SosJuristes
        </h1>
      </div>
    </footer>
  );
}
