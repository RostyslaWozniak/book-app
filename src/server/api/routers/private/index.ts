import { createTRPCRouter } from "../../trpc";
import { privateAppointmentRouter } from "./appointment";
import { privateUserRouter } from "./user";

export const privateRouter = createTRPCRouter({
  appointment: privateAppointmentRouter,
  user: privateUserRouter,
});
