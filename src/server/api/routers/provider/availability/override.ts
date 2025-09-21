import {
  availabilityTimeToString,
  groupOverrideRanges,
} from "@/features/availability/lib/dates";
import { createProviderScheduleOverride } from "@/features/availability/lib/validation/provider-schedule-override";
import { ProviderScheduleService } from "@/features/provider/server/services";
import { providerProcedure } from "@/server/api/procedures/provider-procedure";
import { createTRPCRouter } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { eachDayOfInterval } from "@/lib/utils/date/each-day-of-interval";
import z from "zod";
import {
  calculteAvailabilityTimeToCurrentTimezone,
  calculteAvailabilityTimeToUTCTimezone,
} from "@/lib/utils/date/timezone";

export const providerAvailabilityOverrideRouter = createTRPCRouter({
  getAllOwn: providerProcedure.query(async ({ ctx }) => {
    const providerSchedule =
      await ProviderScheduleService.getByProviderIdOrThrow({
        id: ctx.provider.id,
      });

    const providerScheduleOverrides =
      await ctx.db.providerScheduleOverride.findMany({
        where: {
          providerScheduleId: providerSchedule.id,
          isAvailable: true,
        },
        select: {
          id: true,
          date: true,
          reason: true,
          isAvailable: true,
          startTime: true,
          endTime: true,
        },
      });

    return groupOverrideRanges(providerScheduleOverrides).map((o) => ({
      ...o,
      startTime: availabilityTimeToString(
        calculteAvailabilityTimeToCurrentTimezone(o.startTime),
      ),
      endTime: availabilityTimeToString(
        calculteAvailabilityTimeToCurrentTimezone(o.endTime),
      ),
    }));
  }),

  create: providerProcedure
    .input(createProviderScheduleOverride)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const dates = eachDayOfInterval({
        start: new Date(input.startDate.setUTCHours(2, 0, 0, 0)),
        end: new Date(input.endDate.setUTCHours(2, 0, 0, 0)),
      });

      const providerSchedule =
        await ProviderScheduleService.getByProviderIdOrThrow({
          id: ctx.provider.id,
        });

      const existingOverrides = await ctx.db.providerScheduleOverride.findMany({
        where: {
          providerScheduleId: providerSchedule.id,
          date: {
            in: dates,
          },
        },
      });
      if (existingOverrides.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Istnieją już nadpisania dla dat: ${existingOverrides
            .map((o) => format(o.date, "PPP"))
            .join(", ")}`,
        });
      }
      const strartTimeNumber = calculteAvailabilityTimeToUTCTimezone(
        input.startTime,
      );
      const endTimeNumber = calculteAvailabilityTimeToUTCTimezone(
        input.endTime,
      );

      if (strartTimeNumber >= endTimeNumber) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Strart pracy powinien być mniejszy od końca pracy",
        });
      }

      await ctx.db.providerScheduleOverride.createMany({
        data: dates.map((date) => ({
          providerScheduleId: providerSchedule.id,
          date,
          isAvailable: true,
          reason: input.reason,
          startTime: availabilityTimeToString(strartTimeNumber),
          endTime: availabilityTimeToString(endTimeNumber),
        })),
      });
    }),

  delete: providerProcedure
    .input(z.object({ startDate: z.date(), endDate: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const dates = eachDayOfInterval({
        start: new Date(input.startDate.setUTCHours(2, 0, 0, 0)),
        end: new Date(input.endDate.setUTCHours(2, 0, 0, 0)),
      });
      console.log(dates);
      const providerSchedule =
        await ProviderScheduleService.getByProviderIdOrThrow({
          id: ctx.provider.id,
        });

      await ctx.db.providerScheduleOverride.deleteMany({
        where: {
          date: {
            in: dates,
          },
          providerScheduleId: providerSchedule.id,
        },
      });
    }),
});
