export function TimeLabelsColumn({
  timeSlots,
  cellSize,
}: {
  timeSlots: string[];
  cellSize: number;
}) {
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
