"use server";

import { redisClient } from "@/lib/services/redis";
import { signInSchema, type SignInSchema } from "../schemas/sign-in-schema";
import { redirect } from "next/navigation";
import {
  EMAIL_VERIFICATION_CODE_TTL_IN_SEC,
  REDIS_EMAIL_VERIFICATION_KEY,
} from "../constants";
import { generateSecureVerificationCode } from "../lib/generate-secure-verifcation-code";
import { sendVerificationCodeEmail } from "../lib/send-verification-email";
import { api } from "@/trpc/server";

export async function signInAction(
  unsafeData: SignInSchema,
): Promise<string | null> {
  // VALIDATE DATA FROM CLIENT
  const {
    data: parsedData,
    success: parseSuccess,
    error: parsedError,
  } = signInSchema.safeParse(unsafeData);

  if (!parseSuccess) {
    console.error(parsedError);
    return "Błąd walidacji";
  }
  // CHECK IF EMAIL ALLOWED
  const { email } = parsedData;

  // GENERATE TOKEN
  const verificationToken = crypto.randomUUID();
  // GENERATE CODE
  const verificationCode = generateSecureVerificationCode();
  //check if user exists, if not create one, after return user
  const user = await api.public.user.findUniqueByEmail(email);

  if (user == null) {
    return "Nie znaleziono użytkownika z takim E-mailem.";
  }
  // SEND EMAIL WITH VERIFICATION CODE
  await sendVerificationCodeEmail(user.email, verificationCode);

  // SAVE DATA IN REDIS DATABASE FOR 5 MIN
  await redisClient.set(
    `${REDIS_EMAIL_VERIFICATION_KEY}:${verificationToken}`,
    {
      verificationCode,
      ...user,
    },
    {
      ex: EMAIL_VERIFICATION_CODE_TTL_IN_SEC,
    },
  );
  //REDIRECT
  redirect(`/email-verification?verificationToken=${verificationToken}`);
}
