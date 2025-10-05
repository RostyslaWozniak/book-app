import { HeroSection } from "@/components/sections/hero-section";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function HomePage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <HeroSection />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
