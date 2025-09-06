import { ProfileHeader } from "@/features/profile/components/profile-header";
import { api } from "@/trpc/server";

export async function ProviderProfileHeader() {
  const providerProfile = await api.provider.profile.getProfile();

  return <ProfileHeader profile={providerProfile} provider={providerProfile} />;
}
