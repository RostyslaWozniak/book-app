import { groupTimeOffRanges } from "@/features/availability/lib/dates";
import { createProviderScheduleTimeOff } from "@/features/availability/lib/validation/provider-time-off";
import { ProviderScheduleService } from "@/features/provider/server/services";
import { eachDayOfInterval } from "@/lib/utils/date/each-day-of-interval";
import { providerProcedure } from "@/server/api/procedures/provider-procedure";
import { createTRPCRouter } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import z from "zod";

export const providerTimeOffRouter = createTRPCRouter({
  getAllOwn: providerProcedure.query(async ({ ctx }) => {
    const providerSchedule =
      await ProviderScheduleService.getByProviderIdOrThrow({
        id: ctx.provider.id,
      });

    const providerScheduleOverrides =
      await ctx.db.providerScheduleOverride.findMany({
        where: {
          providerScheduleId: providerSchedule.id,
          isAvailable: false,
        },
        select: {
          id: true,
          date: true,
          reason: true,
          isAvailable: true,
        },
      });

    return groupTimeOffRanges(providerScheduleOverrides);
  }),

  create: providerProcedure
    .input(createProviderScheduleTimeOff)
    .mutation(async ({ ctx, input }) => {
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
          message: `Overrides already exist for dates: ${existingOverrides
            .map((o) => format(o.date, "PPP"))
            .join(", ")}`,
        });
      }

      await ctx.db.providerScheduleOverride.createMany({
        data: dates.map((date) => ({
          providerScheduleId: providerSchedule.id,
          date,
          isAvailable: false,
          reason: input.reason,
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
