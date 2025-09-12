import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { AppointmentCalendar } from "@/features/schedule-calendar";

export default function ProviderSchedulePage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          <SectionHeader heading={H1} title="Twój grafik" />
          {/* <AppointmentCalendar /> */}
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
