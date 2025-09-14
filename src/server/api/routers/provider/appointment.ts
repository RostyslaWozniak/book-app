import { TRPCError } from "@trpc/server";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";
import z from "zod";
import { $Enums } from "@prisma/client";

export const providerAppointmentRouter = createTRPCRouter({
  getAllOwn: providerProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        statuses: z.array(z.nativeEnum($Enums.AppointmentStatus)).optional(),
      }),
    )
    .query(async ({ ctx }) => {
      const providerSchedule = await ctx.db.providerSchedule.findUnique({
        where: {
          providerProfileId: ctx.provider.id,
        },
        select: {
          id: true,
        },
      });

      if (!providerSchedule) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono grafika specjalisty",
        });
      }
      const appointments = await ctx.db.appointment.findMany({
        where: {
          providerScheduleId: providerSchedule.id,
        },
      });

      return appointments;
    }),
});
