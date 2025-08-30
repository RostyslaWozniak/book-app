import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { publicRouter } from "./routers/public";
import { providerRouter } from "./routers/provider";
import { adminRouter } from "./routers/admin";

export const appRouter = createTRPCRouter({
  public: publicRouter,
  provider: providerRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
