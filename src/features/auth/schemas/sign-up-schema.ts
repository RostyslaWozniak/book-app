import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię jest zbyt długie"),
  lastName: z
    .string()
    .min(1, "Nazwisko jest wymagane")
    .max(50, "Nazwisko jest zbyt długie"),
  email: z
    .string()
    .min(1, "E-mail jest wymagany")
    .email({ message: "Nie poprawny e-mail" })
    .max(100, "E-mail jest zbyt długi"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
