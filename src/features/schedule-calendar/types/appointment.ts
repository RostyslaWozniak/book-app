import type { $Enums, Appointment } from "@prisma/client";

export type AppointmentType = Pick<
  Appointment,
  | "id"
  | "startTime"
  | "endTime"
  | "status"
  | "contactName"
  | "contactEmail"
  | "createdAt"
>;

export type WeekDayInfo = {
  name: string;
  date: Date;
  dayOfMonth: string;
  isToday: boolean;
  startTimes: string[];
  endTimes: string[];
  weekType: $Enums.WeekType | null;
};

export type AppointmentPosition = {
  top: string;
  height: string;
};
