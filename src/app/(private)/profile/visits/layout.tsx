import { ProfileAppointmentsNav } from "@/features/profile/components/profile-appointment-nav";

export default function ProfileAppointmentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ProfileAppointmentsNav />
      {children}
    </>
  );
}
