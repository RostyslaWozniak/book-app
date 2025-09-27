import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ActiveAppointments } from "@/features/appointment/components/sections/active-appointments";
import { FinishedAppointments } from "@/features/appointment/components/sections/finished-appointments";
import { AppointmentsListSkeleton } from "@/features/appointment/components/skeletons/appointments-list.skeleton";
import { getCurrentUser } from "@/features/auth/current-user";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <div className="h-40 w-full">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SuspendedHeaderSection />
            </Suspense>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
      <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <Suspense
            fallback={<AppointmentsListSkeleton appointmentsToShow={1} />}
          >
            <ActiveAppointments appointmentsNumb={1} />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
      <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <Suspense
            fallback={<AppointmentsListSkeleton appointmentsToShow={1} />}
          >
            <FinishedAppointments appointmentsNumb={1} />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

async function SuspendedHeaderSection() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return <ProfileHeader role="CLIENT" user={user} showLogoutButton />;
}
