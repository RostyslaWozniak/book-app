import z from "zod";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";
import { db } from "@/server/db";
import {
  createProviderAvailabilitySchema,
  updateProviderAvailabilitySchema,
} from "@/features/availability/lib/validation/provider-schedule-availability";
import { TRPCError } from "@trpc/server";
import {
  availabilityTimeToInt,
  availabilityTimeToString,
} from "@/features/availability/lib/dates";
import {
  calculteAvailabilityTimeToCurrentTimezone,
  calculteAvailabilityTimeToUTCTimezone,
} from "@/lib/utils/date/timezone";

export const availabilityRouter = createTRPCRouter({
  getOwnAvailabilities: providerProcedure.query(async ({ ctx }) => {
    const availabilities = await ctx.db.providerScheduleAvailability.findMany({
      where: {
        providerSchedule: {
          providerProfileId: ctx.provider.id,
        },
      },
    });
    return availabilities.map((a) => ({
      ...a,
      startTime: availabilityTimeToString(
        calculteAvailabilityTimeToCurrentTimezone(a.startTime),
      ),
      endTime: availabilityTimeToString(
        calculteAvailabilityTimeToCurrentTimezone(a.endTime),
      ),
    }));
  }),

  create: providerProcedure
    .input(createProviderAvailabilitySchema)
    .mutation(async ({ ctx, input }) => {
      const { id: providerScheduleId } = await createOrGetProviderSchedule(
        ctx.provider.id,
      );

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
      const availabilities = await db.providerScheduleAvailability.findMany({
        where: {
          providerScheduleId: providerScheduleId,
          dayOfWeek: input.dayOfWeek,
        },
        select: {
          startTime: true,
          endTime: true,
          weekType: true,
        },
      });

      const overlaps = availabilities.some((a) => {
        return (
          (a.weekType === input.weekType ||
            (input.weekType === "ALL" &&
              (a.weekType === "EVEN" || a.weekType === "ODD")) ||
            (a.weekType === "ALL" &&
              (input.weekType === "EVEN" || input.weekType === "ODD"))) &&
          availabilityTimeToInt(a.startTime) < endTimeNumber &&
          availabilityTimeToInt(a.endTime) > strartTimeNumber
        );
      });
      if (overlaps) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dostępności nakładają się jedna na drugą",
        });
      }

      await ctx.db.providerScheduleAvailability.create({
        data: {
          startTime: availabilityTimeToString(strartTimeNumber),
          endTime: availabilityTimeToString(endTimeNumber),
          dayOfWeek: input.dayOfWeek,
          weekType: input.weekType,
          providerScheduleId,
        },
      });
    }),
  update: providerProcedure
    .input(updateProviderAvailabilitySchema)
    .mutation(async ({ ctx, input }) => {
      const { id: providerScheduleId } = await createOrGetProviderSchedule(
        ctx.provider.id,
      );

      const strartTimeNumber = availabilityTimeToInt(input.startTime);
      const endTimeNumber = availabilityTimeToInt(input.endTime);

      if (strartTimeNumber >= endTimeNumber) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Strart pracy powinien być mniejszy od końca pracy",
        });
      }
      const availabilities = await db.providerScheduleAvailability.findMany({
        where: {
          id: {
            not: input.id,
          },
          providerScheduleId: providerScheduleId,
          dayOfWeek: input.dayOfWeek,
        },
        select: {
          startTime: true,
          endTime: true,
          weekType: true,
        },
      });

      const overlaps = availabilities.some((a) => {
        return (
          (a.weekType === input.weekType ||
            (input.weekType === "ALL" &&
              (a.weekType === "EVEN" || a.weekType === "ODD")) ||
            (a.weekType === "ALL" &&
              (input.weekType === "EVEN" || input.weekType === "ODD"))) &&
          availabilityTimeToInt(a.startTime) < endTimeNumber &&
          availabilityTimeToInt(a.endTime) > strartTimeNumber
        );
      });
      if (overlaps) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dostępności nakładają się jedna na drugą",
        });
      }

      await ctx.db.providerScheduleAvailability.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          providerScheduleId,
        },
      });
    }),

  delete: providerProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: providerScheduleAvailabilityId }) => {
      await ctx.db.providerScheduleAvailability.delete({
        where: {
          id: providerScheduleAvailabilityId,
          providerSchedule: {
            providerProfileId: ctx.provider.id,
          },
        },
      });
    }),
});

async function createOrGetProviderSchedule(
  providerProfileId: string,
): Promise<{ id: string }> {
  const existingProviderSchedule = await db.providerSchedule.findUnique({
    where: {
      providerProfileId: providerProfileId,
    },
    select: {
      id: true,
    },
  });
  if (!existingProviderSchedule) {
    const newProviderSchedule = await db.providerSchedule.create({
      data: {
        providerProfileId: providerProfileId,
      },
      select: {
        id: true,
      },
    });
    return newProviderSchedule;
  }
  return existingProviderSchedule;
}
