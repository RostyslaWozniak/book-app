import {
  $Enums,
  type Appointment,
  type ProviderScheduleAvailability,
} from "@prisma/client";
import { setWeek } from "date-fns";

import {
  format,
  startOfWeek,
  addDays,
  // isSameDay,
  getHours,
  getMinutes,
} from "date-fns";
import type { WeekDayInfo, AppointmentPosition } from "../../types/appointment";
import { pl } from "date-fns/locale";

type AvailabilityType = Pick<
  ProviderScheduleAvailability,
  "startTime" | "endTime" | "dayOfWeek" | "weekType"
>;

/**
 * Generates an array of week days starting from the given date
 */
export function generateWeekDays(
  currentDate: Date,
  availabilities: AvailabilityType[],
): WeekDayInfo[] {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday

  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(weekStart, index);
    const currentAvailabilities = availabilities.filter(
      (a) => a.dayOfWeek === Object.values($Enums.ScheduleDayOfWeek)[index],
    );

    return {
      name: format(date, "EEEE", { locale: pl }),
      date: date,
      dayOfMonth: format(date, "d"),
      isToday: isSameDay(date, new Date()),
      startTimes: currentAvailabilities.map((a) => a.startTime),
      endTimes: currentAvailabilities.map((a) => a.endTime),
      weekType: currentAvailabilities.map((a) => a.weekType)[0] ?? "ALL",
    };
  });
}

/**
 * Generates time slot labels for the calendar
 */
export function generateTimeSlots(
  visibleHours: number,
  startHour: number,
): string[] {
  return [
    ...new Set(
      Array.from({ length: visibleHours }).map((_, hourIndex) => {
        const hour = startHour + hourIndex;

        if (hour >= 24) {
          return "24:00";
        }

        return `${hour.toString().padStart(2, "0")}:00`;
      }),
    ),
  ];
}

/**
 * Filters appointments that fall within the current week view
 */
export function filterAppointmentsForWeek(
  appointments: Appointment[] | undefined,
  weekDays: WeekDayInfo[],
  statuses: $Enums.AppointmentStatus[],
): Appointment[] {
  if (!appointments) return [];
  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    return weekDays.some(
      (day) =>
        isSameDay(day.date, appointmentDate) &&
        statuses.includes(appointment.status),
    );
  });
}

/**
 * Calculates the position and height of an appointment in the calendar grid
 */
export function calculateAppointmentPosition(
  startTime: Date,
  endTime: Date,
  cellSize: number,
  dayStartHour: number,
): AppointmentPosition {
  const startHour = getHours(startTime);
  const startMinute = getMinutes(startTime);
  const endHour = getHours(endTime);
  const endMinute = getMinutes(endTime);

  // Calculate position based on time and cell size
  const minutesSinceCalendarStart =
    (startHour - dayStartHour) * 60 + startMinute;
  // const minutesSinceCalendarStart = (startHour - 10) * 60 + startMinute;

  const durationInMinutes =
    (endHour - startHour) * 60 + (endMinute - startMinute);

  const topPosition = minutesSinceCalendarStart * (cellSize / 60);
  const appointmentHeight = durationInMinutes * (cellSize / 60);

  return {
    top: `${topPosition}px`,
    height: `${appointmentHeight}px`,
  };
}

/**
 * Formats a time range for display
 */
export function formatTimeRange(startTime: Date, endTime: Date): string {
  return `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`;
}

export const getStatusColor = (status: $Enums.AppointmentStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 border-amber-300 text-amber-800";
    case "CONFIRMED":
      return "bg-green-100 border-green-300 text-green-800";
    case "CANCELLED":
      return "bg-red-100 border-red-300 text-red-800";
    case "COMPLETED":
      return "bg-blue-100 border-blue-300 text-blue-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};

export const getStatusDotColor = (status: $Enums.AppointmentStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-400";
    case "CONFIRMED":
      return "bg-green-400";
    case "CANCELLED":
      return "bg-red-400";
    case "COMPLETED":
      return "bg-blue-400";
    default:
      return "bg-gray-400";
  }
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const isSameDay = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};

export const getWeekDates = (date: Date) => {
  const week = [];
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    week.push(day);
  }

  return week;
};

export const getMonthDates = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  const dates = [];
  const current = new Date(startDate);

  while (current <= lastDay || current.getDay() !== 0) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const getAppointmentsForDate = (
  appointments: Appointment[],
  date: Date,
) => {
  return appointments.filter((appointment) =>
    isSameDay(appointment.startTime, date),
  );
};

export const getAppointmentsForWeek = (
  appointments: Appointment[],
  date: Date,
) => {
  const weekDates = getWeekDates(date);
  return appointments.filter((appointment) =>
    weekDates.some((weekDate) => isSameDay(appointment.startTime, weekDate)),
  );
};

export function getDateFromWeekAndYear(week: number, year: number): Date {
  const date = new Date(year, 0, 4); // Jan 4, to ensure week 1
  const withWeekSet = setWeek(date, week);
  return new Date(startOfWeek(withWeekSet).setHours(2));
}
