import type { ClientProfile } from "./client-profile.type";
import type { ProviderProfile as PrismaProviderProfile } from "@prisma/client";

export type ProviderProfile = ClientProfile &
  Pick<PrismaProviderProfile, "slug" | "description">;
