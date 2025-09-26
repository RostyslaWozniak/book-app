import { CalendarIcon, ClockIcon, HomeIcon, WrenchIcon } from "lucide-react";

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
    icon: WrenchIcon,
  },
  {
    url: "/provider/availability",
    title: "Dostępność",
    icon: ClockIcon,
  },
];
