import { api } from "@/trpc/react";
import type { OverrideRange } from "../../../types/override.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";

export function DeleteOverride({
  override,
  closeDialog,
}: {
  override: OverrideRange;
  closeDialog: () => void;
}) {
  const router = useRouter();

  const { mutate: deleteOverride, isPending: isDeleting } =
    api.provider.availability.override.delete.useMutation({
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
      onClick={() => deleteOverride(override)}
      variant="destructive"
    >
      Usuń
    </LoadingButton>
  );
}
