import z from "zod";

export const commonProviderScheduleOverride = z.object({
  reason: z.string().optional(),
  startDate: z.date({ message: "Data jest wymagana" }),
  endDate: z.date(),
});

export const startEndTime = {
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
};
