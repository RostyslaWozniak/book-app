import { TableWrapper } from "@/components/table/table-wrapper";
import { api } from "@/trpc/server";
import { overridesTableColumns } from "./overrides-table-columns";

export async function OverridesTable() {
  const holidays = await api.provider.availability.override.getAllOwn({
    mode: "overrides",
  });
  return <TableWrapper columns={overridesTableColumns} data={holidays} />;
}
