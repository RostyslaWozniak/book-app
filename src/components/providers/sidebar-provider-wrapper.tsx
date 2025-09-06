import { cookies } from "next/headers";
import { SidebarProvider } from "../shadcn-ui/sidebar";

export async function SidebarProviderWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
  );
}
