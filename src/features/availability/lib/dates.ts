import { WeekType, type ScheduleDayOfWeek } from "@prisma/client";
import type {
  OverrideRange,
  ProviderScheduleOverride,
  TimeOffRange,
} from "../types/override.type";

export function formatDayOfWeek(day: ScheduleDayOfWeek) {
  switch (day) {
    case "MONDAY":
      return "Poniedziałek";
    case "TUESDAY":
      return "Wtorek";
    case "WEDNESDAY":
      return "Środa";
    case "THURSDAY":
      return "Czwartek";
    case "FRIDAY":
      return "Piątek";
    case "SATURDAY":
      return "Sobota";
    case "SUNDAY":
      return "Niedziela";
    default:
      return "Nie znany dzień";
  }
}

export function getWeekTypeLabel(weekType: WeekType | null) {
  return weekType === WeekType.ALL
    ? "Wszystkie"
    : weekType === WeekType.ODD
      ? "Nieparzyste"
      : "Parzyste";
}

export function availabilityTimeToInt(time: string) {
  return parseFloat(time.replace(":", "."));
}

export function availabilityTimeToString(time: number) {
  return time.toFixed(2).padStart(5, "0").replace(".", ":");
}

/**
 * Groups sequential unavailable dates into ranges
 * Breaks when dates are not consecutive or reasons differ
 */
export function groupTimeOffRanges(
  timeOffs: Pick<ProviderScheduleOverride, "id" | "date" | "reason">[],
): TimeOffRange[] {
  const holidays = [...timeOffs].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  if (holidays.length === 0) {
    return [];
  }

  // Destructure safely after guard
  const [first, ...rest] = holidays;

  if (!first) {
    throw new Error("Error: groupHolidayRanges");
  }

  const result: TimeOffRange[] = [];
  let currentRange: TimeOffRange = {
    startDate: first.date,
    endDate: first.date,
    reason: first.reason,
  };

  for (const curr of rest) {
    const prev = currentRange.endDate;
    const oneDayMs = 1000 * 60 * 60 * 24;

    const isConsecutive = curr.date.getTime() - prev.getTime() === oneDayMs;
    const sameReason = curr.reason === currentRange.reason;
    if (isConsecutive && sameReason) {
      currentRange = { ...currentRange, endDate: curr.date };
    } else {
      result.push(currentRange);
      currentRange = {
        startDate: curr.date,
        endDate: curr.date,
        reason: curr.reason,
      };
    }
  }

  result.push(currentRange);
  return result;
}
export function groupOverrideRanges(
  overrides: Pick<
    ProviderScheduleOverride,
    "id" | "date" | "startTime" | "endTime" | "reason"
  >[],
): OverrideRange[] {
  const holidays = [...overrides].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  if (holidays.length === 0) {
    return [];
  }

  // Destructure safely after guard
  const [first, ...rest] = holidays;

  if (!first) {
    throw new Error("Error: groupHolidayRanges");
  }

  const result: OverrideRange[] = [];
  let currentRange: OverrideRange = {
    startDate: first.date,
    endDate: first.date,
    reason: first.reason,
    startTime: first.startTime!,
    endTime: first.endTime!,
  };

  for (const curr of rest) {
    const prev = currentRange.endDate;
    const oneDayMs = 1000 * 60 * 60 * 24;

    const isConsecutive = curr.date.getTime() - prev.getTime() === oneDayMs;
    const sameReason = curr.reason === currentRange.reason;
    if (isConsecutive && sameReason) {
      currentRange = { ...currentRange, endDate: curr.date };
    } else {
      result.push(currentRange);
      currentRange = {
        startDate: curr.date,
        endDate: curr.date,
        reason: curr.reason,
        startTime: curr.startTime!,
        endTime: curr.endTime!,
      };
    }
  }

  result.push(currentRange);
  return result;
}
