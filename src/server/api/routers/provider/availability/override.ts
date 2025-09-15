import {
  serverCreateProviderScheduleOverride,
  updateProviderScheduleOverride,
} from "@/features/availability/lib/validation/provider-schedule-override";
import { providerProcedure } from "@/server/api/procedures/provider-procedure";
import { createTRPCRouter } from "@/server/api/trpc";
import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import z from "zod";

export const providerAvailabilityOverrideRouter = createTRPCRouter({
  getAllOwn: providerProcedure
    .input(z.object({ mode: z.enum(["holidays", "overrides"]) }))
    .query(async ({ ctx, input }) => {
      const providerScheduleId = await getProviderScheduleOrThrow(
        ctx.db,
        ctx.provider.id,
      );

      const providerScheduleOverrides =
        await ctx.db.providerScheduleOverride.findMany({
          where: {
            providerScheduleId,
            isAvailable: input.mode === "overrides",
          },
        });

      return providerScheduleOverrides;
    }),

  create: providerProcedure
    .input(serverCreateProviderScheduleOverride)
    .mutation(async ({ ctx, input }) => {
      const providerScheduleId = await getProviderScheduleOrThrow(
        ctx.db,
        ctx.provider.id,
      );

      const existingOverrides = await ctx.db.providerScheduleOverride.findMany({
        where: {
          providerScheduleId,
          date: {
            in: input.dates,
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
        data: input.dates.map((date) => ({
          providerScheduleId,
          date,
          isAvailable: input.isAvailable,
          reason: input.reason,
          startTime: input.startTime,
          endTime: input.endTime,
        })),
      });
    }),

  update: providerProcedure
    .input(updateProviderScheduleOverride)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
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
