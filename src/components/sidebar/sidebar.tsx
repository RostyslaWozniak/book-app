import {
  Sidebar as ShadcnUISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LogoutDialog } from "../log-out-dialog";
import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  children: React.ReactNode;
  label: string;
  items: { title: string; url: string; icon: LucideIcon }[];
};

export function Sidebar({ children, label, items }: SidebarProps) {
  return (
    <ShadcnUISidebar
      variant="floating"
      collapsible="icon"
      className="@container"
    >
      <div className="relative top-1 mb-1 hidden justify-center md:flex @[100px]:right-1 @[100px]:justify-end">
        <SidebarTrigger className="hover:bg-transparent dark:hover:bg-transparent" />
      </div>
      <SidebarContent className="scrollbar-hide">
        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarItem url={item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarItem>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {children}
        <LogoutDialog />
      </SidebarFooter>
    </ShadcnUISidebar>
  );
}
