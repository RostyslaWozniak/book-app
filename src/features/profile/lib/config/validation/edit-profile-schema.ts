import { phoneNumberValidation } from "@/lib/validation-common";
import z from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: phoneNumberValidation,
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
