import { getCurrentUser } from "@/features/auth/current-user";
import { ProfileHeader } from "../profile-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { PAGE_VIEW_CONFIG } from "../../lib/config/page-view.config";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Suspense } from "react";
import { Skeleton } from "@/components/shadcn-ui/skeleton";

export function ProfileHeaderSection() {
  return (
    <SectionWrapper paddingBlock={PAGE_VIEW_CONFIG.blockPadding}>
      <MaxWidthWrapper size={PAGE_VIEW_CONFIG.width}>
        <div className="h-40 w-full">
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <SuspendedHeaderSection />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}

async function SuspendedHeaderSection() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return <ProfileHeader role="CLIENT" user={user} showLogoutButton />;
}
