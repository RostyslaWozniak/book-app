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
    title: "Home",
    url: "/",
  },
  {
    icon: UsersRoundIcon,
    title: "O nas",
    url: "/o-nas",
  },
  {
    icon: WrenchIcon,
    title: "Usługi",
    url: "/uslugi",
  },
  {
    icon: PhoneIcon,
    title: "Kontakt",
    url: "/kontakt",
  },
  {
    icon: PlusIcon,
    title: "Umów",
    url: "/uslugi/nowa",
  },
];

export function PublicMobileNav() {
  return <MobileNav nav={nav} className="grid-cols-5" />;
}
