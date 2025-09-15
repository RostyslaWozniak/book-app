import { Button } from "@/components/shadcn-ui/button";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { HolidaysTable } from "@/features/availability/components/holidays-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ProviderHolidaysPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <div className="relative">
            <SectionHeader heading={H1} title="Urlop" />
            <Link
              href="/provider/availability/holidays/new"
              className="absolute top-0 right-0"
            >
              <Button>
                <PlusIcon />
                Dodaj urlop
              </Button>
            </Link>
          </div>
          <HolidaysTable />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
