"use client";

import { $Enums, type ProviderScheduleAvailability } from "@prisma/client";
import { getISOWeek, getISOWeeksInYear } from "date-fns";
import { useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { CALENDAR_CONFIG } from "../configs/config";
import {
  filterAppointmentsForWeek,
  generateTimeSlots,
  generateWeekDays,
  getDateFromWeekAndYear,
} from "../lib/utils";
import { getWeekDateRange } from "../lib/utils/get-month-date-range";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { mapAppointmentStatus } from "@/features/appointment/lib/utils/map-appointment-status";
import { Button } from "@/components/shadcn-ui/button";
import { LoaderIcon } from "lucide-react";
import { DayColumns } from "./day-columns";
import { TimeLabelsColumn } from "./time-labels-column";
import { WeekHeaderRow } from "./week-header-row";
import { WeekSelection } from "./week-selection";

type AvailabilityType = Pick<
  ProviderScheduleAvailability,
  "startTime" | "endTime" | "dayOfWeek" | "weekType"
>;

type ScheduleCalendarProps = {
  weekStartDate: Date;
  weekEndDate: Date;
  providerId?: string;
  availabilities: AvailabilityType[];
};

export function ScheduleCalendar({
  providerId,
  availabilities,
}: ScheduleCalendarProps) {
  // State management
  const todayDate = new Date();
  const todayWeek = getISOWeek(todayDate);
  const todayYear = todayDate.getFullYear();

  const [week, setWeek] = useQueryState("week", {
    defaultValue: todayWeek,
    parse: parseInt,
  });
  const [year, setYear] = useQueryState("year", {
    defaultValue: todayYear,
    parse: parseInt,
  });

  const [statuses, setStatuses] = useState<$Enums.AppointmentStatus[]>(
    Object.values($Enums.AppointmentStatus),
  );

  const [cellSize, setCellSize] = useState(CALENDAR_CONFIG.DEFAULT_CELL_SIZE);

  const [startHour, setStartHour] = useState<number>(0);
  const [visibleHours, setVisibleHours] = useState<number>(24);

  const currentDate = useMemo(
    () => getDateFromWeekAndYear(week, year),
    [week, year],
  );

  const { start, end } = getWeekDateRange(year.toString(), week.toString());

  const { data: appointments, isLoading: isAppointmentsLoading } = providerId
    ? api.admin.provider.getAppointmentsByProviderId.useQuery({
        providerId: providerId,
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-10-30"),
      })
    : api.admin.provider.getAppointmentsByProviderId.useQuery({
        providerId: providerId ?? "",
        startDate: start,
        endDate: end,
      });

  // Generate week days data
  const weekDays = useMemo(
    () => generateWeekDays(currentDate, availabilities),
    [currentDate, availabilities],
  );

  // Generate time slots
  const timeSlots = useMemo(
    () => generateTimeSlots(visibleHours, startHour),
    [visibleHours, startHour],
  );

  // Filter appointments for the current week view
  const visibleAppointments = useMemo(
    () => filterAppointmentsForWeek(appointments, weekDays, statuses),
    [weekDays, appointments, statuses],
  );

  // Navigation handlers
  const navigateToToday = async () => {
    await setWeek(todayWeek);
    await setYear(todayYear);
  };
  const navigateToPreviousWeek = async () => {
    await setWeek(week - 1 === 0 ? getISOWeeksInYear(year - 1) : week - 1);
    await setYear(week - 1 === 0 ? year - 1 : year);
  };
  const navigateToNextWeek = async () => {
    await setWeek(week + 1 === getISOWeeksInYear(year) + 1 ? 1 : week + 1);
    await setYear(week + 1 === getISOWeeksInYear(year) + 1 ? year + 1 : year);
  };

  useEffect(() => console.log({ visibleAppointments }), [visibleAppointments]);

  return (
    <div className="relative h-full xl:p-4">
      <div className="h-full">
        {/* Calendar Header */}
        <div className="xl:p-4">
          <div className="flex flex-col gap-4 sm:items-center sm:justify-between xl:flex-row">
            {/* Navigation Controls */}
            <WeekSelection
              isCurrentWeek={week === todayWeek && year === todayYear}
              navigateToNextWeek={navigateToNextWeek}
              navigateToPreviousWeek={navigateToPreviousWeek}
              navigateToToday={navigateToToday}
            >
              Tydz. {week}
            </WeekSelection>

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
                        "bg-muted text-muted-foreground":
                          !statuses.includes(status),
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

            {/* Cell Size Controls */}
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-semibold">Rozmiar komórki:</h3>
              <div className="space-x-2">
                {CALENDAR_CONFIG.CELL_SIZES.map(({ label, value }) => (
                  <Button
                    key={label}
                    size="icon"
                    variant={value === cellSize ? "default" : "outline"}
                    onClick={() => setCellSize(value)}
                    className="h-6 w-6"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="scrollbar-hide -mx-4 overflow-x-scroll py-4">
          <div className="relative h-full min-w-300 overflow-hidden xl:rounded-xl xl:border xl:shadow-sm">
            {isAppointmentsLoading && (
              <div className="absolute inset-0 z-50 flex max-w-screen items-center justify-center bg-white/70">
                <LoaderIcon className="animate-spin" />
              </div>
            )}
            {/* Week Header Row */}
            <div className="bg-background/50 relative z-10 backdrop-blur-sm">
              <WeekHeaderRow weekDays={weekDays} />
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-[50px_repeat(7,1fr)]">
              {/* Time Labels Column */}
              <TimeLabelsColumn timeSlots={timeSlots} cellSize={cellSize} />

              {/* Day Columns with Appointments */}
              <DayColumns
                weekDays={weekDays}
                timeSlots={timeSlots}
                visibleAppointments={visibleAppointments}
                cellSize={cellSize}
                dayStartHour={startHour}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
