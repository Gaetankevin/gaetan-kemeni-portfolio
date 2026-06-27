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
    <div className="min-h-screen bg-[#06070b] pt-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Espace Professionnel</h1>
        <p className="text-zinc-400">Bienvenue, Maître {username}. Voici votre tableau de bord de gestion.</p>
      </div>
    </div>
  );
}
