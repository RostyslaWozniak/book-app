import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export class ProviderSeviceService {
  public static async getAllOwn(providerId: string) {
    const providerService = await db.providerService.findMany({
      where: {
        providerId,
      },
      select: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            durationInMinutes: true,
            isActive: true,
          },
        },
      },
    });
    return providerService.map(({ service }) => service);
  }
  public static async mutateList(providerId: string, services: string[]) {
    try {
      return await db.$transaction(async (tx) => {
        await tx.providerService.deleteMany({
          where: {
            providerId,
          },
        });
        await tx.providerService.createMany({
          data: services.map((serviceId) => ({
            serviceId,
            providerId,
          })),
        });
      });
    } catch {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Coś poszło nie tak. Spróbuj ponownie",
      });
    }
  }
}
