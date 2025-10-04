import { AppointmentsSuspenseViewWrapper } from "@/features/appointment/components/appointments-suspense-view-wrapper";
import { ActiveAppointments } from "@/features/appointment/components/sections/active-appointments";
import { FinishedAppointments } from "@/features/appointment/components/sections/finished-appointments";

const APPOINTMENTS_TO_SHOW = 1;
export default function ProfilePage() {
  return (
    <>
      <AppointmentsSuspenseViewWrapper skeletonsToShow={APPOINTMENTS_TO_SHOW}>
        <ActiveAppointments take={APPOINTMENTS_TO_SHOW} skip={0} />
      </AppointmentsSuspenseViewWrapper>
      <AppointmentsSuspenseViewWrapper skeletonsToShow={APPOINTMENTS_TO_SHOW}>
        <FinishedAppointments take={APPOINTMENTS_TO_SHOW} skip={0} />
      </AppointmentsSuspenseViewWrapper>
    </>
  );
}
