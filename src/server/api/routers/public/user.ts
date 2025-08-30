import { getCurrentUser } from "@/features/auth/current-user";
import { publicProcedure } from "../../procedures/public-procedure";
import { createTRPCRouter } from "../../trpc";
import z from "zod";
import { signUpSchema } from "@/features/auth/schemas/sign-up-schema";

export const publicUserRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(async () => {
    const user = await getCurrentUser({ withFullUser: true });
    return user;
  }),

  findUniqueByEmail: publicProcedure
    .input(z.string().email())
    .query(async ({ ctx, input: email }) => {
      const user = ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    }),

  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input: user }) => {
      const newUser = ctx.db.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: ["CLIENT"],
        },
        select: {
          id: true,
          email: true,
          roles: true,
        },
      });
      return newUser;
    }),
});
