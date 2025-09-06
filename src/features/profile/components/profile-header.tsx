import { Button } from "@/components/shadcn-ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LogOutButton } from "@/features/auth/components/log-out-button";
import { EditIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

export function ProfileHeader({
  profile,
  provider,
  showLogoutButton,
}: {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    photo: string | null;
  };
  provider?: {
    description: string | null;
    slug: string;
  };
  showLogoutButton?: boolean;
}) {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  return (
    <div className="relative flex flex-col items-center rounded-lg border p-4 md:flex-row md:gap-x-12 md:p-6">
      <div className="relative mb-2 md:mb-0">
        <Avatar
          photo={profile.photo ?? ""}
          name={fullName}
          className="h-16 w-16"
        />
      </div>
      <div className="text-center md:text-start">
        <h2 className="text-primary text-base font-bold md:text-2xl">
          {fullName}
        </h2>
        <p className="text-muted-foreground text-xs md:text-base">
          {profile.email}
        </p>
        {!profile.phoneNumber && (
          <Link href="/profile/edit" className="text-primary text-xs">
            Dodaj numer telefonu
          </Link>
        )}
      </div>
      <Link className="absolute top-0 left-0" href="/profile/edit">
        <Button variant="link">
          <EditIcon className="size-4.5 md:size-5" />
        </Button>
      </Link>

      {showLogoutButton && (
        <LogOutButton
          className="absolute top-2 right-2 gap-x-1 text-xs sm:gap-x-2 sm:text-sm"
          size="sm"
        >
          Wyloguj <LogOutIcon />
        </LogOutButton>
      )}
    </div>
  );
}
