import { H2 } from "@/components/ui/typography";
import type { ProfileAppointemnt } from "../types/appointment.type";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";
import { AppointmentCard } from "./appointment-card";
import Pagination from "@/components/pagination";
import { PROFILE_APPOINTMENTS_PER_PAGE } from "@/features/profile/lib/const";

export function AppointmentsList({
  appointments,
  appointmentsCount,
  title,
  showPagination = false,
  emptyComponent: EmptyComponent,
  moreHref,
}: {
  appointments: ProfileAppointemnt[];
  appointmentsCount: number;
  title: string;
  showPagination?: boolean;
  emptyComponent: React.ElementType;
  moreHref?: string;
}) {
  const showMoreButton = appointmentsCount === 0 || appointments.length > 1;
  const isEmpty = appointments.length === 0;
  const totalPages = Math.ceil(
    appointmentsCount / PROFILE_APPOINTMENTS_PER_PAGE,
  );
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

      {showPagination && totalPages > 1 && (
        <div className="my-8 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
