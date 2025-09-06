import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { UserService } from "@/features/user/server/services/user.service";
import {
  rolesSchema,
  rolesSelectSchema,
} from "@/features/user/lib/validation/roles-schema";
import z from "zod";
import { ProviderProfileService } from "@/features/provider/server/services/provider-profile.service";

export const adminUserRouter = createTRPCRouter({
  getAllByRoles: adminProcedure.input(rolesSchema).query(async ({ input }) => {
    return await UserService.getAllByRoles(input);
  }),
  getAllVerifiedByRoles: adminProcedure
    .input(rolesSchema)
    .query(async ({ input }) => {
      return await UserService.getAllVerifiedByRoles(input);
    }),

  getAllEmployees: adminProcedure
    .input(rolesSchema)
    .query(async ({ input }) => {
      return await ProviderProfileService.getAll(input);
    }),

  getEmployeeByProviderSlug: adminProcedure
    .input(z.string())
    .query(async ({ input: providerSlug }) => {
      return await UserService.getEmployeeByProviderSlug(providerSlug);
    }),

  changeRoles: adminProcedure
    .input(rolesSelectSchema)
    .mutation(async ({ input }) => {
      return await UserService.changeRoles(input);
    }),
});
