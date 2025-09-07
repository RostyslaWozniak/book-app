"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/shadcn-ui/badge";
import { Settings } from "lucide-react";
import { ServiceTableSetings } from "./table-setings";
import type { AdminService } from "../../types/services.type";

export const serviceTableColumns: ColumnDef<AdminService>[] = [
  {
    accessorKey: "name",
    header: "Nazwa",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "duration",
    header: "Czas",
    cell: ({ row }) => <p>{row.original.durationInMinutes} min.</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isActive ? (
          <Badge variant="default" className="bg-emerald-500 text-white">
            Aktywny
          </Badge>
        ) : (
          <Badge variant="destructive">Nieaktywny</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Opis",
    cell: ({ row }) => (
      <>
        {row.original.description ? (
          <p className="text-wrap">{row.original.description}</p>
        ) : (
          <Badge variant="destructive">N/A</Badge>
        )}
      </>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <Settings />,
    cell: ({ row }) => (
      <div>
        <ServiceTableSetings service={row.original} />
      </div>
    ),
  },
];
