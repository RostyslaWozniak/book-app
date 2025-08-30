import { api } from "@/trpc/server";
import { serviceTableColumns } from "./columns";
import { TableWrapper } from "@/components/table/table-wrapper";

export async function ServicesTable() {
  const services = await api.admin.service.getAll();
  return <TableWrapper columns={serviceTableColumns} data={services} />;
}
