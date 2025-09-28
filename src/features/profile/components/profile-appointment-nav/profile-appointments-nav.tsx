import Link from "next/link";
import { ProfileAppointmentNavItem } from "./profile-appointment-nav-item";

const appointmentsNav = [
  {
    url: "/profile/visits",
    title: "Wszystkie",
  },
  {
    url: "/profile/visits/active",
    title: "Zaplanowane",
  },
  {
    url: "/profile/visits/finished",
    title: "Zakończone",
  },
  {
    url: "/profile/visits/canceled",
    title: "Anulowane",
  },
];
export function ProfileAppointmentsNav() {
  return (
    <nav className="relative -mx-4">
      <div className="from-background absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r to-transparent"></div>
      <ul className="scrollbar-hide flex items-center gap-2 overflow-x-auto px-4 py-4">
        {appointmentsNav.map(({ url, title }) => (
          <li key={url}>
            <Link href={url}>
              <ProfileAppointmentNavItem url={url}>
                {title}
              </ProfileAppointmentNavItem>
            </Link>
          </li>
        ))}
      </ul>
      <div className="to-background absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent"></div>
    </nav>
  );
}
