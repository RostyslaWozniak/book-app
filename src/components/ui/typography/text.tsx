import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva("font-manrope ", {
  variants: {
    size: {
      default:
        "text-base md:text-lg font-normal leading-relaxed tracking-wide ",
      sm: "text-base md:text-sm font-normal leading-relaxed tracking-wider",
      lg: "text-lg font-semibold md:text-xl/relaxed tracking-wider",
      subtitle: "text-base font-semibold sm:text-lg lg:text-xl tracking-widest",
    },
    variant: {
      default: "text-foreground",
      muted: "text-gray-600 font-semibold dark:text-white/90",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type TextProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof textVariants>;

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <p
        className={cn(textVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
