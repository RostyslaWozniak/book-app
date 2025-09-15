import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";

export default function ProviderOverridesPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader heading={H1} title="Zmiana godzin pracy" />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
