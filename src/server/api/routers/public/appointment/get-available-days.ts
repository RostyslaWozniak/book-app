import { AvailabilityProcessor } from "@/features/availability/lib/availability-processor";
import { getStartDate } from "@/lib/utils/date";
import { publicProcedure } from "@/server/api/procedures/public-procedure";
import { TRPCError } from "@trpc/server";
import { lastDayOfMonth } from "date-fns";
import z from "zod";

export const getAvailableDays = publicProcedure
  .input(
    z.object({
      serviceId: z.string(),
      providerSlug: z.string().optional(),
      startDate: z.date(),
    }),
  )
  .query(async ({ ctx, input }) => {
    console.log(input);
    // Get date range
    const startDate = getStartDate(input.startDate);
    const endDate = lastDayOfMonth(startDate);

    // Get service duration
    const existingService = await ctx.db.service.findUnique({
      where: { id: input.serviceId },
      select: { durationInMinutes: true },
    });

    if (!existingService) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie znaleziono usługi",
      });
    }

    // Get all providers that offer this service with their schedules
    const availableProviders = await ctx.db.providerService.findMany({
      where: {
        serviceId: input.serviceId,

        ...(input.providerSlug && {
          provider: {
            slug: input.providerSlug,
          },
        }),
      },
      select: {
        provider: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            id: true,
            providerSchedule: {
              select: {
                availabilities: true,
                providerScheduleOverride: {
                  where: {
                    date: {
                      gte: startDate,
                      lte: endDate,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (availableProviders.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie znaleziono dostępnych serwisantów",
      });
    }
    // Transform vet services into a more convenient format
    const providerAvailabilities = availableProviders
      .filter((ps) => ps.provider.providerSchedule)
      .map((ps) => ({
        providerId: ps.provider.id,
        providerName:
          ps.provider.user.firstName + " " + ps.provider.user.lastName,
        availabilities: ps.provider.providerSchedule.flatMap(
          (schedule) => schedule.availabilities,
        ),
        overrides: ps.provider.providerSchedule.flatMap(
          (schedule) => schedule.providerScheduleOverride,
        ),
      }));
    const availabilitiesProcessor = new AvailabilityProcessor({
      startDate,
      endDate,
      providerAvailabilities,
      serviceDurationInMinutes: existingService.durationInMinutes,
    });
    return availabilitiesProcessor.getAvailableDays();
  });
