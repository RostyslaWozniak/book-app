"use client";

import { DayColumns } from "./day-columns";
import { TimeLabelsColumn } from "./time-labels-column";
import { WeekHeaderRow } from "./week-header-row";
import { WeekSelection } from "./week-selection";
import { ScheduleCalendarContextProvider } from "../context/schedule-calendar-context";
import { CalendarPreferences } from "./calendar-preferences";
import type { AvailabilityType } from "../types/availability";
import { AppointmentStatusManager } from "./appointment-status-manager";
import { CalendarLoader } from "../calendar-loader";
import { Card, CardContent, CardHeader } from "@/components/shadcn-ui/card";

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
  return (
    <ScheduleCalendarContextProvider values={{ providerId, availabilities }}>
      <Card className="relative overflow-hidden pb-0">
        <CardHeader className="flex flex-col gap-4 sm:items-center sm:justify-between md:flex-row">
          <WeekSelection />
          <AppointmentStatusManager />
          <CalendarPreferences />
        </CardHeader>
        <CardContent className="relative p-0">
          <WeekHeaderRow />
          <div className="grid grid-cols-[50px_repeat(7,1fr)]">
            <TimeLabelsColumn />
            <DayColumns />
          </div>

          <CalendarLoader />
        </CardContent>
      </Card>
    </ScheduleCalendarContextProvider>
  );
}
