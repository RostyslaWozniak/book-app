import type { ProviderScheduleOverride as PrismaProviderScheduleOverride } from "@prisma/client";

export type ProviderScheduleOverride = Pick<
  PrismaProviderScheduleOverride,
  "id" | "date" | "startTime" | "endTime" | "isAvailable" | "reason"
>;

export type TimeOffRange = {
  startDate: Date;
  endDate: Date;
  reason: string | null;
};

export type OverrideRange = TimeOffRange & {
  startTime: string;
  endTime: string;
};
