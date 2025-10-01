import { createTRPCRouter } from "../../trpc";
import { providerAppointmentRouter } from "./appointment";
import { availabilityRouter } from "./availability";
import { providerProfileRouter } from "./profile";
import { providerServiceRouter } from "./service";
import { providerUserRouter } from "./user";

export const providerRouter = createTRPCRouter({
  availability: availabilityRouter,
  appointment: providerAppointmentRouter,
  profile: providerProfileRouter,
  service: providerServiceRouter,
  user: providerUserRouter,
});
