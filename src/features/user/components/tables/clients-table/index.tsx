import { TableWrapper } from "@/components/table/table-wrapper";
import { clientsTableColumns } from "./clients-table-columns";
import { api } from "@/trpc/server";

export async function ClientsTable() {
  const users = await api.admin.user.getAllVerifiedByRoles(["CLIENT"]);
  return <TableWrapper columns={clientsTableColumns} data={users} />;
}
