import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import {
  TimeOffDialog,
  TimeOffTable,
} from "@/features/availability/components/time-off";

export default function ProviderTimeOffPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <div className="mb-6 flex items-center justify-between md:mb-12">
            <H1>Dni wolne</H1>
            <TimeOffDialog />
          </div>
          <TimeOffTable />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
