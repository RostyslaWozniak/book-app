import { type Metadata } from "next";
import { providerSidebarNavData } from "@/features/provider/data/sidebar-nav";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionWrapper } from "@/components/ui/section-wrapper";

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
      <SidebarProvider>
        <Sidebar label="Panel weterynarza" items={providerSidebarNavData} />
        <SidebarTrigger
          className="fixed right-1 bottom-1 z-50 md:hidden"
          variant="outline"
        />
        <main className="w-full">
          <SectionWrapper paddingBlock="none" className="mt-4">
            <Breadcrumb startWith="/provider" />
          </SectionWrapper>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
