import { AppointmentsSuspenseViewWrapper } from "@/features/appointment/components/appointments-suspense-view-wrapper";
import { ActiveAppointments } from "@/features/appointment/components/sections/active-appointments";
import { PROFILE_APPOINTMENTS_PER_PAGE } from "@/features/profile/lib/const";

export default async function ProfileActiveVisitsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const pNumber = Number(page);

  const pageNumber = isNaN(pNumber) ? 1 : pNumber;
  const skip = (pageNumber - 1) * PROFILE_APPOINTMENTS_PER_PAGE;
  return (
    <AppointmentsSuspenseViewWrapper skeletonsToShow={3}>
      <ActiveAppointments take={PROFILE_APPOINTMENTS_PER_PAGE} skip={skip} />
    </AppointmentsSuspenseViewWrapper>
  );
}
