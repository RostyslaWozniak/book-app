import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/shadcn-ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn(
        "relative flex items-center gap-2 transition-none",
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}
