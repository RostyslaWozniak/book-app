import z from "zod";

const commonCreateProviderScheduleOverride = z.object({
  // dates: z.array(z.date()),
  isAvailable: z.boolean(),
  reason: z.string().optional(),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
});

export const clientCreateProviderScheduleOverride =
  commonCreateProviderScheduleOverride
    .extend({ startDate: z.date(), endDate: z.date() })
    .refine(
      (data) => {
        if (data.isAvailable) {
          return !!data.startTime && !!data.endTime;
        }
        return true;
      },
      {
        message:
          "Start and end times are required for partial day availability",
        path: ["startTime"],
      },
    )
    .refine(
      (data) => {
        if (data.endDate < data.startDate) {
          return false;
        }
        return true;
      },
      {
        message: "End date cannot be before start date",
        path: ["endDate"],
      },
    );

export type ClientCreateProviderScheduleOverride = z.infer<
  typeof clientCreateProviderScheduleOverride
>;

export const serverCreateProviderScheduleOverride =
  commonCreateProviderScheduleOverride.extend({ dates: z.array(z.date()) });

export const updateProviderScheduleOverride =
  commonCreateProviderScheduleOverride.extend({
    overrideId: z.string().uuid(),
  });

export type UpdateProviderScheduleOverride = z.infer<
  typeof updateProviderScheduleOverride
>;
