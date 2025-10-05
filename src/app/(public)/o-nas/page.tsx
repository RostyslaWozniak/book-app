import { AboutUsSection } from "@/components/sections/about-us-section";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function AboutPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <AboutUsSection />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
