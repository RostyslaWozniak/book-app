import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { ServicesList } from "@/features/service/components/services-list";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export default function AppointmentsPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <H1 className="mb-3 md:mb-6">Zobacz naszę usługi</H1>

          <Suspense fallback={<div>Loading</div>}>
            <ServicesListSuspense />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

async function ServicesListSuspense() {
  const services = await api.public.service.getAll({});

  return <ServicesList services={services} />;
}
