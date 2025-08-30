import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AvailabilityManager } from "@/features/availability/components/availability-manager";

export default function ProviderAvailabilityPage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper className="max-w-full">
          <AvailabilityManager />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
