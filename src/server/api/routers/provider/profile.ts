import { TRPCError } from "@trpc/server";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";

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
});
