import {
  Sidebar as ShadcnUISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LogoutDialog } from "./log-out-dialog";

type SidebarProps = {
  children: React.ReactNode;
  label: string;
  items: { title: string; url: string; icon: LucideIcon }[];
};

export function Sidebar({ children, label, items }: SidebarProps) {
  const pathname = "usePathname();";

  return (
    <ShadcnUISidebar
      variant="floating"
      collapsible="icon"
      className="@container"
    >
      <div className="hidden justify-center md:flex @[100px]:justify-end">
        <SidebarTrigger />
      </div>
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
        {children}
        <LogoutDialog />
      </SidebarFooter>
    </ShadcnUISidebar>
  );
}
