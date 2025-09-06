"use server";

import { redisClient } from "@/lib/services/redis";
import { redirect } from "next/navigation";
import {
  EMAIL_VERIFICATION_CODE_TTL_IN_SEC,
  REDIS_EMAIL_VERIFICATION_KEY,
} from "../constants";
import { generateSecureVerificationCode } from "../lib/generate-secure-verifcation-code";
import { sendVerificationCodeEmail } from "../lib/send-verification-email";
import { signUpSchema, type SignUpSchema } from "../schemas/sign-up-schema";
import { api } from "@/trpc/server";
import { redisVerificationSchema } from "../schemas/verification-code-schema";

export async function signUpAction(
  unsafeData: SignUpSchema,
): Promise<string | null> {
  // VALIDATE DATA FROM CLIENT
  const {
    data: parsedData,
    success: parseSuccess,
    error: parsedError,
  } = signUpSchema.safeParse(unsafeData);

  if (!parseSuccess) {
    console.error(parsedError);
    return "Validation error";
  }
  // CHECK IF EMAIL ALLOWED
  const { firstName, lastName, email } = parsedData;

  // GENERATE TOKEN
  const verificationToken = crypto.randomUUID();
  // GENERATE CODE
  const verificationCode = generateSecureVerificationCode();
  //check if user exists
  const existingUser = await api.public.user.findUniqueByEmail(email);

  if (existingUser) {
    return "Użytkownik z takim E-mailem już jest zarejestorwany";
  }

  //   create new user
  const newUser = await api.public.user.create({ firstName, lastName, email });
  // SEND EMAIL WITH VERIFICATION CODE
  await sendVerificationCodeEmail(newUser.email, verificationCode);

  const { data: redisData, success } = redisVerificationSchema.safeParse({
    verificationCode,
    userId: newUser.id,
  });

  if (!success) {
    return "Błąd walidacji danych session";
  }

  // SAVE DATA IN REDIS DATABASE FOR 5 MIN
  await redisClient.set(
    `${REDIS_EMAIL_VERIFICATION_KEY}:${verificationToken}`,
    redisData,
    {
      ex: EMAIL_VERIFICATION_CODE_TTL_IN_SEC,
    },
  );
  //REDIRECT
  redirect(`/email-verification?verificationToken=${verificationToken}`);
}
