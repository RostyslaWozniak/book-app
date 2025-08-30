"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteServiceButtonProps = {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteServiceButton({
  id,
  setIsDeleteOpen,
}: DeleteServiceButtonProps) {
  const router = useRouter();
  const { mutate: deleteProduct, isPending: isDeleting } =
    api.admin.service.delete.useMutation({
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast.success("Usługę usunięto");
        router.refresh();
      },
      onError: () => {
        setIsDeleteOpen(false);
        toast.error("Coś poszło nie tak. Spróbuj ponownie.");
      },
    });

  const handleDeleteProduct = () => {
    deleteProduct(id);
  };
  return (
    <LoadingButton
      variant="destructive"
      className="self-end"
      onClick={handleDeleteProduct}
      loading={isDeleting}
    >
      Delete
    </LoadingButton>
  );
}
