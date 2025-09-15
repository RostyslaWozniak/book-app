"use client";

import { type ColumnDef } from "@tanstack/react-table";
import type { ProviderScheduleOverride } from "@prisma/client";

export const overridesTableColumns: ColumnDef<ProviderScheduleOverride>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => row.original.date.toString(),
  },
  {
    accessorKey: "startTime",
    header: "Start",
    cell: ({ row }) => row.original.startTime,
  },
  {
    accessorKey: "endTime",
    header: "Koniec",
    cell: ({ row }) => row.original.endTime,
  },
  {
    accessorKey: "reason",
    header: "Przyczyna",
    cell: ({ row }) => <p>{row.original.reason}</p>,
  },

  //   {
  //     accessorKey: "settings",
  //     header: () => <SettingsIcon />,
  //     cell: ({ row }) => <UserTableSetings role="CLIENT" user={row.original} />,
  //   },
];
