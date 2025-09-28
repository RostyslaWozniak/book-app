import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { EditProviderProfileForm } from "@/features/provider/components/forms/edit-provider-profile-form";
import { api } from "@/trpc/server";

export default async function ProviderProfileEditPage() {
  const profile = await api.provider.profile.getProfile();
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader heading={H1} title="Edytuj profil specjalisty" />
          <EditProviderProfileForm profile={profile} />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
