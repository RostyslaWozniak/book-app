import { WeekType, type $Enums } from "@prisma/client";

export * from "./date-formatter";
export * from "./time-formatter";

export function availabilityTimeToInt(time: string) {
  return parseFloat(time.replace(":", "."));
}

export function getStartDate(date?: Date | null) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDay());
  if (!date) return today;
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  return today > firstDateOfMonth ? today : firstDateOfMonth;
}

// checks if date is the same
export function isSameDay(laterDate: Date, earlierDate: Date): boolean {
  const firstDay = getDayDate(laterDate);
  const secondDay = getDayDate(earlierDate);
  return firstDay.getTime() === secondDay.getTime();
}

// get pure day date with 0 time
export function getDayDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Helper function to parse time string to minutes since midnight
export const timeToMinutes = (timeStr: string): number => {
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Invalid time string: "${timeStr}"`);
  }

  return hours * 60 + minutes;
};

export function getWeekDay(date: Date): $Enums.ScheduleDayOfWeek {
  if (date.getDay() === 1) {
    return "MONDAY";
  } else if (date.getDay() === 2) {
    return "TUESDAY";
  } else if (date.getDay() === 3) {
    return "WEDNESDAY";
  } else if (date.getDay() === 4) {
    return "THURSDAY";
  } else if (date.getDay() === 5) {
    return "FRIDAY";
  } else if (date.getDay() === 6) {
    return "SATURDAY";
  } else if (date.getDay() === 0) {
    return "SUNDAY";
  } else {
    throw new Error("BAD_REQUEST");
  }
}

export function getWeekType(date: Date): WeekType {
  const weekNumber = getDateWeek(date);
  return weekNumber % 2 === 0 ? WeekType.ODD : WeekType.EVEN;
}

function getDateWeek(date: Date) {
  const januaryFirst = new Date(date.getFullYear(), 0, 1);
  const daysToNextMonday =
    januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  const nextMonday = new Date(
    date.getFullYear(),
    0,
    januaryFirst.getDate() + daysToNextMonday,
  );

  const dateTime = date.getTime();
  const nextMondayTime = nextMonday.getTime();

  return dateTime < nextMondayTime
    ? 52
    : dateTime > nextMondayTime
      ? Math.ceil((dateTime - nextMondayTime) / (24 * 3600 * 1000) / 7)
      : 1;
}
