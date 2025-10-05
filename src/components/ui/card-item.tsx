import { Card, CardContent } from "@/components/shadcn-ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";
import { H3, type H4 } from "@/components/ui/typography";
import { AccessibleLink } from "@/components/ui/accesible-link";
import type { JSX } from "react";

type CardItemProps = {
  title?: string;
  className?: string;
  iconClassName?: string;
  descriptionClassName?: string;
  description?: string | JSX.Element;
  icon?: LucideIcon;
  href?: string;
  align?: "start" | "center" | "end";
  heading?: typeof H3 | typeof H4;
};

export function CardItem({
  title,
  icon: Icon,
  description,
  descriptionClassName,

  href,
  className,
  iconClassName,
  align = "start",
  heading: Heading = H3,
}: CardItemProps) {
  return (
    <Card
      className={cn(
        "group bg-card relative h-full overflow-hidden border-0 shadow-md backdrop-blur-sm transition-all duration-300 md:shadow-lg md:hover:shadow-xl",
        className,
      )}
    >
      <CardContent
        className={cn("flex h-full flex-col p-6 pb-8", {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        })}
      >
        {Icon && (
          <div
            className={cn(
              "mb-4 flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-lg p-3",
              iconClassName,
            )}
          >
            <Icon className="h-full w-full" />
          </div>
        )}

        {title && (
          <Heading
            className={cn("mb-1 h-full flex-grow text-start", {
              "text-start": align === "start",
              "text-center": align === "center",
              "text-end": align === "end",
            })}
          >
            {title}
          </Heading>
        )}

        {description && (
          <p
            className={cn(
              "text-card-foreground flex-grow text-sm leading-relaxed",
              {
                "line-clamp-2 min-h-12": href,
                "text-start": align === "start",
                "text-center": align === "center",
                "text-end": align === "end",
              },
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </CardContent>
      {href && (
        <>
          <AccessibleLink
            href={href}
            className="absolute inset-0 min-w-full"
            aria-label={`Przejdż do strony ${title}`}
          />
          <div className="absolute top-4 right-4 -z-10 flex items-center gap-1">
            <p className="text-sm text-cyan-700 group-hover:underline">
              zobacz więcej
            </p>
            <ArrowUpRightIcon className="h-4 w-4 text-cyan-700" />
          </div>
        </>
      )}
    </Card>
  );
}
