import "@/styles/globals.css";

import { type Metadata } from "next";
import { PublicHeader } from "@/components/header/public-header";
import { Footer } from "@/components/footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { PublicMobileNav } from "@/components/mobile-nav/public-mobile-nav";

export const metadata: Metadata = {
  title: {
    default: "System dla rezerwacji wizyt online - Book App",
    template: "%s | Book App",
  },
  description: "Najlepszy system rezerwacji wizyt dla twojej firmy usługowej",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicHeader />
      <main className="flex-grow">
        <SectionWrapper paddingBlock="none" className="mt-4">
          <MaxWidthWrapper>
            <Breadcrumb />
          </MaxWidthWrapper>
        </SectionWrapper>
        {children}
      </main>
      <Footer />
      <PublicMobileNav />
    </>
  );
}
