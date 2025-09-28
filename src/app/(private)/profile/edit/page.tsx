import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { H1 } from "@/components/ui/typography";
import { EditProfileForm } from "@/features/profile/components/forms/edit-profile-form";
import { PAGE_VIEW_CONFIG } from "@/features/profile/lib/config/page-view.config";
import { api } from "@/trpc/server";

export default async function UserProfileEditPage() {
  const profile = await api.private.user.getProfile();
  return (
    <>
      <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
        <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
          <SectionHeader heading={H1} title="Edytuj swój profil" />
          <EditProfileForm profile={profile} />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
