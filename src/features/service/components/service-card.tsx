import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { H3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils/cn";
import { AccessibleLink } from "@/components/ui/accesible-link";
import { Button } from "@/components/shadcn-ui/button";
import type { Service } from "../types/services.type";

type ServiceCardProps = {
  service: Service;
  href?: string;
  className?: string;
  showDescription?: boolean;
  descriptionClassName?: string;
  bookButton?: boolean;
};

export function ServiceCard({
  service,
  href,
  className,
  showDescription = false,
  descriptionClassName,
  bookButton = false,
}: ServiceCardProps) {
  return (
    <Card
      key={service.id}
      className={cn(
        "hover:border-primary/50 overflow-hidden border-2 border-transparent p-2 transition-all duration-200 hover:shadow-md md:p-4",
        className,
      )}
    >
      <CardContent className="flex-grow flex-col px-1 sm:px-4 md:flex md:gap-y-2">
        <CardTitle className="text-xl font-bold">
          <H3 className="text-lg md:text-2xl">{service.name}</H3>
        </CardTitle>
        {showDescription && (
          <CardDescription
            className={cn(
              "text-muted-foreground line-clamp-3",
              descriptionClassName,
            )}
          >
            {service.description}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between px-1 sm:px-4">
        <div className="text-muted-foreground flex flex-grow items-center text-sm">
          <Clock className="mr-1 w-4" />
          {service.durationInMinutes} min
        </div>
        {bookButton && (
          <AccessibleLink
            className="w-min"
            href={href ?? `/uslugi/nowa/${service.slug}`}
            aria-label="Przejdź do umawainia wizyty"
          >
            <Button>Umów wizytę</Button>
          </AccessibleLink>
        )}
      </CardFooter>
    </Card>
  );
}
