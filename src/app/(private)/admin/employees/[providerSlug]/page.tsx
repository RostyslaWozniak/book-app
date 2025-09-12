import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function AdminEmployeePage({
  params,
}: {
  params: Promise<{ providerSlug: string }>;
}) {
  const { providerSlug } = await params;

  const provider = await api.admin.provider.getProfileBySlug(providerSlug);

  if (!provider) return notFound();
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <H1>
            {provider.user.firstName} {provider.user.lastName}
          </H1>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
