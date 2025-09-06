import { db } from "@/server/db";
import type {
  RolesSchema,
  RolesSelectSchema,
} from "../../lib/validation/roles-schema";
import { TRPCError } from "@trpc/server";

export class UserService {
  public static async getAllByRoles(roles: RolesSchema) {
    return await db.user.findMany({
      where: {
        roles: {
          hasSome: roles,
        },
      },
    });
  }
  public static async getAllVerifiedByRoles(roles: RolesSchema) {
    return await db.user.findMany({
      where: {
        isVerified: true,
        roles: {
          hasSome: roles,
        },
      },
    });
  }
  public static async getEmployeeByProviderSlug(providerSlug: string) {
    return await db.providerProfile.findUnique({
      where: {
        slug: providerSlug,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  public static async changeRoles({ userId, roles }: RolesSelectSchema) {
    if (roles.includes("PROVIDER")) {
      await this.checkIfProviderProfileExists(userId);
    }

    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          roles: roles,
        },
      });
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Coś poszło nie tak. Spróbój ponownie",
      });
    }
  }

  private static async checkIfProviderProfileExists(
    userId: string,
  ): Promise<void> {
    const existingProviderProfile = await db.providerProfile.findUnique({
      where: {
        userId,
      },
    });
    if (!existingProviderProfile) {
      await db.providerProfile.create({
        data: {
          userId,
        },
      });
    }
  }
}
