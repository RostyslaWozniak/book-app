import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Suspense } from "react";
import { AppointmentsListSkeleton } from "./skeletons/appointments-list.skeleton";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";

type AppointmentsSuspenseViewWrapperProps = {
  children: React.ReactNode;
  skeletonsToShow: number;
};

export function AppointmentsSuspenseViewWrapper({
  children,
  skeletonsToShow,
}: AppointmentsSuspenseViewWrapperProps) {
  return (
    <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
      <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
        <Suspense
          fallback={
            <AppointmentsListSkeleton appointmentsToShow={skeletonsToShow} />
          }
        >
          {children}
        </Suspense>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
