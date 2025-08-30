"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { SettingsIcon } from "lucide-react";
import { ClientsTableSetings } from "./users-table-settings";
import type { User } from "@prisma/client";
import { mapRoles } from "../../lib/map-roles";
import { Avatar } from "@/components/ui/avatar";

export const usersTableColumns: ColumnDef<User>[] = [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="w-min">{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Rola",
    cell: ({ row }) => (
      <div className="w-100">{mapRoles(row.original.roles)}</div>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => (
      <div className="w-min">
        <ClientsTableSetings user={row.original} />
      </div>
    ),
  },
];
