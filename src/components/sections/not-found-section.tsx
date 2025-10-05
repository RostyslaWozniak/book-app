import { CircleXIcon, HomeIcon } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { SectionWrapper } from "../ui/section-wrapper";
import { EmptyResult } from "../ui/empty-result";
import { BackButton } from "../ui/back-button";
import Link from "next/link";

export function NotFoundSection() {
  return (
    <SectionWrapper paddingBlock="lg">
      <MaxWidthWrapper>
        <EmptyResult
          icon={CircleXIcon}
          title="404 - Not Found"
          description="Strona której szukasz nie została znaleziona."
          actionButton={
            <div className="flex w-full flex-col gap-x-3 gap-y-4 sm:w-auto sm:flex-row sm:items-center">
              <BackButton variant="secondary" size="default"></BackButton>
              <Link href="/" aria-label="Przejdź do strony głównej">
                <Button className="w-full">
                  <HomeIcon /> Na Główną
                </Button>
              </Link>
            </div>
          }
        />
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
