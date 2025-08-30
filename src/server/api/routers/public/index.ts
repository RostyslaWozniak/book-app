import { createTRPCRouter } from "../../trpc";
import { publicUserRouter } from "./user";

export const publicRouter = createTRPCRouter({
  user: publicUserRouter,
});
