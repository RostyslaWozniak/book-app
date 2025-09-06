import { getWeekDay, getWeekType } from "@/lib/utils/date";
import { publicProcedure } from "@/server/api/procedures/public-procedure";
import { TRPCError } from "@trpc/server";
import {
  addMinutes,
  areIntervalsOverlapping,
  eachMinuteOfInterval,
  endOfDay,
  isBefore,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import z from "zod";
import { timeStringToDate } from "@/features/appointment/lib/helpers";

const SLOT_STEP_IN_MIN = 15;

export const getAvailableTimeSlotsForDay = publicProcedure
  .input(
    z.object({
      serviceId: z.string(),
      day: z.date(),
      providerSlug: z.string().optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { serviceId, day, providerSlug } = input;

    // Validate date is not in the past
    if (isBefore(day, startOfDay(new Date()))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot get slots for past dates",
      });
    }

    const service = await ctx.db.service.findUnique({
      where: {
        id: serviceId,

        ...(providerSlug && {
          providerServices: {
            some: {
              provider: {
                slug: providerSlug,
              },
            },
          },
        }),
      },
      select: {
        id: true,
        durationInMinutes: true,
      },
    });

    if (!service) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nie znaleziono usługi",
      });
    }

    const dayOfWeek = getWeekDay(day);
    const weekType = getWeekType(day);

    const startOfTheDay = startOfDay(day);
    const endOfTheDay = endOfDay(day);

    const timesInOrder = eachMinuteOfInterval(
      { start: startOfTheDay, end: endOfTheDay },
      { step: SLOT_STEP_IN_MIN },
    );

    if (!timesInOrder.length) return [];

    const start = timesInOrder[0];
    const end = timesInOrder.at(-1);

    if (start == null || end == null) return [];

    const availabilities = await ctx.db.providerScheduleAvailability.findMany({
      where: {
        dayOfWeek: dayOfWeek,
        weekType: {
          in: [weekType, "ALL"],
        },
        providerSchedule: {
          providerProfile: {
            services: {
              some: {
                serviceId: service.id,
              },
            },
          },
        },
      },
    });

    if (availabilities.length === 0) return [];

    const appointments = await ctx.db.appointment.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
        startTime: {
          gte: start,
          lte: end,
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });
    // console.log(timesInOrder);
    return timesInOrder.filter((intervalDate) => {
      const appointmentInterval = {
        start: intervalDate,
        end: addMinutes(intervalDate, service.durationInMinutes),
      };

      return availabilities.some((availability) => {
        const startDate = timeStringToDate(availability.startTime, day);
        const endDate = timeStringToDate(availability.endTime, day);
        return (
          appointments.every(({ startTime, endTime }) => {
            return !areIntervalsOverlapping(
              { start: startTime, end: endTime },
              appointmentInterval,
            );
          }) &&
          isWithinInterval(appointmentInterval.start, {
            start: startDate,
            end: endDate,
          }) &&
          isWithinInterval(appointmentInterval.end, {
            start: startDate,
            end: endDate,
          })
        );
      });
    });
  });
