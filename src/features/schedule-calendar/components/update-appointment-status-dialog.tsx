"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useState } from "react";
import { toast } from "sonner";

export function UpdateAppointmentStatusDialog({
  appointmentId,
  status,
  setIsAppointmentDialogOpen,
}: {
  appointmentId: string;
  status: "CONFIRMED" | "COMPLETED";
  setIsAppointmentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isConfirmOperation = status === "CONFIRMED";
  const utils = api.useUtils();

  const [isOpen, setIsOpen] = useState(false);
  // const { mutate: updateAppointment, isPending: isAppointmentUpdating } =
  //   api.vet.appointments.updateStatus.useMutation({
  //     onSuccess: () => {
  //       toast.success(
  //         isConfirmOperation
  //           ? "Wizyta została zatwierdzona"
  //           : "Wizyta została zakończona",
  //       );
  //       setIsOpen(false);
  //       setIsAppointmentDialogOpen(false);
  //       void utils.vet.appointments.getAllOwn.invalidate();
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });

  return (
    <>
      <DialogWrapper
        title={
          isConfirmOperation ? "Zatwierdzenie wizyty" : "Zakonczenie wizyty"
        }
        description={
          isConfirmOperation
            ? "Czy napewno chcesz zatwierdzić wizytę? Ta operacja nie będzie mogła być odwrócona!"
            : "Czy napewno chcesz zakończyć wizytę? Ta operacja nie będzie mogła być odwrócona!"
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="scrollbar-hide flex max-h-[90vh] w-120 flex-row-reverse gap-3"
        closeButton="Cofnij"
        closeButtonVariant={{ variant: "outline", size: "default" }}
      >
        <LoadingButton
          loading={false}
          className={cn({
            "bg-confirmed": isConfirmOperation,
            "bg-completed": !isConfirmOperation,
          })}
          // onClick={() => {
          //   updateAppointment({
          //     appointmentId,
          //     status,
          //   });
          // }}
        >
          {isConfirmOperation ? "Zatwierdź wizytę" : "Zakończ wizytę"}
        </LoadingButton>
      </DialogWrapper>
      <Button
        className={cn("w-full", {
          "bg-confirmed": isConfirmOperation,
          "bg-completed": !isConfirmOperation,
        })}
        onClick={() => setIsOpen(true)}
      >
        {isConfirmOperation ? "Zatwierdź" : "Zakończ"}
      </Button>
    </>
  );
}
