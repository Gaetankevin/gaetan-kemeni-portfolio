import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const { username } = await params;

  if (session.user.role !== "ADMIN") {
    redirect("/"); // Or redirect to their specific dashboard
  }

  return (
    <div className="flex-1 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-light tracking-widest text-white mb-2 uppercase">
            Centre de Contrôle
          </h1>
          <p className="text-zinc-500 font-light tracking-wide">
            Accès administrateur sécurisé. Bienvenue, {username}.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skeleton cards for admin stats */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between h-40 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <div className="w-1/2 h-4 bg-white/10 rounded-full animate-pulse"></div>
              <div className="w-1/3 h-10 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-xl font-light tracking-widest text-white mb-6 uppercase text-sm">Activité Récente</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-1/3 h-3 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="w-1/4 h-2 bg-white/10 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
