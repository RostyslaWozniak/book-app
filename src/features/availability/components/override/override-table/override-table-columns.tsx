"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/lib/utils/date";
import type { OverrideRange } from "@/features/availability/types/override.type";
import { SettingsIcon } from "lucide-react";
import { OverrideTableSettings } from "./override-table-settings";

export const overridesTableColumns: ColumnDef<OverrideRange>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const isSameDay =
        row.original.startDate.getTime() === row.original.endDate.getTime();
      return (
        <p className="">
          {isSameDay ? (
            <>{dateFormatter.format(row.original.startDate)}</>
          ) : (
            <>
              {dateFormatter.format(row.original.startDate)} -{" "}
              {dateFormatter.format(row.original.endDate)}
            </>
          )}
        </p>
      );
    },
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
    cell: ({ row }) => (
      <p>{row.original.reason ? <>{row.original.reason}</> : <> - - - </>}</p>
    ),
  },
  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => <OverrideTableSettings data={row.original} />,
  },
];
