import { cn } from "@/lib/utils";
import type { WeekDayInfo } from "../types/appointment";
import { formatDate } from "date-fns";
import { pl } from "date-fns/locale";
import { getWeekType } from "@/lib/utils/date";

export function WeekHeaderRow({ weekDays }: { weekDays: WeekDayInfo[] }) {
  return (
    <div className="grid grid-cols-[50px_repeat(7,1fr)] overflow-hidden border-b">
      <div className="text-muted-foreground p-2 text-center text-xs"></div>
      {weekDays.map((day, index) => {
        const weekType = getWeekType(day.date);
        console.log({ date: day.date, dayWeekType: day.weekType, weekType });
        return (
          <div
            key={index}
            className={cn("relative border-l p-2 text-center", {
              "bg-muted/50":
                !day.startTimes.length &&
                !day.endTimes.length &&
                (day.weekType !== weekType || day.weekType !== "ALL"),
            })}
          >
            <div className="text-muted-foreground text-xs font-medium">
              {day.name}
            </div>

            <div
              className={cn(
                "mx-auto mt-1 flex h-8 w-min items-center justify-center px-2 font-medium text-nowrap",
                day.isToday &&
                  "bg-primary text-primary-foreground rounded-full",
              )}
            >
              {formatDate(day.date, "d MMM", { locale: pl })}
            </div>
            <div>
              {day.startTimes.map((startTime, i) => (
                <div key={i}>
                  {startTime} - {day.endTimes[i]}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
