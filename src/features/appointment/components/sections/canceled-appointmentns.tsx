import { api } from "@/trpc/server";
import { AppointmentsList } from "../appointments-list";
import { EmptyResult } from "@/components/ui/empty-result";
import { ClockIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import Link from "next/link";

export async function CanceledAppointments({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) {
  const { appointments, appointmentsCount } =
    await api.private.appointment.getCanceled({
      take,
      skip,
    });
  return (
    <AppointmentsList
      appointments={appointments}
      appointmentsCount={appointmentsCount}
      title="Anulowane wizyty"
      emptyComponent={() => (
        <EmptyResult
          icon={ClockIcon}
          title="Brak anulowanych wizyt"
          description="Tutaj znajdziesz anulowane wizyty."
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
