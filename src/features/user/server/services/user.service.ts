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

  public static async changeRoles({ userId, roles }: RolesSelectSchema) {
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
}
