import { phoneNumberValidation } from "@/lib/validation-common";
import z from "zod";

export const providerProfileSchema = z.object({
  fistName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: phoneNumberValidation,
  slug: z.string().min(2).max(50),
  description: z.string().min(2).max(255).optional(),
});

export type ProviderProfileSchema = z.infer<typeof providerProfileSchema>;
