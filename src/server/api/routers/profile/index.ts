import { createTRPCRouter } from "../../trpc";
import { profileAppointmentRouter } from "./appointment";

export const profileRouter = createTRPCRouter({
  appointment: profileAppointmentRouter,
});
