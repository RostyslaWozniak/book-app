import type z from "zod";
import { commonProviderScheduleOverride } from "./common";

export const createProviderScheduleTimeOff =
  commonProviderScheduleOverride.refine(
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

export type CreateProviderScheduleTimeOff = z.infer<
  typeof createProviderScheduleTimeOff
>;
