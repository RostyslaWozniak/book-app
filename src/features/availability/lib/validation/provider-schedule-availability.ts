import { ScheduleDayOfWeek, WeekType } from "@prisma/client";
import z from "zod";

export const createProviderAvailabilitySchema = z.object({
  dayOfWeek: z.nativeEnum(ScheduleDayOfWeek),
  weekType: z.nativeEnum(WeekType),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
});

export type CreateProviderAvailabilitySchema = z.infer<
  typeof createProviderAvailabilitySchema
>;

export const updateProviderAvailabilitySchema =
  createProviderAvailabilitySchema.extend({ id: z.string() });

export type UpdateProviderAvailabilitySchema = z.infer<
  typeof updateProviderAvailabilitySchema
>;
