import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ActiveAppointments } from "@/features/appointment/components/sections/active-appointments";
import { AppointmentsListSkeleton } from "@/features/appointment/components/skeletons/appointments-list.skeleton";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";
import { Suspense } from "react";

export default function ProfileActiveVisitsPage() {
  return (
    <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
      <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
        <Suspense
          fallback={<AppointmentsListSkeleton appointmentsToShow={3} />}
        >
          <ActiveAppointments appointmentsNumb={9} />
        </Suspense>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
