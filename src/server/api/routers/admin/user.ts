import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { UserService } from "@/features/user/server/services/user.service";
import {
  rolesSchema,
  rolesSelectSchema,
} from "@/features/user/lib/validation/roles-schema";

export const adminUserRouter = createTRPCRouter({
  getAllByRoles: adminProcedure.input(rolesSchema).query(async ({ input }) => {
    return await UserService.getAllByRoles(input);
  }),

  changeRoles: adminProcedure
    .input(rolesSelectSchema)
    .mutation(async ({ input }) => {
      return await UserService.changeRoles(input);
    }),
});
