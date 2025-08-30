import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function H3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-foreground text-xl font-semibold sm:text-2xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}
