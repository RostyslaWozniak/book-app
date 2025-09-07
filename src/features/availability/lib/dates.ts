import { WeekType, type ScheduleDayOfWeek } from "@prisma/client";

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
