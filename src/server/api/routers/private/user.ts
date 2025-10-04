import type { ClientProfile } from "@/features/profile/types/client-profile.type";
import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { editProfileSchema } from "@/features/profile/lib/validation/edit-profile-schema";

export const privateUserRouter = createTRPCRouter({
  getProfile: privateProcedure.query(
    async ({ ctx }): Promise<ClientProfile> => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          photo: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono uzytkownika",
        });
      }

      return user;
    },
  ),

  updateProfile: privateProcedure
    .input(editProfileSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber,
        },
      });
    }),
});
