import { groupHolidayRanges } from "@/features/availability/lib/dates";
import {
  createProviderScheduleHolidays,
  updateProviderScheduleHolidays,
} from "@/features/availability/lib/validation/provider-holidays";

import { eachDayOfInterval } from "@/lib/utils/date/each-day-of-interval";
import { providerProcedure } from "@/server/api/procedures/provider-procedure";
import { createTRPCRouter } from "@/server/api/trpc";
import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import z from "zod";

export const providerHolidaysRouter = createTRPCRouter({
  getAllOwn: providerProcedure.query(async ({ ctx }) => {
    const providerScheduleId = await getProviderScheduleOrThrow(
      ctx.db,
      ctx.provider.id,
    );

    const providerScheduleOverrides =
      await ctx.db.providerScheduleOverride.findMany({
        where: {
          providerScheduleId,
          isAvailable: false,
        },
        select: {
          id: true,
          date: true,
          reason: true,
          isAvailable: true,
        },
      });

    return groupHolidayRanges(providerScheduleOverrides);
  }),

  create: providerProcedure
    .input(createProviderScheduleHolidays)
    .mutation(async ({ ctx, input }) => {
      const dates = eachDayOfInterval({
        start: new Date(input.startDate.setUTCHours(2, 0, 0, 0)),
        end: new Date(input.endDate.setUTCHours(2, 0, 0, 0)),
      });

      const providerScheduleId = await getProviderScheduleOrThrow(
        ctx.db,
        ctx.provider.id,
      );

      const existingOverrides = await ctx.db.providerScheduleOverride.findMany({
        where: {
          providerScheduleId,
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
          providerScheduleId,
          date,
          isAvailable: false,
          reason: input.reason,
        })),
      });
    }),

  update: providerProcedure
    .input(updateProviderScheduleHolidays)
    .mutation(async ({ ctx, input }) => {
      const dates = eachDayOfInterval({
        start: new Date(input.startDate.setUTCHours(2, 0, 0, 0)),
        end: new Date(input.endDate.setUTCHours(2, 0, 0, 0)),
      });
      const providerScheduleId = await getProviderScheduleOrThrow(
        ctx.db,
        ctx.provider.id,
      );

      // await ctx.db.providerScheduleOverride.updateMany({
      //   where: {
      //     date: {
      //       in: dates
      //     },
      //     reason: input.reason,
      //     providerScheduleId,

      //   }
      // })
    }),

  delete: providerProcedure
    .input(z.object({ overrideId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input);
    }),
});

async function getProviderScheduleOrThrow(
  db: PrismaClient,
  providerId: string,
) {
  const providerSchedule = await db.providerSchedule.findUnique({
    where: {
      providerProfileId: providerId,
    },
    select: {
      id: true,
    },
  });
  if (!providerSchedule) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Nie znaleziono grafiku specjalisty.",
    });
  }
  return providerSchedule.id;
}
