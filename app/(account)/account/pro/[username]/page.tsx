import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProDashboard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const { username } = await params;

  return (
    <div className="flex-1 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-light tracking-widest text-white mb-2 uppercase">
            Espace Pro
          </h1>
          <p className="text-zinc-500 font-light tracking-wide">
            Bienvenue, Maître {username}. Voici votre cabinet numérique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm h-[400px] flex flex-col">
            <h2 className="text-xl font-light tracking-widest text-white mb-6 uppercase text-sm">Agenda du jour</h2>
            <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
               <span className="text-zinc-600 font-light tracking-widest text-sm uppercase">Aucun rendez-vous</span>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm h-[400px] flex flex-col">
            <h2 className="text-xl font-light tracking-widest text-white mb-6 uppercase text-sm">Missions Récentes</h2>
            <div className="flex-1 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <div className="w-12 h-12 rounded-lg bg-white/5 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-1/2 h-3 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="w-1/3 h-2 bg-white/10 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
