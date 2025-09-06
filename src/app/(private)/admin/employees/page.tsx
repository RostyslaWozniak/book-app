import { TableSkeleton } from "@/components/table/table-skeleton";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { EmployeesTable } from "@/features/user/components/tables/employees-table";
import { Suspense } from "react";

export default async function AdminEmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{ roles: string }>;
}) {
  const { roles } = await searchParams;

  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          <H1 className="mb-3 md:mb-6">Pracownicy</H1>
          <Suspense fallback={<TableSkeleton />}>
            <EmployeesTable searchParamsRoles={roles} />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
