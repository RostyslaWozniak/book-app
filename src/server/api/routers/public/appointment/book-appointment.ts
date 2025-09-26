import { appointmentActionSchema } from "@/features/appointment/lib/validation/book-appointment-form-schema";
import { getCurrentUser } from "@/features/auth/current-user";
import { getWeekDay, getWeekType } from "@/lib/utils/date";
import { publicProcedure } from "@/server/api/procedures/public-procedure";
import { TRPCError } from "@trpc/server";
import { addMinutes } from "date-fns";

export const bookAppointment = publicProcedure
  .input(appointmentActionSchema.omit({ date: true }))
  .mutation(async ({ ctx, input }) => {
    const now = new Date();
    if (input.startTime < now) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Wizyta nie moze byc wczesniejsza niz dzisiaj",
      });
    }

    const user = await getCurrentUser();

    await ctx.db.$transaction(async (tx) => {
      const service = await tx.service.findUnique({
        where: { id: input.serviceId },
        select: {
          id: true,
          durationInMinutes: true,
        },
      });

      if (service == null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Nie znaleziono usługi",
        });
      }
      const dayOfWeek = getWeekDay(input.startTime);
      const weekType = getWeekType(input.startTime);

      const providerSchedules = await tx.providerSchedule.findMany({
        where: {
          providerProfile: {
            services: {
              some: {
                serviceId: service.id,
              },
            },
          },
          availabilities: {
            some: {
              weekType: {
                in: ["ALL", weekType],
              },
              dayOfWeek,
            },
          },
        },
        select: {
          id: true,
        },
        orderBy: {
          appointments: {
            _count: "asc",
          },
        },
      });

      if (providerSchedules.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Nie znaleziono dostępnych specjalistów",
        });
      }

      const startTime = input.startTime;
      const endTime = addMinutes(input.startTime, service.durationInMinutes);

      const appointments = await tx.appointment.findMany({
        where: {
          providerScheduleId: {
            in: providerSchedules.map(({ id }) => id),
          },
          OR: [
            {
              startTime: {
                gte: startTime,
                lt: endTime,
              },
            },
            {
              endTime: {
                gt: startTime,
                lt: endTime,
              },
            },
          ],
        },
      });

      const filteredSchedles = providerSchedules.filter((ps) => {
        return appointments.every((app) => app.providerScheduleId !== ps.id);
      });
      if (filteredSchedles.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Termin nie jest dostępny",
        });
      }

      await tx.appointment
        .create({
          data: {
            contactEmail: input.contactEmail,
            contactName: input.contactName,
            contactPhone: input.contactPhone,
            serviceId: service.id,
            providerScheduleId: filteredSchedles[0]!.id,
            startTime,
            endTime,
            userId: user?.id ?? null,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Termin jest nie dostępny",
          });
        });
    });
  });
