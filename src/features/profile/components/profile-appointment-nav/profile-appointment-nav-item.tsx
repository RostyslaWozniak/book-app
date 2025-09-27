"use client";

import { Button } from "@/components/shadcn-ui/button";
import { usePathname } from "next/navigation";

export function ProfileAppointmentNavItem({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === url;
  return (
    <Button variant={isActive ? "secondary" : "outline"}>{children}</Button>
  );
}
