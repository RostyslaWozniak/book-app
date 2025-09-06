import { TableSkeleton } from "@/components/table/table-skeleton";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { ClientsTable } from "@/features/user/components/tables/clients-table";
import { Suspense } from "react";

export default function AdminClientsPage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          <H1 className="mb-3 md:mb-6">Klienci</H1>
          <Suspense fallback={<TableSkeleton />}>
            <ClientsTable />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
