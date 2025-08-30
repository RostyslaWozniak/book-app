import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getCurrentUser } from "@/features/auth/current-user";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <SuspendedHeaderSection />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

async function SuspendedHeaderSection() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return (
    <SectionHeader title={`Hello Admin ${user.firstName} ${user.lastName}`} />
  );
}
