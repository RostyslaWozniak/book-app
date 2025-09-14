import { ProfileHeader } from "@/features/profile/components/profile-header";
import { api } from "@/trpc/server";

export async function ProviderProfileHeader() {
  const providerProfile = await api.provider.profile.getProfile();

  return (
    <ProfileHeader role="PROVIDER" user={providerProfile} showLogoutButton />
  );
}
