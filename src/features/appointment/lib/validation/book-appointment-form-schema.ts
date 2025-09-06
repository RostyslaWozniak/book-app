import { z } from "zod";

const appointmentSchemaBase = z.object({
  startTime: z.date({ message: "Wybierz czas" }),
  contactEmail: z
    .string()
    .min(1, "E-mail jest wymagany")
    .email("Nie poprawny email"),
  contactName: z.string().min(1, "Imię jest wymagane"),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

export const appointmentFromSchema = z
  .object({
    date: z.date({ message: "Wybierz datę" }),
  })
  .merge(appointmentSchemaBase);

export const appointmentActionSchema = z
  .object({
    serviceId: z.string().min(1, "Required"),
  })
  .merge(appointmentFromSchema);

export type AppointmentFormSchema = z.infer<typeof appointmentFromSchema>;
export type AppointmentActionSchema = z.infer<typeof appointmentActionSchema>;
