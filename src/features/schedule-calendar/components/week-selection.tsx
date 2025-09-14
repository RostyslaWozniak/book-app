"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { useScheduleCalendarContext } from "../context/schedule-calendar-context";
import { getISOWeeksInYear } from "date-fns";

export function WeekSelection() {
  const { week, todayWeek, year, todayYear, setWeek, setYear } =
    useScheduleCalendarContext();
  const isCurrentWeek = week === todayWeek && year === todayYear;

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

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant={isCurrentWeek ? "default" : "outline"}
        size="sm"
        onClick={navigateToToday}
      >
        Dzisiaj
      </Button>
      <div className="flex flex-grow items-center justify-center gap-2">
        <Button variant="ghost" size="icon" onClick={navigateToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          className={cn("min-w-20 text-center font-medium", {
            "text-primary": isCurrentWeek,
          })}
        >
          Tydz. {week}
        </div>

        <Button variant="ghost" size="icon" onClick={navigateToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
