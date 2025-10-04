import Link from "next/link";
import { ProfileAppointmentNavItem } from "./profile-appointment-nav-item";
import {
  CalendarCheckIcon,
  CalendarSearchIcon,
  CircleCheckBigIcon,
  CircleXIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const appointmentsNav = [
  {
    url: "/profile/visits",
    title: "Wszystkie",
    icon: CalendarSearchIcon,
  },
  {
    url: "/profile/visits/active",
    title: "Zaplanowane",
    icon: CalendarCheckIcon,
  },
  {
    url: "/profile/visits/finished",
    title: "Zakończone",
    icon: CircleCheckBigIcon,
  },
  {
    url: "/profile/visits/canceled",
    title: "Anulowane",
    icon: CircleXIcon,
  },
];
export function ProfileAppointmentsNav() {
  return (
    <nav className="relative -mx-4 h-12">
      <ul className="scrollbar-hide bg-background/20 flex h-full items-center overflow-x-auto pr-4 pl-1 backdrop-blur">
        {appointmentsNav.map(({ url, title, icon: Icon }, i) => (
          <li
            key={url}
            className={cn("group relative h-full", {
              "flex-grow": i === appointmentsNav.length - 1,
            })}
          >
            <Link href={url} className="flex h-full items-center">
              <ProfileAppointmentNavItem url={url}>
                <Icon />
                <p>{title}</p>
              </ProfileAppointmentNavItem>
            </Link>
          </li>
        ))}
      </ul>
      <div className="to-background via-background/60 pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-r from-transparent sm:w-32 md:w-60"></div>
    </nav>
  );
}
