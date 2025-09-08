import { MobileNav } from "./mobile-nav";
import { adminSidebarNavData } from "@/features/admin/data/sidebar-nav";

export function AdminMobileNav() {
  return <MobileNav nav={adminSidebarNavData} className="grid-cols-4" />;
}
