import { TableWrapper } from "@/components/table/table-wrapper";
import { api } from "@/trpc/server";
import { providerServicesTableColumns } from "./provider-services-table-columns";
import { ServiceSelectionDialog } from "../../forms/provider-services-select-form";
import { EmptyResult } from "@/components/ui/empty-result";
import { TableIcon } from "lucide-react";

export async function ProviderServicesTable() {
  const providersOwnServices = await api.provider.service.getAllOwn();
  return (
    <>
      <TableWrapper
        columns={providerServicesTableColumns}
        data={providersOwnServices}
        emptyTableComponent={
          <EmptyResult
            title="Brak usług"
            icon={TableIcon}
            titleClassName="mb-4"
            actionButton={
              <ServiceSelectionDialog
                providersOwnServices={providersOwnServices}
              />
            }
          />
        }
      />
      {providersOwnServices.length > 0 && (
        <div className="absolute top-0 right-8">
          <ServiceSelectionDialog providersOwnServices={providersOwnServices} />
        </div>
      )}
    </>
  );
}
