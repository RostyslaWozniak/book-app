import { z } from "zod";

export const verificationCodeSchema = z.object({
  code: z.string().trim().length(6),
});

export type VerificationCodeSchema = z.infer<typeof verificationCodeSchema>;
