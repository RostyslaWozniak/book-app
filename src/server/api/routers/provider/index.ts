import { createTRPCRouter } from "../../trpc";
import { availabilityRouter } from "./availability";

export const providerRouter = createTRPCRouter({
  availability: availabilityRouter,
});
