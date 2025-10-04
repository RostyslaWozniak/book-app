import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { ProfileAppointmentsNav } from "@/features/profile/components/profile-appointment-nav";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";

export default function ProfileAppointmentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="sticky top-0 z-50 mb-4 md:mb-8">
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <ProfileAppointmentsNav />
        </MaxWidthWrapper>
      </section>

      {children}
    </>
  );
}
