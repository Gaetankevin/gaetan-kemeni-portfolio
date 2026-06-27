import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function JusticiableDashboard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const { username } = await params;

  // Basic authorization: ensure the user accessing the page is the right one, or let it be public if it's a public profile.
  // In this case, assuming it's a private dashboard:
  if (session.user.username !== username) {
    // Optionally redirect to their own dashboard
    // redirect(`/account/justiciable/${session.user.username}`);
  }

  return (
    <div className="flex-1 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-light tracking-widest text-white mb-2 uppercase">
            Espace Personnel
          </h1>
          <p className="text-zinc-500 font-light tracking-wide">
            Bienvenue, {username}. Suivez vos dossiers en temps réel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm min-h-[300px]">
            <h2 className="text-xl font-light tracking-widest text-white mb-6 uppercase text-sm">Dossiers en cours</h2>
            <div className="flex items-center justify-center h-48 border border-dashed border-white/10 rounded-xl">
               <span className="text-zinc-600 font-light tracking-widest text-sm uppercase">Aucun dossier actif</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/20 rounded-2xl p-8 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-light tracking-widest text-white mb-4 uppercase text-sm">Professionnel du Droit ?</h2>
              <p className="text-sm text-zinc-400 mb-8 font-light leading-relaxed">
                Rejoignez notre réseau d'experts et proposez vos services directement aux justiciables sur la plateforme.
              </p>
            </div>
            <button className="bg-white text-black hover:bg-zinc-200 w-full py-4 rounded-full text-sm font-medium transition-colors tracking-widest uppercase">
              Devenir Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
