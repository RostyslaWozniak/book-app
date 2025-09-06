import { type Metadata } from "next";
import { adminSidebarNavData } from "@/features/admin/data/sidebar-nav";
import { SidebarTrigger } from "@/components/shadcn-ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AdminProviderToggle } from "@/features/admin/components/admin-provider-toggle";
import { SidebarProviderWrapper } from "@/components/providers/sidebar-provider-wrapper";

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
        <Sidebar label="Panel administratora" items={adminSidebarNavData}>
          <AdminProviderToggle linkPath="provider" />
        </Sidebar>
        <SidebarTrigger className="lg:hidden" />
        <main className="w-full">
          <SectionWrapper paddingBlock="none" className="mt-4">
            <Breadcrumb startWith="/admin" />
          </SectionWrapper>
          {children}
        </main>
      </SidebarProviderWrapper>
    </>
  );
}
