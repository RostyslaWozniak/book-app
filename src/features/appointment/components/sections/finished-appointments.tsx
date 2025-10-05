import { api } from "@/trpc/server";
import { AppointmentsList } from "../appointments-list";
import { EmptyResult } from "@/components/ui/empty-result";
import { ClockIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import Link from "next/link";

export async function FinishedAppointments({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) {
  const { appointments, appointmentsCount } =
    await api.private.appointment.getFinished({
      take,
      skip,
    });
  return (
    <AppointmentsList
      appointments={appointments}
      appointmentsCount={appointmentsCount}
      title="Zakończone wizyty"
      showPagination={take > 1}
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
