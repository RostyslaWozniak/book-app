import { cn } from "@/lib/utils/cn";
import Link, { type LinkProps } from "next/link";
import { forwardRef } from "react";

// Extract all Link props except children and add required aria-label
interface AccessibleLinkProps extends Omit<LinkProps, "children"> {
  "aria-label": string;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  id?: string;
  role?: string;
  tabIndex?: number;
  style?: React.CSSProperties;
  title?: string;
  // Add any other HTML anchor attributes you might need
  "data-testid"?: string;
}

export const AccessibleLink = forwardRef<
  HTMLAnchorElement,
  AccessibleLinkProps
>(({ "aria-label": ariaLabel, children, className, ...props }, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        "grid min-h-12 w-full min-w-12 place-items-center text-nowrap sm:mx-auto sm:w-min",
        className,
      )}
    >
      {children}
    </Link>
  );
});

AccessibleLink.displayName = "AccessibleLink";
