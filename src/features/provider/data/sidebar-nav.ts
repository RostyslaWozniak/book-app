"use client";

import { CalendarIcon, ClockIcon, HomeIcon, PawPrintIcon } from "lucide-react";

export const providerSidebarNavData = [
  {
    url: "/provider",
    title: "Panel",
    icon: HomeIcon,
  },
  {
    url: "/provider/schedule",
    title: "Grafik",
    icon: CalendarIcon,
  },
  {
    url: "/provider/services",
    title: "Usługi",
    icon: PawPrintIcon,
  },
  {
    url: "/provider/availability",
    title: "Dostępność",
    icon: ClockIcon,
  },
];
