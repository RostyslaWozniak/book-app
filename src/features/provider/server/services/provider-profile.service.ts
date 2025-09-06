import type { RolesSchema } from "@/features/user/lib/validation/roles-schema";
import { db } from "@/server/db";

export class ProviderProfileService {
  public static async getAll(roles: RolesSchema) {
    const providerProfiles = await db.providerProfile.findMany({
      where: {
        user: {
          roles: {
            hasSome: roles,
          },
        },
      },
      select: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            photo: true,
            email: true,
            roles: true,
          },
        },
        slug: true,
        description: true,
      },
    });

    return providerProfiles.map((profile) => ({
      slug: profile.slug,
      description: profile.description,
      ...profile.user,
    }));
  }
}
