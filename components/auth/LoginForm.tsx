"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email ou mot de passe incorrect");
      } else {
        router.push("/");
        router.refresh(); // Refresh to update session state across the app
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: "google" | "facebook") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Bon retour</h1>
        <p className="text-sm text-zinc-400">Connectez-vous pour accéder à votre espace SosJuristes.</p>
      </div>

      <form onSubmit={loginUser} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Entrez votre email"
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-zinc-300">Mot de passe</Label>
            <Link href="#" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
              Mot de passe oublié ?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-full py-6 font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#06070b] px-2 text-zinc-500">Ou continuer avec</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => handleOAuthSignIn("google")}
          className="bg-transparent border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white rounded-full py-6"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleOAuthSignIn("facebook")}
          className="bg-transparent border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white rounded-full py-6"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/>
          </svg>
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-zinc-400">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
          S'inscrire
        </Link>
      </p>
    </div>
  );
}
