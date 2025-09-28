import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { publicRouter } from "./routers/public";
import { providerRouter } from "./routers/provider";
import { adminRouter } from "./routers/admin";
import { privateRouter } from "./routers/private";

export const appRouter = createTRPCRouter({
  public: publicRouter,
  private: privateRouter,
  provider: providerRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
