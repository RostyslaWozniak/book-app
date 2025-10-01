import z from "zod";
import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserService } from "@/features/user/server/services/user.service";
import { $Enums } from "@prisma/client";
import { availabilityTimeToString } from "@/features/availability/lib/dates";
import { calculteAvailabilityTimeToCurrentTimezone } from "@/lib/utils/date/timezone";
import type { CalendarAppointment } from "@/features/schedule-calendar/types";

export const adminProviderRouter = createTRPCRouter({
  getAvailabilities: adminProcedure
    .input(z.object({ providerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const providerSchedule = await ctx.db.providerSchedule.findUnique({
        where: { providerProfileId: input.providerId },
      });

      if (!providerSchedule) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono grafiku specjalisty",
        });
      }

      const availabilities = await ctx.db.providerScheduleAvailability.findMany(
        {
          where: {
            providerScheduleId: providerSchedule.id,
          },
          select: {
            id: true,
            providerScheduleId: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            weekType: true,
          },
        },
      );

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

  getProfileBySlug: adminProcedure
    .input(z.string())
    .query(async ({ input: providerSlug }) => {
      return await UserService.getProviderBySlug(providerSlug);
    }),

  getAppointmentsByProviderId: adminProcedure
    .input(
      z.object({
        providerId: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        statuses: z.array(z.nativeEnum($Enums.AppointmentStatus)).optional(),
      }),
    )
    .query(async ({ ctx, input }): Promise<CalendarAppointment[]> => {
      const providerSchedule = await ctx.db.providerSchedule.findFirst({
        where: {
          providerProfileId: input.providerId,
        },
        select: {
          id: true,
        },
      });
      if (!providerSchedule) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono grafiku specjalisty",
        });
      }

      const appointments = await ctx.db.appointment.findMany({
        where: {
          providerScheduleId: providerSchedule.id,
          OR: [
            {
              startTime: {
                gte: input.startDate,
                lte: input.endDate,
              },
            },
            {
              endTime: {
                gte: input.startDate,
                lte: input.endDate,
              },
            },
          ],
          status: {
            in: input.statuses,
          },
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
});
