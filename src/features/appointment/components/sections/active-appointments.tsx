import { api } from "@/trpc/server";
import { AppointmentsList } from "../appointments-list";
import { EmptyResult } from "@/components/ui/empty-result";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";

export async function ActiveAppointments({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) {
  const { appointments, appointmentsCount } =
    await api.private.appointment.getActive({
      take,
      skip,
    });

  return (
    <AppointmentsList
      appointments={appointments}
      appointmentsCount={appointmentsCount}
      title="Zaplanowane wizyty"
      moreHref="/profile/visits/active"
      emptyComponent={() => (
        <EmptyResult
          icon={CalendarIcon}
          title="Brak nadchodzących wizyt"
          description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu."
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
