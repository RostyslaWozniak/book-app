import { cn } from "@/lib/utils/cn";

type MenuIconProps = {
  icon: React.ElementType;
  text?: string;
  className?: string;
  iconSize?: number;
};

export function IconMenu({
  className,
  icon: Icon,
  text,
  iconSize = 20,
}: MenuIconProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-row items-center justify-start space-x-2 text-center text-sm",
        className,
      )}
    >
      <Icon size={iconSize} />
      <span>{text}</span>
    </div>
  );
}
