import { cn } from "@/lib/utils/cn";
import { type ReactNode } from "react";

export function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-start text-4xl font-bold tracking-tighter md:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
