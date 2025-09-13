"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "../shadcn-ui/sidebar";

type SidebarItemProps = {
  children: React.ReactNode;
  url: string;
};

export function SidebarItem({ children, url }: SidebarItemProps) {
  const pathname = usePathname();
  return (
    <SidebarMenuButton asChild isActive={pathname === url}>
      {children}
    </SidebarMenuButton>
  );
}
