import { WeekType, type ScheduleDayOfWeek } from "@prisma/client";
import type {
  HolidayRange,
  ProviderScheduleOverride,
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
export function groupHolidayRanges(
  overrides: Pick<
    ProviderScheduleOverride,
    "id" | "date" | "isAvailable" | "reason"
  >[],
): HolidayRange[] {
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

  const result: HolidayRange[] = [];
  let currentRange: HolidayRange = {
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
