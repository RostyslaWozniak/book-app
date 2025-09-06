import { appointmentActionSchema } from "@/features/appointment/lib/validation/book-appointment-form-schema";
import { publicProcedure } from "@/server/api/procedures/public-procedure";
import { TRPCError } from "@trpc/server";
import { addMinutes } from "date-fns";

export const bookAppointment = publicProcedure
  .input(appointmentActionSchema)
  .mutation(async ({ ctx, input }) => {
    const now = new Date();
    if (input.startTime < now) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Wizyta nie moze byc wczesniejsza niz dzisiaj",
      });
    }
    const service = await ctx.db.service.findUnique({
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

    const providerSchedule = await ctx.db.providerSchedule.findFirst({
      where: {
        providerProfile: {
          services: {
            some: {
              serviceId: service.id,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });
    if (providerSchedule == null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nie znaleziono dostępnych specjalistów",
      });
    }

    const startTime = input.startTime;
    const endTime = addMinutes(input.startTime, service.durationInMinutes);

    console.log({ startTime, endTime });
    // FIX OVERLAPPING
    const appointment = await ctx.db.appointment.findFirst({
      where: {
        startTime: {
          gte: startTime,
          lt: endTime,
        },
        endTime: {
          lt: startTime,
        },
      },
    });

    console.log(appointment);
    if (appointment) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Termin jest nie dostępny",
      });
    }

    await ctx.db.appointment.create({
      data: {
        contactEmail: input.contactEmail,
        contactName: input.contactName,
        contactPhone: input.contactPhone,
        serviceId: service.id,
        providerScheduleId: providerSchedule.id,
        startTime,
        endTime,
      },
    });
  });
