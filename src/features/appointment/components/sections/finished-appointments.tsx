import { api } from "@/trpc/server";
import { AppointmentsList } from "../appointments-list";
import { EmptyResult } from "@/components/ui/empty-result";
import { ClockIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import Link from "next/link";

export async function FinishedAppointments({
  appointmentsNumb,
}: {
  appointmentsNumb: number;
}) {
  const { appointments, appointmentsCount } =
    await api.private.appointment.getFinished({
      take: appointmentsNumb,
    });
  return (
    <AppointmentsList
      appointments={appointments}
      appointmentsCount={appointmentsCount}
      title="Zakończone wizyty"
      emptyComponent={() => (
        <EmptyResult
          icon={ClockIcon}
          title="Brak wczeszniejszych wizyt"
          description="Tutaj znajdziesz swoje zakończone wizyty."
          actionButton={
            <Link href="/profile/services" className="mt-6 w-full">
              <Button>
                <PlusIcon /> Umów wizytę
              </Button>
            </Link>
          }
        />
      )}
    />
  );
}
