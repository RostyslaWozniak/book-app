import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { LogOutButton } from "@/features/auth/components/log-out-button";
import { getCurrentUser } from "@/features/auth/current-user";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <Suspense fallback={<SectionHeader title="Loading data..." />}>
            <SuspendedHeaderSection />
          </Suspense>
          <LogOutButton>Wyloguj się</LogOutButton>
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

  return <SectionHeader title={`Hello  ${user.firstName}`} />;
}
