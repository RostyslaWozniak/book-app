import { db } from "@/server/db";
import type { ProviderProfile } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class ProviderScheduleService {
  public static async getByProviderId(provider: Pick<ProviderProfile, "id">) {
    return db.providerSchedule.findUnique({
      where: { providerProfileId: provider.id },
    });
  }

  public static async getByProviderIdOrThrow(
    provider: Pick<ProviderProfile, "id">,
  ) {
    const providerSchedule = await this.getByProviderId(provider);
    if (!providerSchedule) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie znaleziono grafiku specjalisty.",
      });
    }
    return providerSchedule;
  }
}
