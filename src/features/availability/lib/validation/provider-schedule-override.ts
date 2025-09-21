import type z from "zod";
import { commonProviderScheduleOverride, startEndTime } from "./common";

export const createProviderScheduleOverride = commonProviderScheduleOverride
  .extend(startEndTime)
  .refine(
    (data) => {
      if (data.endDate < data.startDate) {
        return false;
      }
      return true;
    },
    {
      message: "Data zakończenia nie może przypadać przed datą rozpoczęcia",
      path: ["endDate"],
    },
  );

export type CreateProviderScheduleOverride = z.infer<
  typeof createProviderScheduleOverride
>;
