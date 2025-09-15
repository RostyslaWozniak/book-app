import { TableWrapper } from "@/components/table/table-wrapper";
import { api } from "@/trpc/server";
import { holidaysTableColumns } from "./holidays-table-columns";

export async function HolidaysTable() {
  const holidays = await api.provider.availability.override.getAllOwn({
    mode: "holidays",
  });
  return <TableWrapper columns={holidaysTableColumns} data={holidays} />;
}
