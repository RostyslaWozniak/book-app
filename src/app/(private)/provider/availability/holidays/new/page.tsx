import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { TimeOffForm } from "@/features/availability/components/time-off-form";

export default function ProviderHolidaysNewPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader heading={H1} title="Dodawanie urlopu" />
          <TimeOffForm mode="holidays" />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
