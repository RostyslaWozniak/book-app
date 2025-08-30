"use client";

import { ClockIcon, HomeIcon, UsersIcon, WrenchIcon } from "lucide-react";

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
    url: "/admin/availability",
    title: "Dostępność",
    icon: ClockIcon,
  },
];
