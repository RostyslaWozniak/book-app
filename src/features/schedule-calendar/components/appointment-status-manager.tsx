import { mapAppointmentStatus } from "@/features/appointment/lib/utils/map-appointment-status";
import { cn } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import { useScheduleCalendarContext } from "../context/schedule-calendar-context";

export function AppointmentStatusManager() {
  const { statuses, setStatuses } = useScheduleCalendarContext();
  return (
    <div className="flex flex-wrap items-center gap-3">
      {Object.values($Enums.AppointmentStatus).map((status) => {
        const { color, label } = mapAppointmentStatus(status);

        return (
          <button
            key={status}
            className={cn(
              color.default,
              "cursor-pointer rounded-full border-none px-3 py-1 text-xs font-semibold",
              {
                "bg-muted text-muted-foreground": !statuses.includes(status),
              },
            )}
            onClick={() =>
              statuses.includes(status)
                ? setStatuses(statuses.filter((s) => s !== status))
                : setStatuses([...statuses, status])
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
