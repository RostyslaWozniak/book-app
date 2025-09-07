import type { $Enums } from "@prisma/client";

export function mapRoles(roles: $Enums.Roles[]) {
  return roles
    .map((role) => {
      switch (role) {
        case "ADMIN":
          return "Administrator";
        case "PROVIDER":
          return "Specjalista";
        case "CLIENT":
          return "Klient";
        default:
          return role;
      }
    })
    .join(", ");
}
