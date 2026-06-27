"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ChevronDown, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
          {user.image ? (
            <img src={user.image} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials()
          )}
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-xs font-bold text-white max-w-[100px] truncate">
            {user.name || user.email?.split("@")[0]}
          </span>
        </div>
        <ChevronDown size={14} className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-[#0a0b10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-white/5">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Connecté en tant que</p>
            <p className="text-sm font-medium text-white truncate">{user.email}</p>
          </div>
          
          <div className="p-2 flex flex-col gap-1">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={16} className="text-violet-400" />
              Mon Tableau de Bord
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon size={16} className="text-violet-400" />
              Mon Profil
            </Link>
          </div>

          <div className="p-2 border-t border-white/5">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
