import { CalendarIcon, HomeIcon, PlusIcon, UserIcon } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export const profileSidebarNavData = [
  {
    url: "/",
    title: "Główna",
    icon: HomeIcon,
  },

  {
    url: "/profile",
    title: "Profil",
    icon: UserIcon,
  },
  {
    url: "/profile/wizyty",
    title: "Wizyty",
    icon: CalendarIcon,
  },
  {
    url: "/profile/uslugi",
    title: "Umów",
    icon: PlusIcon,
  },
];

export function ProfileMobileNav() {
  return (
    <MobileNav
      nav={profileSidebarNavData}
      className="grid-cols-4"
      isVisibleOnDesktop={true}
    />
  );
}
