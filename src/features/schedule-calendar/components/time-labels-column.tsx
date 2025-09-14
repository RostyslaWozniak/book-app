import { useScheduleCalendarContext } from "../context/schedule-calendar-context";

export function TimeLabelsColumn() {
  const { timeSlots, cellSize } = useScheduleCalendarContext();

  return (
    <div className="text-muted-foreground">
      {timeSlots.map((timeLabel, index) => (
        <div
          key={index}
          className="border-b pr-2 text-right text-xs"
          style={{ height: `${cellSize}px` }}
        >
          {timeLabel}
        </div>
      ))}
    </div>
  );
}
