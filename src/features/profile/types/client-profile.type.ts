import type { User } from "@prisma/client";

export type ClientProfile = Pick<
  User,
  "firstName" | "lastName" | "email" | "phoneNumber" | "photo"
>;
