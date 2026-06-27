import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarPro } from "@/components/dashboards/sidebar-pro";

export default async function ProLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  return (
    <SidebarProvider>
      <SidebarPro username={username} />
      <SidebarInset className="bg-[#06070b]">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-4 sticky top-0 z-10 bg-[#06070b]/80 backdrop-blur-md">
          <SidebarTrigger className="text-white hover:bg-white/10" />
        </header>
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
