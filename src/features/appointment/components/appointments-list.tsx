import { H2 } from "@/components/ui/typography";
import type { ProfileAppointemnt } from "../types/appointment.type";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";
import { AppointmentCard } from "./appointment-card";

export function AppointmentsList({
  appointments,
  appointmentsCount,
  title,
  emptyComponent: EmptyComponent,
  moreHref,
}: {
  appointments: ProfileAppointemnt[];
  appointmentsCount: number;
  title: string;
  emptyComponent: React.ElementType;
  moreHref?: string;
}) {
  const showMoreButton = appointmentsCount === 0 || appointments.length > 1;
  const isEmpty = appointmentsCount === 0;
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <H2 className="text-muted-foreground!text-start text-base md:!text-xl">
          {title} ({appointmentsCount})
        </H2>
        {moreHref && !showMoreButton && (
          <Link href={moreHref}>
            <Button
              variant="link"
              size="default"
              className="text-xs sm:text-sm"
            >
              Zobacz wszystkie
            </Button>
          </Link>
        )}
      </div>

      {!isEmpty ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
}
