"use client";

import { CalendarIcon, ClockIcon, HomeIcon, PawPrintIcon } from "lucide-react";

export const adminSidebarNavData = [
  {
    url: "/admin",
    title: "Panel",
    icon: HomeIcon,
  },
  {
    url: "/admin/schedule",
    title: "Grafik",
    icon: CalendarIcon,
  },
  {
    url: "/admin/services",
    title: "Usługi",
    icon: PawPrintIcon,
  },
  {
    url: "/admin/availability",
    title: "Dostępność",
    icon: ClockIcon,
  },
];
