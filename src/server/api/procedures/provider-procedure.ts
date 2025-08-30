import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import { publicProcedure } from "./public-procedure";
import { getCurrentUser } from "@/features/auth/current-user";
import { db } from "@/server/db";

export const providerProcedure = publicProcedure.use(
  t.middleware(async ({ next, ctx }) => {
    const user = await getCurrentUser();
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    const provider = await db.providerProfile.findUnique({
      where: {
        userId: user?.id,
        user: {
          roles: {
            has: "PROVIDER",
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!provider) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Brak uprawnien",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user,
        provider,
      },
    });
  }),
);
