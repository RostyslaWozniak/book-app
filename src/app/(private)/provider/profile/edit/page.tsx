import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { EditProviderProfileForm } from "@/features/provider/components/forms/edit-provider-profile-form";
import { api } from "@/trpc/server";

export default async function ProviderProfileEditPage() {
  const profile = await api.provider.profile.getProfile();
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <EditProviderProfileForm profile={profile} />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
