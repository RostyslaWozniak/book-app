import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { AppointmentCardSkeleton } from "./appointment-card.skeleton";

export function AppointmentsListSkeleton({
  appointmentsToShow,
}: {
  appointmentsToShow: number;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center justify-between gap-x-20">
        <Skeleton className="h-6 w-60" />
        <Skeleton className="h-4 w-60" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: appointmentsToShow }).map((_, i) => (
          <AppointmentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
