import { getCurrentUser } from "@/features/auth/current-user";
import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import { publicProcedure } from "./public-procedure";

export const adminProcedure = publicProcedure.use(
  t.middleware(async ({ next, ctx }) => {
    const user = await getCurrentUser();
    if (!user?.roles.includes("ADMIN")) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Brak uprawnien",
      });
    }
    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }),
);
