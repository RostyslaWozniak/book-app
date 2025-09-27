import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function ProfileAppointmentPage({
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
import { getCurrentUser } from "@/features/auth/current-user";

async function BookAppointmentSection({ slug }: { slug: string }) {
  const service = await api.public.service.getOneBySlug({ slug });

  if (!service) return notFound();

  const currentUser = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  });
  return (
    <Card className="sm:bg-card srounded-none -mx-4 max-w-3xl border-0 bg-transparent shadow-none sm:mx-auto sm:rounded-md sm:border">
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
        <BookAppointmentForm
          serviceId={service.id}
          user={{
            email: currentUser.email,
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            phone: currentUser.phoneNumber,
          }}
        />
      </CardContent>
    </Card>
  );
}
