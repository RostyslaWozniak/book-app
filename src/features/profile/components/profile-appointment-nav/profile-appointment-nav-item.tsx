"use client";

import { buttonVariants } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
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
    <>
      <div
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-foreground hover:no-underline",
          {
            "text-primary": isActive,
          },
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "bg-muted absolute top-[97%] bottom-0 w-full flex-grow duration-300",
          {
            "bg-primary group-focus-visible:bg-transparent": isActive,
            "group-hover:bg-foreground": !isActive,
          },
        )}
      />
    </>
  );
}
