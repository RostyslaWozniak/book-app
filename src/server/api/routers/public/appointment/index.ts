import { createTRPCRouter } from "../../../trpc";
import { bookAppointment } from "./book-appointment";
import { getAvailableDays } from "./get-available-days";
import { getAvailableTimeSlotsForDay } from "./get-available-time-slots-for-day";

export const publicAppointmentRouter = createTRPCRouter({
  getAvailableDays,
  getAvailableTimeSlotsForDay,
  book: bookAppointment,
});
