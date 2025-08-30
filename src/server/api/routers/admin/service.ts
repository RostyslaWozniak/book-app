import z from "zod";
import { ServiceService } from "@/features/service/server/services/service.service";
import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { createServiceSchema } from "@/features/service/lib/validation/create-service-schema";
import { updateServiceSchema } from "@/features/service/lib/validation/update-service-schema";

export const adminServiceRouter = createTRPCRouter({
  getAll: adminProcedure.query(async () => {
    return ServiceService.getAll();
  }),

  getById: adminProcedure.input(z.string()).query(async ({ input: id }) => {
    return await ServiceService.getById(id);
  }),

  create: adminProcedure
    .input(createServiceSchema)
    .mutation(async ({ input }) => {
      return await ServiceService.create(input);
    }),

  update: adminProcedure
    .input(updateServiceSchema)
    .mutation(async ({ input }) => {
      return await ServiceService.update(input);
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ input: id }) => {
    return await ServiceService.delete(id);
  }),
});
