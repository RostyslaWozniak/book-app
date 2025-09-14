import { cn } from "@/lib/utils";
import {
  calculateAppointmentPosition,
  formatTimeRange,
  generateTimeSlots,
  isSameDay,
} from "../lib/utils";
import { mapAppointmentStatus } from "@/features/appointment/lib/utils/map-appointment-status";
import { AppointmentDialog } from "./appointment-dialog";
import { useScheduleCalendarContext } from "../context/schedule-calendar-context";
import { getWeekType } from "@/lib/utils/date";

export function DayColumns() {
  const { timeSlots, cellSize, startHour, weekDays, visibleAppointments } =
    useScheduleCalendarContext();
  return (
    <>
      {weekDays.map((day, dayIndex) => {
        const slots: string[] = [];

        const startHours = day.startTimes.map((startTime) =>
          Number(startTime.split(":")[0]),
        );
        const visbleHours = day.startTimes.map(
          (startTime, i) =>
            Number(day.endTimes[i]?.split(":")[0]) -
            Number(startTime.split(":")[0]),
        );

        startHours.forEach((startHour, i) => {
          const result = generateTimeSlots(visbleHours[i]!, startHour);
          slots.push(...result);
        });

        const weekType = getWeekType(day.date);
        const isDayOf = day.weekType !== weekType && day.weekType !== "ALL";

        return (
          <div key={dayIndex} className={cn("relative border-l")}>
            {/* Time Grid Cells */}
            {timeSlots.map((_, timeIndex) => (
              <div
                key={timeIndex}
                className={cn("border-b", {
                  "bg-destructive/5": isDayOf,
                })}
                style={{ height: `${cellSize}px` }}
              />
            ))}

            {/* Appointment Blocks */}
            {visibleAppointments
              .filter((appointment) =>
                isSameDay(day.date, new Date(appointment.startTime)),
              )
              .map((appointment, index) => {
                const positionStyle = calculateAppointmentPosition(
                  new Date(appointment.startTime),
                  new Date(appointment.endTime),
                  cellSize,
                  startHour,
                );
                const { color } = mapAppointmentStatus(appointment.status);
                return (
                  <AppointmentDialog key={index} appointment={appointment}>
                    <div
                      key={index}
                      className={cn(
                        "absolute cursor-pointer overflow-hidden rounded-[8px] rounded-l-none border-[1px] border-l-6 pl-2 text-xs font-bold shadow-md transition-transform duration-200 ease-in-out hover:z-20 hover:min-h-10 hover:scale-[1.03] hover:shadow-lg",
                        color.secondary,
                      )}
                      style={{
                        ...positionStyle,
                        left: "0px",
                        right: "4px",
                      }}
                    >
                      <div>
                        {formatTimeRange(
                          new Date(appointment.startTime),
                          new Date(appointment.endTime),
                        )}
                      </div>
                      <div>{appointment.contactName}</div>
                    </div>
                  </AppointmentDialog>
                );
              })}
          </div>
        );
      })}
    </>
  );
}
