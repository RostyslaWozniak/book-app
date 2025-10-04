import { ProfileHeaderSection } from "@/features/profile/components/sections/profile-header-section";

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ProfileHeaderSection />
      {children}
    </>
  );
}
