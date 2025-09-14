import type { ProviderScheduleAvailability } from "@prisma/client";

export type AvailabilityType = Pick<
  ProviderScheduleAvailability,
  "startTime" | "endTime" | "dayOfWeek" | "weekType"
>;
