import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-foreground text-center text-3xl font-bold lg:text-4xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
