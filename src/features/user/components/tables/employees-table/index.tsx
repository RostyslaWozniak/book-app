import { TableWrapper } from "@/components/table/table-wrapper";
import { employeesTableColumns } from "./employees-table-columns";
import { api } from "@/trpc/server";

import { getEmployeesRolesFromSearchParams } from "@/features/user/lib/get-roles-from-search-param";

export async function EmployeesTable({
  searchParamsRoles,
}: {
  searchParamsRoles: string | undefined;
}) {
  const roles = getEmployeesRolesFromSearchParams(searchParamsRoles);
  const employees =
    roles.length > 0 ? await api.admin.user.getAllEmployees(roles) : [];
  return <TableWrapper columns={employeesTableColumns} data={employees} />;
}
