import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type LoadingPageProps = {
  className?: string;
  loaderClassName?: string;
};

export function LoadingPage({ className, loaderClassName }: LoadingPageProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className,
      )}
    >
      <Loader className={cn("animate-spin", loaderClassName)} />
    </div>
  );
}
