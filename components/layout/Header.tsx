import { ChevronDown, Menu } from "lucide-react";
import { Logo3D } from "@/components/3d/Logo3D";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#06070b]/70 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <Logo3D />
          <div className="text-white font-bold text-xl tracking-[0.25em] flex items-center mt-1">
            SOS<span className="font-light text-white/60">JURISTES</span>
          </div>
        </div>

        {/* NAVIGATION CENTRALE */}
        <nav className="hidden lg:flex items-center gap-12">
          <a href="#" className="text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-violet-400 transition-colors">
            Plateforme
          </a>
          <div className="flex items-center gap-2 cursor-pointer group">
            <a href="#features" className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
              Solutions
            </a>
            <ChevronDown size={14} className="text-white/30 group-hover:text-white transition-colors" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer group">
            <a href="#cibles" className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
              Pour qui
            </a>
            <ChevronDown size={14} className="text-white/30 group-hover:text-white transition-colors" />
          </div>
          <a href="#vision" className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors">
            Vision
          </a>
        </nav>

        {/* ACTIONS DROITE */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Se connecter
          </a>
          <button className="relative group overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600/50 via-indigo-500/50 to-violet-600/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient"></span>
            <div className="relative bg-[#06070b] border border-white/10 px-8 py-3.5 rounded-full flex items-center gap-2 group-hover:border-transparent transition-colors duration-500">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Espace Pro
              </span>
            </div>
          </button>
        </div>

        {/* MENU MOBILE */}
        <button className="lg:hidden text-white/70 hover:text-white transition-colors p-2">
          <Menu size={24} />
        </button>

      </div>
    </header>
  );
}
