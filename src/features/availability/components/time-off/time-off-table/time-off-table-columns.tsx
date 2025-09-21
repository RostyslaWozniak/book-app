"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { SettingsIcon } from "lucide-react";
import { dateFormatter } from "@/lib/utils/date";
import type { TimeOffRange } from "../../../types/override.type";
import { TimeOffTableSettings } from "./time-off-table-settings";

export const timeOffTableColumns: ColumnDef<TimeOffRange>[] = [
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
    accessorKey: "reason",
    header: "Przyczyna",
    cell: ({ row }) => (
      <p>{row.original.reason ? <>{row.original.reason}</> : <> - - - </>}</p>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => <TimeOffTableSettings data={row.original} />,
  },
];
