import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { publicRouter } from "./routers/public";
import { providerRouter } from "./routers/provider";

export const appRouter = createTRPCRouter({
  public: publicRouter,
  provider: providerRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
