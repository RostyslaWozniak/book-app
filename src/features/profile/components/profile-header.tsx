import { LogoutDialog } from "@/components/log-out-dialog";
import { Button } from "@/components/shadcn-ui/button";
import { Avatar } from "@/components/ui/avatar";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import type { ClientProfile } from "../types/client-profile.type";
import type { ProviderProfile } from "../types/provider-profile.type";

type ProfileHeaderProps = (
  | {
      role: "CLIENT";
      user: ClientProfile;
    }
  | {
      role: "PROVIDER";
      user: ProviderProfile;
    }
) & { showLogoutButton?: boolean };

export function ProfileHeader({
  role,
  user,
  showLogoutButton,
}: ProfileHeaderProps) {
  const isProvider = role === "PROVIDER";
  const editProfileUrl = isProvider
    ? "/provider/profile/edit"
    : "/profile/edit";
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="_@container relative flex flex-col items-center rounded-lg border p-4 md:flex-row md:gap-x-12 md:p-6">
      <div className="relative mb-2 md:mb-0">
        <Avatar
          photo={user.photo ?? ""}
          name={fullName}
          className="h-16 w-16"
        />
      </div>
      <div className="text-center md:text-start">
        <h2 className="text-primary text-base font-bold md:text-2xl">
          {fullName}
        </h2>
        <p className="text-muted-foreground text-xs md:text-base">
          {user.email}
        </p>
        {!user.phoneNumber && (
          <Link
            href={`${editProfileUrl}?phoneNumber=true`}
            className="text-primary text-xs"
          >
            Dodaj numer telefonu
          </Link>
        )}
      </div>
      <Link className="absolute top-0 left-0" href={editProfileUrl}>
        <Button variant="link">
          <EditIcon className="size-4.5 md:size-5" />
        </Button>
      </Link>

      {showLogoutButton && (
        <div className="absolute top-2 right-2">
          <LogoutDialog />
        </div>
      )}
    </div>
  );
}
