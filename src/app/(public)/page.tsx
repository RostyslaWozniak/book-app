import { HeroSection } from "@/components/sections/hero-section";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";

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
