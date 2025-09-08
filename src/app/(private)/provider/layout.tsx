import { type Metadata } from "next";
import { providerSidebarNavData } from "@/features/provider/data/sidebar-nav";
import { Sidebar } from "@/components/sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AdminProviderToggle } from "@/features/admin/components/admin-provider-toggle";
import { SidebarProviderWrapper } from "@/components/providers/sidebar-provider-wrapper";
import { ProviderMobileNav } from "@/components/mobile-nav/provider-mobile-nav";

export const metadata: Metadata = {
  title: "System dla rezerwacji wizyt online - Book App",
  description: "Najlepszy system rezerwacji wizyt dla twojej firmy usługowej",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ProviderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProviderWrapper>
        <Sidebar label="Panel specjalisty" items={providerSidebarNavData}>
          <AdminProviderToggle linkPath="admin" />
        </Sidebar>
        <main className="mb-20 w-full">
          <SectionWrapper paddingBlock="none" className="mt-4">
            <Breadcrumb startWith="/provider" />
          </SectionWrapper>
          {children}
        </main>
        <ProviderMobileNav />
      </SidebarProviderWrapper>
    </>
  );
}
