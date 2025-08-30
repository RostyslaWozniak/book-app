import { HomeIcon } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import { AccessibleLink } from "../ui/accesible-link";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { SectionWrapper } from "../ui/section-wrapper";
import { H1 } from "../ui/typography";

export function NotFoundSection() {
  return (
    <SectionWrapper>
      <MaxWidthWrapper>
        <H1>Strona nie znaleziona</H1>
        <div>
          <AccessibleLink href="/" aria-label="Przejdź do strony głównej">
            <Button>
              <HomeIcon /> Na Główną
            </Button>
          </AccessibleLink>
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
