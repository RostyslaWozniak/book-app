"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon, SettingsIcon } from "lucide-react";
import { ClientsTableSetings } from "../users-table-settings";
import { mapRoles } from "../../../lib/map-roles";
import { Avatar } from "@/components/ui/avatar";
import { RoleSelection } from "./employees-roles-selection";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";
import type { RouterOutputs } from "@/trpc/react";

export const employeesTableColumns: ColumnDef<
  RouterOutputs["admin"]["user"]["getAllEmployees"][number]
>[] = [
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
    header: () => <RoleSelection />,
    cell: ({ row }) => mapRoles(row.original.roles),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="w-full"> {row.original.email}</p>,
  },
  {
    accessorKey: "profile",
    header: "Profil",
    cell: ({ row }) => (
      <Link href={`/admin/employees/${row.original.slug}`}>
        <Button variant="link" size="sm">
          Zobacz profil <ArrowRightIcon />
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Grafik",
    cell: ({ row }) => (
      <Link href={`/admin/employees/${row.original.slug}/schedule`}>
        <Button variant="link" size="sm">
          Zobacz grifik <ArrowRightIcon />
        </Button>
      </Link>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => <ClientsTableSetings user={row.original} />,
  },
];
