import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { ServiceCard } from "@/features/service/components/service-card";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export default function ProfileAppointmentsPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <H1 className="mb-3 md:mb-6">Umów wizytę</H1>

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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          showDescription
          bookButton
          href={`/profile/uslugi/${service.slug}`}
        />
      ))}
    </div>
  );
}
