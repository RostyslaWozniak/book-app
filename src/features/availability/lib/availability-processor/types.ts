import type { $Enums } from "@prisma/client";

export type DayInfo = {
  date: Date;
  dayOfWeek: string;
  weekNumber: number;
  hasAvailableSlots: boolean;
  providerCount: number;
  availableProviders: {
    providerId: string;
    providerName: string;
  }[];
};

export type Override = {
  id: string;
  providerScheduleId: string;
  startTime: string | null;
  endTime: string | null;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  isAvailable: boolean;
  reason: string | null;
};

export type Availability = {
  id: string;
  providerScheduleId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: $Enums.ScheduleDayOfWeek;
  weekType: $Enums.WeekType;
};

export type ProviderAvailability = {
  providerId: string;
  providerName: string;
  availabilities: Availability[];
  overrides: Override[];
};
