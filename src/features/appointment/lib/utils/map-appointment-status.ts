import type { $Enums } from "@prisma/client";

export function mapAppointmentStatus(status: $Enums.AppointmentStatus) {
  switch (status) {
    case "COMPLETED":
      return {
        color: {
          default: "bg-completed ",
          secondary: "bg-completed/5 backdrop-blur-md border-completed",
        },
        label: "Zakończona",
      };
    case "PENDING":
      return {
        color: {
          default: "bg-pending",
          secondary: "bg-pending/5 backdrop-blur-md border-pending ",
        },
        label: "Oczekuje",
      };
    case "CONFIRMED":
      return {
        color: {
          default: "bg-confirmed",
          secondary: "bg-confirmed/5 backdrop-blur-md border-confirmed",
        },

        label: "Potwierdzona",
      };
    case "CANCELLED":
      return {
        color: {
          default: "bg-cancelled",
          secondary: "bg-cancelled/5 backdrop-blur-md   border-cancelled",
        },
        label: "Anulowana",
      };
    default:
      return status;
  }
}
