import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountRouterPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role?.toLowerCase() || "justiciable";
  const username = session.user.username || session.user.id;

  // Redirige vers la page du compte approprié
  redirect(`/account/${role}/${username}`);
}
