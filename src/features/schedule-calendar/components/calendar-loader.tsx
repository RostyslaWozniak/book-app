import { LoaderIcon } from "lucide-react";
import { useScheduleCalendarContext } from "../context/schedule-calendar-context";

export function CalendarLoader() {
  const { isAppointmentsLoading } = useScheduleCalendarContext();
  return (
    <>
      {isAppointmentsLoading ? (
        <div className="bg-muted/80 absolute inset-0 z-50 flex max-w-screen items-center justify-center">
          <LoaderIcon size={32} className="animate-spin" />
        </div>
      ) : null}
    </>
  );
}
