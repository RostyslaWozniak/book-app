import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail jest wymagany")
    .email({ message: "Nie poprawny e-mail" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
