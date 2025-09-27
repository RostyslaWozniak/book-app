import z from "zod";
import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import type { ProfileAppointemnt } from "@/features/appointment/types/appointment.type";

const getAppointmentsSchema = z
  .object({
    take: z.number().optional().default(9),
    skip: z.number().optional().default(0),
  })
  .optional()
  .default({
    take: 9,
    skip: 0,
  });

type AppointmentsReturnType = Promise<{
  appointments: ProfileAppointemnt[];
  appointmentsCount: number;
}>;

export const profileAppointmentRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(getAppointmentsSchema)
    .query(async ({ ctx, input }): AppointmentsReturnType => {
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
      };

      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });

      return {
        appointments: appointments.map((a) => ({
          ...a,
          provider: {
            slug: a.providerSchedule.providerProfile.slug,
            ...a.providerSchedule.providerProfile.user,
          },
        })),
        appointmentsCount,
      };
    }),

  getActive: privateProcedure
    .input(getAppointmentsSchema)
    .query(async ({ ctx, input }): AppointmentsReturnType => {
      const now = new Date();
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
        startTime: {
          gte: now,
        },
        status: {
          not: "CANCELLED",
        },
      };

      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });

      return {
        appointments: appointments.map((a) => ({
          ...a,
          provider: {
            slug: a.providerSchedule.providerProfile.slug,
            ...a.providerSchedule.providerProfile.user,
          },
        })),
        appointmentsCount,
      };
    }),

  getFinished: privateProcedure
    .input(getAppointmentsSchema)
    .query(async ({ ctx, input }): AppointmentsReturnType => {
      const now = new Date();
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
        startTime: {
          lt: now,
        },
        status: {
          equals: "COMPLETED",
        },
      };

      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          startTime: "desc",
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });

      return {
        appointments: appointments.map((a) => ({
          ...a,
          provider: {
            slug: a.providerSchedule.providerProfile.slug,
            ...a.providerSchedule.providerProfile.user,
          },
        })),
        appointmentsCount,
      };
    }),
});

function getAppointmentsCount(where: Prisma.AppointmentWhereInput) {
  return db.appointment.count({
    where,
  });
}

const GET_APPOINTMENT_SELECT_FIELDS =
  Prisma.validator<Prisma.AppointmentSelect>()({
    id: true,
    startTime: true,
    endTime: true,
    status: true,

    service: {
      select: {
        id: true,
        slug: true,
        name: true,
      },
    },
    providerSchedule: {
      select: {
        providerProfile: {
          select: {
            slug: true,
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
  });
