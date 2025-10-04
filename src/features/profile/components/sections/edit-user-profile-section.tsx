import { SectionWrapper } from "@/components/ui/section-wrapper";
import { api } from "@/trpc/server";
import { PAGE_VIEW_CONFIG } from "../../lib/config/page-view.config";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { EditProfileForm } from "../forms/edit-profile-form";
import { H1 } from "@/components/ui/typography";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-page";

export function EditUserProfileSection() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SuspendedEditUserProfile />
    </Suspense>
  );
}

async function SuspendedEditUserProfile() {
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
