import { HomeIcon, UserCogIcon, UsersIcon, WrenchIcon } from "lucide-react";

export const adminSidebarNavData = [
  {
    url: "/admin",
    title: "Panel",
    icon: HomeIcon,
  },

  {
    url: "/admin/services",
    title: "Usługi",
    icon: WrenchIcon,
  },
  {
    url: "/admin/clients",
    title: "Klienci",
    icon: UsersIcon,
  },
  {
    url: "/admin/employees",
    title: "Specjalisci",
    icon: UserCogIcon,
  },
];
