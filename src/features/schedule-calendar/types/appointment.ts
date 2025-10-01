import type {
  $Enums,
  Appointment as PrismaAppointment,
  User as PrismaUser,
  Service as PrismaService,
} from "@prisma/client";

type CalendarUser = Pick<
  PrismaUser,
  "id" | "firstName" | "lastName" | "phoneNumber" | "photo"
>;

type CalendarService = Pick<PrismaService, "name">;

export type CalendarAppointment = Pick<
  PrismaAppointment,
  | "id"
  | "startTime"
  | "endTime"
  | "status"
  | "contactName"
  | "contactEmail"
  | "contactPhone"
  | "createdAt"
> & { user: CalendarUser } & { service: CalendarService };

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
