import { TableWrapper } from "@/components/table/table-wrapper";
import { api } from "@/trpc/server";
import { overridesTableColumns } from "./override-table-columns";

export async function OverridesTable() {
  const overrides = await api.provider.availability.override.getAllOwn();
  console.log(overrides);
  return <TableWrapper columns={overridesTableColumns} data={overrides} />;
}
