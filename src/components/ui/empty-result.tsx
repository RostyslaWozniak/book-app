import { cn } from "@/lib/utils/cn";
import { FrownIcon, type LucideIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shadcn-ui/empty";

type EmptyResultProps = {
  title: string;
  titleClassName?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  description?: string;
  actionButton?: React.ReactNode;
  className?: string;
};

export function EmptyResult({
  title,
  titleClassName,
  icon: Icon = FrownIcon,
  iconClassName,
  description,
  actionButton,
  className,
}: EmptyResultProps) {
  return (
    <Empty className={cn("bg-muted/20 border border-dashed", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon" className={iconClassName}>
          <Icon />
        </EmptyMedia>
        <EmptyTitle className={titleClassName}>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{actionButton}</EmptyContent>
    </Empty>
  );
}
