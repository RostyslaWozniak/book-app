import { Button } from "@/components/shadcn-ui/button";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { AccessibleLink } from "@/components/ui/accesible-link";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { ServicesTable } from "@/features/service/components/services-table";
import { cn } from "@/lib/utils/cn";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";

export default function AdminServicesPage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper className="relative">
          <H1 className="mb-3 md:mb-6">Usługi</H1>
          <AccessibleLink
            href="/admin/services/new"
            aria-label="Dodaj usługe"
            className={cn("top-0 right-4 md:absolute md:right-8 md:w-auto")}
          >
            <Button>
              <PlusIcon /> Dodaj usługe
            </Button>
          </AccessibleLink>
          <Suspense fallback={<TableSkeleton rowsNumber={10} />}>
            <ServicesTable />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
