"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo3D } from "@/components/3d/Logo3D";
import { useSession } from "next-auth/react";
import { UserMenu } from "@/components/auth/UserMenu";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#06070b]/70 backdrop-blur-2xl transition-all duration-300 ${isMobileMenuOpen ? 'border-transparent bg-transparent backdrop-blur-none' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group z-50 relative" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo3D />
            <div className="text-white font-bold text-xl tracking-[0.25em] flex items-center mt-1">
              SOS<span className="font-light text-white/60">JURISTES</span>
            </div>
          </Link>

          {/* NAVIGATION CENTRALE */}
          <nav className="hidden lg:flex items-center gap-12">
            <Link href="#" className="text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-violet-400 transition-colors">
              Plateforme
            </Link>
            <div className="flex items-center gap-2 cursor-pointer group">
              <Link href="#features" className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                Solutions
              </Link>
              <ChevronDown size={14} className="text-white/30 group-hover:text-white transition-colors" />
            </div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <Link href="#cibles" className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                Pour qui
              </Link>
              <ChevronDown size={14} className="text-white/30 group-hover:text-white transition-colors" />
            </div>
            <Link href="#vision" className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors">
              Vision
            </Link>
          </nav>

          {/* ACTIONS DROITE */}
          <div className="hidden lg:flex items-center gap-8">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <Link href="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                  Se connecter
                </Link>
                <Link href="/register" className="relative group overflow-hidden rounded-full p-[1px] block">
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600/50 via-indigo-500/50 to-violet-600/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient"></span>
                  <div className="relative bg-[#06070b] border border-white/10 px-8 py-3.5 rounded-full flex items-center gap-2 group-hover:border-transparent transition-colors duration-500">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Espace Pro
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2 z-50 relative"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
          </button>

        </div>
      </header>

      {/* OVERLAY MENU MOBILE */}
      <div 
        className={`fixed inset-0 bg-[#06070b]/95 backdrop-blur-3xl z-40 lg:hidden flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <nav className="flex flex-col items-center gap-10 w-full px-8">
          <Link 
            href="#" 
            onClick={toggleMenu} 
            className={`text-xl font-bold uppercase tracking-[0.2em] hover:text-violet-400 transition-all duration-500 delay-100 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 text-white'}`}
          >
            Plateforme
          </Link>
          <Link 
            href="#features" 
            onClick={toggleMenu} 
            className={`text-xl font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-500 delay-150 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Solutions
          </Link>
          <Link 
            href="#cibles" 
            onClick={toggleMenu} 
            className={`text-xl font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-500 delay-200 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Pour qui
          </Link>
          <Link 
            href="#vision" 
            onClick={toggleMenu} 
            className={`text-xl font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-500 delay-250 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Vision
          </Link>
          
          <div className={`w-12 h-[1px] bg-white/20 my-4 transition-all duration-500 delay-300 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>

          <div className={`w-full flex flex-col items-center transition-all duration-500 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {session?.user ? (
              <div className="scale-125 mt-4">
                <UserMenu user={session.user} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 w-full mt-4">
                <Link href="/login" onClick={toggleMenu} className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                  Se connecter
                </Link>
                <Link href="/register" onClick={toggleMenu} className="relative group overflow-hidden rounded-full p-[1px] block w-full max-w-[280px]">
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600/50 via-indigo-500/50 to-violet-600/50 rounded-full opacity-100 bg-[length:200%_auto] animate-gradient"></span>
                  <div className="relative bg-[#06070b] border border-transparent px-8 py-4 rounded-full flex items-center justify-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                      Espace Pro
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
