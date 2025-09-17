import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { HolidaysDialog } from "@/features/availability/components/holidays-dialog";
import { HolidaysTable } from "@/features/availability/components/holidays-table";

export default function ProviderHolidaysPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <div className="mb-6 flex items-center justify-between md:mb-12">
            <H1>Urlop</H1>
            <HolidaysDialog />
          </div>
          <HolidaysTable />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
