import { createTRPCRouter } from "../../trpc";
import { adminServiceRouter } from "./service";
import { adminUserRouter } from "./user";

export const adminRouter = createTRPCRouter({
  service: adminServiceRouter,
  user: adminUserRouter,
});
