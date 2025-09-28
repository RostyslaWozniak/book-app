import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ProfileAppointmentsNav } from "@/features/profile/components/profile-appointment-nav";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";

export default function ProfileAppointmentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <ProfileAppointmentsNav />
        </MaxWidthWrapper>
      </SectionWrapper>

      {children}
    </>
  );
}
