import { api } from "@/trpc/react";
import type { TimeOffRange } from "../../../types/override.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";

export function DeleteTimeOff({
  timeOff,
  closeDialog,
}: {
  timeOff: TimeOffRange;
  closeDialog: () => void;
}) {
  const router = useRouter();

  const { mutate: deleteOverride, isPending: isDeleting } =
    api.provider.availability.timeOff.delete.useMutation({
      onSuccess: () => {
        toast.success("Time off deleted successfully");
        closeDialog();
        router.refresh();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  return (
    <LoadingButton
      loading={isDeleting}
      onClick={() => deleteOverride(timeOff)}
      variant="destructive"
    >
      Usuń urlop
    </LoadingButton>
  );
}
