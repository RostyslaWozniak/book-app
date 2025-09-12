import { createTRPCRouter } from "../../trpc";
import { adminProviderRouter } from "./provider";
import { adminServiceRouter } from "./service";
import { adminUserRouter } from "./user";

export const adminRouter = createTRPCRouter({
  provider: adminProviderRouter,
  service: adminServiceRouter,
  user: adminUserRouter,
});
