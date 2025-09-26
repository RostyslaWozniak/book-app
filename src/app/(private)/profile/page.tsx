import { Button } from "@/components/shadcn-ui/button";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { EmptyResult } from "@/components/ui/empty-result";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AppointmentsSection } from "@/features/appointment/components/appointments-list";
import { getCurrentUser } from "@/features/auth/current-user";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { PAGE_MAX_WIDTH } from "@/features/profile/lib/const";
import { wait } from "@/lib/utils/wait";
import { api } from "@/trpc/server";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper size={PAGE_MAX_WIDTH}>
          <div className="h-40 w-full">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SuspendedHeaderSection />
            </Suspense>
          </div>
          <div className="h-40 w-full">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SuspendedAppointments />
            </Suspense>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

async function SuspendedHeaderSection() {
  await wait(3000);

  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return <ProfileHeader role="CLIENT" user={user} showLogoutButton />;
}

async function SuspendedAppointments() {
  const appointments = await api.profile.appointment.getAllOwn();

  return (
    <div>
      <AppointmentsSection
        appointments={appointments}
        title="Moje wizyty"
        moreHref="/profile/appointments"
        appointmentsCount={appointments.length}
        emptyComponent={() => (
          <EmptyResult
            icon={CalendarIcon}
            title="Brak nadchodzących wizyt"
            description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu."
            actionButton={
              <Link href="/uslugi/nowa" className="mt-6 w-full">
                <Button>
                  <PlusIcon /> Umów wizytę
                </Button>
              </Link>
            }
          />
        )}
      />
    </div>
  );
}
