import { TableSkeleton } from "@/components/table/table-skeleton";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { ProviderServicesTable } from "@/features/provider/components/tables/provider-services-table";
import { Suspense } from "react";

export default function ProviderServicesPage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper className="relative">
          <SectionHeader heading={H1} title="Twoje usługi" />
          <Suspense fallback={<TableSkeleton />}>
            <ProviderServicesTable />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
