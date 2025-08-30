import { TableSkeleton } from "@/components/table/table-skeleton";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { UsersTable } from "@/features/user/components/users-table";
import { Suspense } from "react";

export default function AdminClientsPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <H1 className="mb-3 md:mb-6">Klienci</H1>
          <Suspense fallback={<TableSkeleton />}>
            <UsersTable />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
