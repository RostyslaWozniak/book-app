import z from "zod";

export const createProviderScheduleHolidays = z.object({
  reason: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});

export type CreateProviderScheduleHolidays = z.infer<
  typeof createProviderScheduleHolidays
>;

export const updateProviderScheduleHolidays =
  createProviderScheduleHolidays.extend({
    overrideId: z.string().uuid(),
  });

export type UpdateProviderScheduleHolidays = z.infer<
  typeof updateProviderScheduleHolidays
>;
