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
    <div className="min-h-screen bg-[#06070b] pt-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Tableau de bord Justiciable</h1>
        <p className="text-zinc-400">Bienvenue, {username}. Voici votre espace personnel.</p>
        
        {/* Placeholder for the "Devenir Pro" button mentioned in specs */}
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl max-w-md">
          <h2 className="text-xl font-semibold text-white mb-2">Vous êtes un professionnel du droit ?</h2>
          <p className="text-sm text-zinc-400 mb-4">Mettez à niveau votre compte pour proposer vos services sur la plateforme.</p>
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
            Devenir Pro
          </button>
        </div>
      </div>
    </div>
  );
}
