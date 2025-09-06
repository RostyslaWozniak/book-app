import { cn } from "@/lib/utils/cn";
import { H2, type H3 } from "@/components/ui/typography";

export function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  heading: Heading = H2,
}: {
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  heading?: typeof H2 | typeof H3;
}) {
  return (
    <div className={cn("mx-auto mb-6 text-center md:mb-12", className)}>
      <Heading className={cn("mb-3 md:mb-6", titleClassName)}>{title}</Heading>
      {subtitle && (
        <p className={cn("text-lg md:text-xl", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
