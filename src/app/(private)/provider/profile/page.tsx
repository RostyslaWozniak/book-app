import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ProviderProfileHeader } from "@/features/provider/components/provider-profile-header";

export default function ProviderProfilePage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <ProviderProfileHeader />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
