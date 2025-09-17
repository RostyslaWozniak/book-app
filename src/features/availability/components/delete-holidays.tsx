import { api } from "@/trpc/react";
import type { HolidayRange } from "../types/override.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";

export function DeleteHolidays({ holidays }: { holidays: HolidayRange }) {
  const router = useRouter();

  const { mutate: deleteOverride, isPending: isDeleting } =
    api.provider.availability.holiday.delete.useMutation({
      onSuccess: () => {
        toast.success("Time off deleted successfully");
        router.refresh();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  return (
    <LoadingButton
      loading={isDeleting}
      onClick={() => deleteOverride(holidays)}
      variant="destructive"
    >
      Usuń urlop
    </LoadingButton>
  );
}
