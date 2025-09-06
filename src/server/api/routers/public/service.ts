import z from "zod";
import { publicProcedure } from "../../procedures/public-procedure";
import { createTRPCRouter } from "../../trpc";

export const publicServicesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          take: z.number().optional(),
          skip: z.number().optional(),
          search: z.string().optional(),
          orderBy: z
            .enum(["name", "updatedAt", "durationInMinutes"])
            .optional(),
          order: z.enum(["asc", "desc"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input, ctx }) => {
      const { take, skip, search, orderBy, order } = {
        take: 9,
        skip: 0,
        orderBy: "updatedAt",
        order: "desc",
        ...input,
      };

      return ctx.db.service.findMany({
        where: {
          isActive: true,
          providerServices: {
            some: {
              providerId: {
                not: undefined,
              },
            },
          },
          ...(search && {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }),
        },
        orderBy: {
          [orderBy]: order,
        },
        select: {
          id: true,
          name: true,
          description: true,
          durationInMinutes: true,
          slug: true,
        },
        take,
        skip,
      });
    }),

  getOneBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.service.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),
});
