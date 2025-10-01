"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function UpdateAppointmentStatusButton({
  appointmentId,
  status,
  setIsAppointmentDialogOpen,
}: {
  appointmentId: string;
  status: "CONFIRMED" | "COMPLETED";
  setIsAppointmentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const utis = api.useUtils();
  const isConfirmOperation = status === "CONFIRMED";

  const { mutate: updateAppointment, isPending: isAppointmentUpdating } =
    api.provider.appointment.updateStatus.useMutation({
      onSuccess: () => {
        toast.success(
          isConfirmOperation
            ? "Wizyta została zatwierdzona"
            : "Wizyta została zakończona",
        );
        setIsAppointmentDialogOpen(false);
        void utis.provider.appointment.getAllOwn.invalidate();
      },
      onError: (error) => {
        // if (error.shape?.data instanceof ZodError) {
        //   toast.error("Bład w formularzu");
        // }
        toast.error(error.message);
      },
    });

  return (
    <LoadingButton
      loading={isAppointmentUpdating}
      className={cn({
        "bg-confirmed": isConfirmOperation,
        "bg-completed": !isConfirmOperation,
      })}
      onClick={() => {
        updateAppointment({
          appointmentId,
          status,
        });
      }}
    >
      {isConfirmOperation ? "Zatwierdź wizytę" : "Zakończ wizytę"}
    </LoadingButton>
  );
}
