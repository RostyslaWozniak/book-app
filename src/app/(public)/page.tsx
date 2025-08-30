import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <H1>Witamy w Book App</H1>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
