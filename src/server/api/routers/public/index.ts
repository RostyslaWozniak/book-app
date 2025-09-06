import { createTRPCRouter } from "../../trpc";
import { publicAppointmentRouter } from "./appointment";
import { publicServicesRouter } from "./service";
import { publicUserRouter } from "./user";

export const publicRouter = createTRPCRouter({
  user: publicUserRouter,
  services: publicServicesRouter,
  appointments: publicAppointmentRouter,
});
