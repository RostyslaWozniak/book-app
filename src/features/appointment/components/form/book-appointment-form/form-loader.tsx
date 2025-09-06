import { Loader } from "lucide-react";

export function FormLoader() {
  return (
    <div className="bg-muted/60 absolute inset-0 z-50 flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
