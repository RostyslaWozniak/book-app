import { TableWrapper } from "@/components/table/table-wrapper";
import { api } from "@/trpc/server";
import { timeOffTableColumns } from "./time-off-table-columns";

export async function TimeOffTable() {
  const timeOffs = await api.provider.availability.timeOff.getAllOwn();
  return <TableWrapper columns={timeOffTableColumns} data={timeOffs} />;
}
