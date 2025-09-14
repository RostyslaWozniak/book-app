"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { SettingsIcon } from "lucide-react";
import { UserTableSetings } from "../users-table-settings";
import type { User } from "@prisma/client";
import { mapRoles } from "../../../lib/map-roles";
import { Avatar } from "@/components/ui/avatar";

export const clientsTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "photo",
    header: "Zdjecie",
    cell: ({ row }) => (
      <Avatar
        name={`${row.original.firstName} ${row.original.lastName}`}
        photo={row.original.photo}
        className="h-10 w-10 text-base md:h-12 md:w-12 md:text-base"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Imię",
    cell: ({ row }) => (
      <p>
        {row.original.firstName} {row.original.lastName}
      </p>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => mapRoles(row.original.roles),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="w-full"> {row.original.email}</p>,
  },

  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => <UserTableSetings role="CLIENT" user={row.original} />,
  },
];
