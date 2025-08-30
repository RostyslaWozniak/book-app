import { TableWrapper } from "@/components/table/table-wrapper";
import { usersTableColumns } from "./users-table-columns";
import { api } from "@/trpc/server";

export async function UsersTable() {
  const users = await api.admin.user.getAllByRoles([
    "ADMIN",
    "PROVIDER",
    "CLIENT",
  ]);
  return <TableWrapper columns={usersTableColumns} data={users} />;
}
