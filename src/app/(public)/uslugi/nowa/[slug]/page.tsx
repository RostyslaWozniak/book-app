import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <BookAppointmentSection slug={slug} />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Suspense } from "react";
import { BookAppointmentForm } from "@/features/appointment/components/form/book-appointment-form";

async function BookAppointmentSection({ slug }: { slug: string }) {
  const service = await api.public.services.getOneBySlug({ slug });

  if (!service) return notFound();
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-normal">
          Rezerwacja usługi <br />
          <span className="font-bold">{service.name}</span>
        </CardTitle>
        {service.description && (
          <CardDescription>{service.description}</CardDescription>
        )}
        <CardDescription>
          Czas trwania:{" "}
          <span className="text-foreground font-bold">
            {service.durationInMinutes} min.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BookAppointmentForm serviceId={service.id} />
      </CardContent>
    </Card>
  );
}
