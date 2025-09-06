import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { ServiceCard } from "@/features/service/components/service-card";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export default function AppointmentsPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <H1 className="mb-3 md:mb-6">Umów wizytę</H1>

          <Suspense fallback={<div>Loading</div>}>
            <ServicesList />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

async function ServicesList() {
  const services = await api.public.services.getAll();

  return (
    <div className="grid grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          showDescription
          bookButton
        />
      ))}
    </div>
  );
}
