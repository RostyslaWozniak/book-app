import z from "zod";
import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { $Enums } from "@prisma/client";

export const profileAppointmentRouter = createTRPCRouter({
  getAllOwn: privateProcedure
    .input(
      z
        .object({
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          statuses: z.array(z.nativeEnum($Enums.AppointmentStatus)).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const appointments = await ctx.db.appointment.findMany({
        where: {
          userId: ctx.user.id,
          ...(input && {
            startTime: {
              gte: input.startDate,
            },
            endTime: {
              lte: input.endDate,
            },
            status: {
              in: input.statuses,
            },
          }),
        },
        include: {
          service: true,
          providerSchedule: {
            select: {
              providerProfile: {
                select: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                      phoneNumber: true,
                      photo: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return appointments.map((a) => ({
        ...a,
        provider: a.providerSchedule.providerProfile.user,
      }));
    }),
});
