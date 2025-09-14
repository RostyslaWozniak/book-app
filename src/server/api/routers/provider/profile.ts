import { TRPCError } from "@trpc/server";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";
import { providerProfileSchema } from "@/features/provider/lib/validation/provider-profile-schema";
import { tryCatch } from "@/lib/utils/try-catch";

export const providerProfileRouter = createTRPCRouter({
  getProfile: providerProcedure.query(async ({ ctx }) => {
    const providerProfileData = await ctx.db.providerProfile.findUnique({
      where: {
        id: ctx.provider.id,
      },
      select: {
        description: true,
        slug: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            photo: true,
            createdAt: true,
          },
        },
      },
    });
    if (!providerProfileData) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
      });
    }

    return {
      ...providerProfileData.user,
      description: providerProfileData.description,
      slug: providerProfileData.slug,
    };
  }),

  update: providerProcedure
    .input(providerProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const existingProviderSlug = await ctx.db.providerProfile.findUnique({
        where: {
          slug: input.slug,
          NOT: {
            id: ctx.provider.id,
          },
        },
      });

      if (existingProviderSlug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Specjalista z takim url już istnieje!",
        });
      }
      const { error } = await tryCatch(
        ctx.db.$transaction(async (tx) => {
          await tx.user.update({
            where: {
              id: ctx.user.id,
            },
            data: {
              firstName: input.fistName,
              lastName: input.lastName,
              phoneNumber: input.phoneNumber,
            },
          });

          await tx.providerProfile.update({
            where: {
              id: ctx.provider.id,
            },
            data: {
              description: input.description,
              slug: input.slug,
            },
          });
        }),
      );

      if (error) {
        console.log(error.message);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak. Spróbuj ponownie.",
        });
      }
    }),
});
