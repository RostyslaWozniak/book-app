import type { User as PrismaUser } from "@prisma/client";

export type User = Pick<
  PrismaUser,
  "firstName" | "lastName" | "email" | "phoneNumber" | "photo"
>;
