import { type Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProfileMobileNav } from "@/components/mobile-nav/profile-mobile-nav";

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
      <div className="w-full">
        <SectionWrapper paddingBlock="none" className="mt-4">
          <Breadcrumb startWith="/profile" />
        </SectionWrapper>
        {children}
      </div>
      <div className="min-h-24">
        <ProfileMobileNav />
      </div>
    </>
  );
}
