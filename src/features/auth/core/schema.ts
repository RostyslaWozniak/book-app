import { $Enums } from "@prisma/client";
import { z } from "zod";

const userRoles = [
  $Enums.Roles.ADMIN,
  $Enums.Roles.PROVIDER,
  $Enums.Roles.CLIENT,
] as const;

export const sessionSchema = z.object({
  id: z.string(),
  roles: z.array(z.enum(userRoles)),
});
