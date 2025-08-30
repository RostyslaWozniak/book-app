import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function H4({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4 className={cn("text-lg font-semibold sm:text-xl", className)}>
      {children}
    </h4>
  );
}
