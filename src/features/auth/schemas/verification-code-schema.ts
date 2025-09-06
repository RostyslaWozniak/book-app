import { z } from "zod";

export const verificationCodeSchema = z.object({
  code: z.string().trim().length(6),
});

export type VerificationCodeSchema = z.infer<typeof verificationCodeSchema>;

export const redisVerificationSchema = z.object({
  verificationCode: z.string().length(6),
  userId: z.string().uuid(),
});
