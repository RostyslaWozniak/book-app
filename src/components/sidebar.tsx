"use client";

import {
  Sidebar as ShadcnUISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { LogOutButton } from "@/features/auth/components/log-out-button";
import { LogOutIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  label: string;
  items: { title: string; url: string; icon: LucideIcon }[];
};

export function Sidebar({ label, items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <ShadcnUISidebar
      variant="floating"
      collapsible="icon"
      className="@container"
    >
      <div className="hidden justify-center md:flex @[100px]:justify-end">
        <SidebarTrigger />
      </div>
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="scrollbar-hide">
        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutDialog />
      </SidebarFooter>
    </ShadcnUISidebar>
  );
}

import { Button } from "./shadcn-ui/button";
import { DialogWrapper } from "./ui/dialog-wrapper";

function LogoutDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <span className="hidden @[100px]:block">Wyloguj się</span>
        <LogOutIcon className="h-5 w-5" />
      </Button>
      <DialogWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Czy napewno chcesz wylogować się?"
        closeButton="Nie"
        className="flex justify-end"
      >
        <LogOutButton>Tak</LogOutButton>
      </DialogWrapper>
    </>
  );
}
