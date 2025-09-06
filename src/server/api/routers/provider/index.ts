import { createTRPCRouter } from "../../trpc";
import { availabilityRouter } from "./availability";
import { providerProfileRouter } from "./profile";
import { providerServiceRouter } from "./service";

export const providerRouter = createTRPCRouter({
  availability: availabilityRouter,
  profile: providerProfileRouter,
  service: providerServiceRouter,
});
