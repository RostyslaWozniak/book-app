import { TRPCError } from "@trpc/server";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";
import z from "zod";
import { $Enums } from "@prisma/client";
import type { CalendarAppointment } from "@/features/schedule-calendar/types";
import { tryCatch } from "@/lib/utils/try-catch";

export const providerAppointmentRouter = createTRPCRouter({
  getAllOwn: providerProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        statuses: z.array(z.nativeEnum($Enums.AppointmentStatus)).optional(),
      }),
    )
    .query(async ({ ctx }): Promise<CalendarAppointment[]> => {
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
        select: {
          id: true,
          startTime: true,
          endTime: true,
          status: true,
          contactEmail: true,
          contactName: true,
          contactPhone: true,
          createdAt: true,
          service: {
            select: {
              name: true,
            },
          },
          providerSchedule: {
            select: {
              providerProfile: {
                select: {
                  user: {
                    select: {
                      id: true,
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
        id: a.id,
        startTime: a.startTime,
        endTime: a.endTime,
        status: a.status,
        contactName: a.contactName,
        contactEmail: a.contactEmail,
        contactPhone: a.contactPhone,
        createdAt: a.createdAt,
        service: {
          name: a.service.name,
        },
        user: {
          id: a.providerSchedule.providerProfile.user.id,
          firstName: a.providerSchedule.providerProfile.user.firstName,
          lastName: a.providerSchedule.providerProfile.user.lastName,
          phoneNumber: a.providerSchedule.providerProfile.user.phoneNumber,
          photo: a.providerSchedule.providerProfile.user.photo,
        },
      }));
    }),

  updateStatus: providerProcedure
    .input(
      z.object({
        appointmentId: z.string().uuid(),
        status: z.enum(
          [
            $Enums.AppointmentStatus.CONFIRMED,
            $Enums.AppointmentStatus.COMPLETED,
          ],
          { message: "Nie prawidłowy status" },
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingAppointment = await ctx.db.appointment.findUnique({
        where: {
          id: input.appointmentId,
        },
        select: {
          status: true,
        },
      });
      if (!existingAppointment) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Nie znaleziono takiej wizyty",
        });
      }

      if (existingAppointment.status === input.status) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            existingAppointment.status === "CONFIRMED"
              ? "Ta wizyta już została zatwierdzona. Odsweż strone."
              : "Ta wizyta już została zakończona. Odsweż strone.",
        });
      }

      const { error } = await tryCatch(
        ctx.db.appointment.update({
          where: {
            id: input.appointmentId,
          },
          data: {
            status: input.status,
          },
        }),
      );

      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak. Spróbuj ponownie.",
        });
      }
    }),
});
