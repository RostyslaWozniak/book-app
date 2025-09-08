import { MobileNav } from "./mobile-nav";
import { providerSidebarNavData } from "@/features/provider/data/sidebar-nav";

export function ProviderMobileNav() {
  return <MobileNav nav={providerSidebarNavData} className="grid-cols-4" />;
}
