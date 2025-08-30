import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { CreateUpdateServiceForm } from "@/features/service/components/forms/create-update-service-form";

export default function AdminServicesNewPage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper className="relative">
          <H1 className="mb-3 md:mb-6">Dodaj nową usługę</H1>
          <div className="mt-20 max-w-2xl">
            <CreateUpdateServiceForm />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
