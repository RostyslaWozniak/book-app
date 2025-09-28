import { type Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProfileMobileNav } from "@/components/mobile-nav/profile-mobile-nav";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";

export const metadata: Metadata = {
  title: "System dla rezerwacji wizyt online - Book App",
  description: "Najlepszy system rezerwacji wizyt dla twojej firmy usługowej",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SectionWrapper paddingBlock="xs" className="mt-4">
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <Breadcrumb startWith="/profile" />
        </MaxWidthWrapper>
      </SectionWrapper>
      {children}
      <div className="min-h-24">
        <ProfileMobileNav />
      </div>
    </>
  );
}
