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
import { Briefcase, CalendarDays, FileText, Users, MessageSquare, LogOut, Scale } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const items = [
  {
    title: "Mon Cabinet",
    url: "#",
    icon: Briefcase,
  },
  {
    title: "Mes missions",
    url: "#",
    icon: FileText,
  },
  {
    title: "Agenda",
    url: "#",
    icon: CalendarDays,
  },
  {
    title: "Clients",
    url: "#",
    icon: Users,
  },
  {
    title: "Messagerie",
    url: "#",
    icon: MessageSquare,
  },
];

export function SidebarPro({ username }: { username: string }) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-widest uppercase">
          <Scale className="w-5 h-5 text-violet-500" />
          <span>SosJuristes <span className="text-xs font-light text-zinc-500 tracking-normal ml-1">PRO</span></span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-light tracking-widest text-zinc-500 mb-2">
            GESTION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:text-white transition-colors duration-300">
                    <Link href={item.url.replace("#", `/account/pro/${username}`)}>
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
            <SidebarMenuButton asChild onClick={() => signOut({ callbackUrl: '/' })} className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer">
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
