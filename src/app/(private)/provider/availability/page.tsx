import { Button } from "@/components/shadcn-ui/button";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AvailabilityManager } from "@/features/availability/components/availability-manager";
import Link from "next/link";

export default function ProviderAvailabilityPage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper className="@container max-w-full">
          <div className="mb-4 ml-auto flex w-min gap-2">
            <Link href="/provider/availability/holidays">
              <Button variant="outline">Urlopy</Button>
            </Link>
            <Link href="/provider/availability/overrides">
              <Button variant="outline">Zmiana godzin pracy</Button>
            </Link>
          </div>
          <AvailabilityManager />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
