import { getCurrentUser } from "@/features/auth/current-user";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";

export const providerUserRouter = createTRPCRouter({
  getCurrent: providerProcedure.query(async ({ ctx }) => {
    return getCurrentUser({ withFullUser: true });
  }),
});
