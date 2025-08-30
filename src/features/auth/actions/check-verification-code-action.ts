"use server";

import { redisClient } from "@/lib/services/redis";
import {
  verificationCodeSchema,
  type VerificationCodeSchema,
} from "../schemas/verification-code-schema";
import z from "zod";
import { createUserSession } from "../core/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  EMAIL_VERIFICATION_CODE_TTL_IN_MIN,
  REDIS_EMAIL_VERIFICATION_KEY,
} from "../constants";
import { $Enums } from "@prisma/client";

export async function checkVerificationCodeAction(
  unsafeData: VerificationCodeSchema & { verificationToken: string },
) {
  const { data: parsedCode, error: parseError } = verificationCodeSchema
    .extend({ verificationToken: z.string().uuid() })
    .safeParse(unsafeData);

  if (parseError) {
    return "Invalid input";
  }
  const rawRedisData = await redisClient.get(
    `${REDIS_EMAIL_VERIFICATION_KEY}:${parsedCode.verificationToken}`,
  );

  const { data: parsedRedisData, success } = z
    .object({
      verificationCode: z.string().length(6),
      id: z.string().uuid(),
      email: z.string().email(),
      roles: z.array(
        z.enum([
          $Enums.Roles.ADMIN,
          $Enums.Roles.CLIENT,
          $Enums.Roles.PROVIDER,
        ]),
      ),
    })
    .safeParse(rawRedisData);

  if (!success || !parsedRedisData) {
    redirect(
      `/login?error=Your verification code has expired. The TTL is ${EMAIL_VERIFICATION_CODE_TTL_IN_MIN} minutes. Please try again.`,
    );
  }

  if (parsedRedisData.verificationCode !== parsedCode.code) {
    return "Invalid verification code";
  }

  await createUserSession(
    { id: parsedRedisData.id, roles: parsedRedisData.roles },
    await cookies(),
  );
  const redirectPath = parsedRedisData.roles.includes("ADMIN")
    ? "/admin"
    : parsedRedisData.roles.includes("PROVIDER")
      ? "/provider"
      : "/profile";
  redirect(redirectPath);
}
