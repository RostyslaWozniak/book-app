import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { pl } from "date-fns/locale";
import { useScheduleCalendarContext } from "../context/schedule-calendar-context";
import { ClockIcon } from "lucide-react";
import { Badge } from "@/components/shadcn-ui/badge";
import { getWeekType } from "@/lib/utils/date";

export function WeekHeaderRow() {
  const { weekDays } = useScheduleCalendarContext();
  return (
    <div className="relative z-10 grid grid-cols-[50px_repeat(7,1fr)] overflow-hidden border-t border-b backdrop-blur-xs">
      <div className="text-muted-foreground my-auto grid place-items-center text-center text-xs">
        <ClockIcon />
      </div>
      {weekDays.map((day, index) => {
        const weekType = getWeekType(day.date);
        const isDayOf = day.weekType !== weekType && day.weekType !== "ALL";
        return (
          <div
            key={index}
            className={cn("relative border-l p-2 text-center", {
              "bg-destructive/10": isDayOf,
            })}
          >
            <div className="text-muted-foreground text-xs font-medium">
              {day.name}
            </div>

            <Badge
              variant={
                day.isToday ? "default" : isDayOf ? "destructive" : "outline"
              }
            >
              {formatDate(day.date, "d MMM", { locale: pl })}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}
