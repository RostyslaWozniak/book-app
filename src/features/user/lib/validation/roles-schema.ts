import { $Enums } from "@prisma/client";
import z from "zod";

export const rolesSchema = z
  .array(z.nativeEnum($Enums.Roles))
  .min(1)
  .nonempty("Wybierz przynajmniej jedna role");

export type RolesSchema = z.infer<typeof rolesSchema>;

export const rolesSelectSchema = z.object({
  userId: z.string(),
  roles: rolesSchema,
});

export type RolesSelectSchema = z.infer<typeof rolesSelectSchema>;
