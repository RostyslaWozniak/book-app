import type { ProviderScheduleOverride as PrismaProviderScheduleOverride } from "@prisma/client";

export type ProviderScheduleOverride = Pick<
  PrismaProviderScheduleOverride,
  "id" | "date" | "startTime" | "endTime" | "isAvailable" | "reason"
>;
