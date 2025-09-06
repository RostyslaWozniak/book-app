import { cn } from "@/lib/utils/cn";
import { FrownIcon, type LucideIcon } from "lucide-react";

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
    <div
      className={cn(
        "text-muted-foreground bg-muted flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-4 text-center",
        className,
      )}
    >
      <Icon className={cn("mb-4 h-12 w-12", iconClassName)} />
      <p className={cn(titleClassName, "text-lg font-medium")}>{title}</p>
      {description && (
        <p className="max-w-md text-center text-sm">{description}</p>
      )}
      {actionButton}
    </div>
  );
}
