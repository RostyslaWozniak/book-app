import { cn } from "@/lib/utils";
import {
  calculateAppointmentPosition,
  formatTimeRange,
  generateTimeSlots,
  isSameDay,
} from "../lib/utils";
import type { WeekDayInfo } from "../types/appointment";
import { mapAppointmentStatus } from "@/features/appointment/lib/utils/map-appointment-status";
import type { Appointment } from "@prisma/client";
import { AppointmentDialog } from "./appointment-dialog";

type AppintmentType = Pick<
  Appointment,
  | "id"
  | "startTime"
  | "endTime"
  | "status"
  | "contactName"
  | "contactEmail"
  | "createdAt"
>;

type DayColumnsProps = {
  weekDays: WeekDayInfo[];
  timeSlots: string[];
  visibleAppointments: AppintmentType[];
  cellSize: number;
  dayStartHour: number;
};

export function DayColumns({
  weekDays,
  timeSlots,
  visibleAppointments,
  cellSize,
  dayStartHour,
}: DayColumnsProps) {
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

        return (
          <div key={dayIndex} className={cn("relative border-l")}>
            {/* Time Grid Cells */}
            {timeSlots.map((timeSlot, timeIndex) => (
              <div
                key={timeIndex}
                className={cn("bg-background border-b", {
                  "bg-muted/50": !slots.includes(timeSlot),
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
                  dayStartHour,
                );
                const { color } = mapAppointmentStatus(appointment.status);
                return (
                  <AppointmentDialog key={index} appointment={appointment}>
                    <div
                      key={index}
                      className={cn(
                        "absolute cursor-pointer overflow-hidden rounded-[8px] rounded-l-none border-[1px] border-l-8 pl-2 text-xs font-bold shadow-md transition-transform duration-200 ease-in-out hover:z-20 hover:min-h-10 hover:scale-[1.03] hover:shadow-lg",
                        color.default,
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
