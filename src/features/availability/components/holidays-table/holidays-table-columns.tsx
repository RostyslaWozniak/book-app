"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { SettingsIcon } from "lucide-react";
import { dateFormatter } from "@/lib/utils/date";
import type { HolidayRange } from "../../types/override.type";
import { HolidaysTableSettings } from "./holidays-table-settings";

export const holidaysTableColumns: ColumnDef<HolidayRange>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => (
      <div>
        {dateFormatter.format(row.original.startDate)} -{" "}
        {dateFormatter.format(row.original.endDate)}
      </div>
    ),
  },
  {
    accessorKey: "reason",
    header: "Przyczyna",
    cell: ({ row }) =>
      row.original.reason ? <p>{row.original.reason}</p> : <p> - - - </p>,
  },

  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => <HolidaysTableSettings data={row.original} />,
  },
];
