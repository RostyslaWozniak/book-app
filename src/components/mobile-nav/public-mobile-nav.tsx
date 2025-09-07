import {
  HomeIcon,
  PhoneIcon,
  PlusIcon,
  UsersRoundIcon,
  WrenchIcon,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";

const nav = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/",
  },
  {
    icon: UsersRoundIcon,
    label: "O nas",
    href: "/o-nas",
  },
  {
    icon: WrenchIcon,
    label: "Usługi",
    href: "/uslugi",
  },
  {
    icon: PhoneIcon,
    label: "Kontakt",
    href: "/kontakt",
  },
  {
    icon: PlusIcon,
    label: "Umów",
    href: "/uslugi/nowa",
  },
];

export function PublicMobileNav() {
  return <MobileNav nav={nav} className="grid-cols-5" />;
}
