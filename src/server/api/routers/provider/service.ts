import { ServiceService } from "@/features/service/server/services/service.service";
import { providerProcedure } from "../../procedures/provider-procedure";
import { createTRPCRouter } from "../../trpc";
import { ProviderSeviceService } from "@/features/provider/server/services/provider-service.service";
import z from "zod";

export const providerServiceRouter = createTRPCRouter({
  getAll: providerProcedure.query(async () => {
    return await ServiceService.getAll();
  }),
  getAllOwn: providerProcedure.query(async ({ ctx }) => {
    return await ProviderSeviceService.getAllOwn(ctx.provider.id);
  }),

  mutateList: providerProcedure
    .input(z.array(z.string().uuid()))
    .mutation(async ({ input, ctx }) => {
      return await ProviderSeviceService.mutateList(ctx.provider.id, input);
    }),
});
