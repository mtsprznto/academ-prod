"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { routes, routesTeacher } from "./AppSidebar.data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export function AppSidebar() {
  const { state } = useSidebar();
  const [role, setRole] = useState<number | null>(null);
  const { user, isLoaded } = useUser();
 

  useEffect(() => {
    if (!isLoaded || !user) return;
    async function fetchRole() {
      try {
        const response = await fetch("/api/users/getUserRole");
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error("Error obteniendo rol del usuario:", error);
      }
    }
    fetchRole();
  }, [isLoaded, user]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarHeader>
          <Link href={"/"} className="flex flex-row items-center">
            <Image
              src={"/logo.png"}
              alt={"Logo academia "}
              width={30}
              height={30}
            ></Image>
            {state === "expanded" ? (
              <span className="text-xl font-semibold text-gray-800 tracking-wide">
                Academ.
              </span>
            ) : null}
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu className="space-y-2">
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="">
                    <div className="p-1 rounded-lg text-white bg-violet-400">
                      <item.icon className="w-4 h-4"></item.icon>
                    </div>
                    {state === "expanded" ? <span>{item.title}</span> : null}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {role !== 2 && (
            <SidebarMenu className="mt-4">
              <SidebarGroupLabel>Teacher</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  {routesTeacher.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        href={item.url}
                        className="hover:bg-muted transition"
                      >
                        <div className="p-1 rounded-lg text-white bg-slate-400">
                          <item.icon className="w-4 h-4" />
                        </div>
                        {item.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
