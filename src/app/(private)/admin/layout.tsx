import { type Metadata } from "next";
import { adminSidebarNavData } from "@/features/admin/data/sidebar-nav";
import { Sidebar } from "@/components/sidebar";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AdminProviderToggle } from "@/features/admin/components/admin-provider-toggle";
import { SidebarProviderWrapper } from "@/components/providers/sidebar-provider-wrapper";
import { AdminMobileNav } from "@/components/mobile-nav/admin-mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { EmptyResult } from "@/components/ui/empty-result";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { LogOutIcon, XIcon } from "lucide-react";
import { LogOutButton } from "@/features/auth/components/log-out-button";

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
          <ThemeToggle />
          <AdminProviderToggle linkPath="provider" />
        </Sidebar>
        <div className="w-full">
          <SectionWrapper paddingBlock="none" className="mt-4">
            <Breadcrumb startWith="/admin" />
          </SectionWrapper>
          {children}
        </div>
        <AdminMobileNav />
      </SidebarProviderWrapper>
      <div className="bg-background fixed inset-0 z-50 flex items-center justify-center text-center lg:hidden">
        <MaxWidthWrapper size="xs">
          <EmptyResult
            icon={XIcon}
            iconClassName="text-destructive bg-destructive/20"
            title="Urządzenie nieobsługiwane"
            description="Ta aplikacja nie działa na telefonach ani tabletach. Aby kontynuować, użyj komputera lub laptopa — rozmiar ekranu nie jest obsługiwany."
            actionButton={
              <LogOutButton className="mt-4 w-full">
                <LogOutIcon />
                Wyloguj się
              </LogOutButton>
            }
          />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
