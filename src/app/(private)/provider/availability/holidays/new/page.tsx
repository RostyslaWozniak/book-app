import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { HolidaysForm } from "@/features/availability/components/holidays-form";

export default function ProviderHolidaysNewPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader heading={H1} title="Dodawanie urlopu" />
          <HolidaysForm />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
