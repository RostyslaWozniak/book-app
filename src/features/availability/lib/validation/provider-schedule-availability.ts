import { ScheduleDayOfWeek, WeekType } from "@prisma/client";
import z from "zod";
import { startEndTime } from "./common";

export const createProviderAvailabilitySchema = z.object({
  dayOfWeek: z.nativeEnum(ScheduleDayOfWeek),
  weekType: z.nativeEnum(WeekType),
  ...startEndTime,
});

export type CreateProviderAvailabilitySchema = z.infer<
  typeof createProviderAvailabilitySchema
>;

export const updateProviderAvailabilitySchema =
  createProviderAvailabilitySchema.extend({ id: z.string() });

export type UpdateProviderAvailabilitySchema = z.infer<
  typeof updateProviderAvailabilitySchema
>;
