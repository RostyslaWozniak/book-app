import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import {
  OverrideDialog,
  OverridesTable,
} from "@/features/availability/components/override";

export default function ProviderOverridesPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <div className="mb-6 flex items-center justify-between md:mb-12">
            <H1>Zmiana godzin pracy</H1>
            <OverrideDialog />
          </div>
          <OverridesTable />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
