"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, ShieldCheck, Settings, Activity, LogOut, Scale } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const items = [
  {
    title: "Vue d'ensemble",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    url: "#",
    icon: Users,
  },
  {
    title: "Validation Pros",
    url: "#",
    icon: ShieldCheck,
  },
  {
    title: "Statistiques",
    url: "#",
    icon: Activity,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
];

export function SidebarAdmin({ username }: { username: string }) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-widest uppercase text-red-500">
          <Scale className="w-5 h-5" />
          <span>SosJuristes <span className="text-xs font-light tracking-normal ml-1 opacity-70">ADMIN</span></span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-light tracking-widest text-zinc-500 mb-2">
            ADMINISTRATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:text-red-400 transition-colors duration-300">
                    <Link href={item.url.replace("#", `/account/admin/${username}`)}>
                      <item.icon className="w-4 h-4 mr-2 opacity-70" />
                      <span className="font-light tracking-wide">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={() => signOut({ callbackUrl: '/' })} className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer">
              <div>
                <LogOut className="w-4 h-4 mr-2" />
                <span className="font-light tracking-wide">Déconnexion</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
