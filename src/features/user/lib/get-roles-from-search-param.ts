import { $Enums } from "@prisma/client";
import { rolesSchema, type RolesSchema } from "./validation/roles-schema";

export function getEmployeesRolesFromSearchParams(
  searchRoles: string | undefined,
) {
  if (searchRoles == null || searchRoles.length === 0)
    return [$Enums.Roles.ADMIN, $Enums.Roles.PROVIDER] as RolesSchema;
  return searchRoles
    .split(":")
    .map((role) => role.toUpperCase())
    .filter((role) =>
      role === $Enums.Roles.CLIENT
        ? false
        : rolesSchema.safeParse([role]).success,
    ) as RolesSchema;
}
