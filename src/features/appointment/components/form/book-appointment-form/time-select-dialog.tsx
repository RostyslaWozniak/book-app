import { Button } from "@/components/shadcn-ui/button";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { useBookAppointmentFormContext } from "./context";
import type { ControllerRenderProps } from "react-hook-form";
import { dateToTimeString, getStartDate } from "@/lib/utils/date";
import { api } from "@/trpc/react";
import { FormBackButton } from "./form-back-button";
import { FormLoader } from "./form-loader";

export function TimeSelectDialog({
  field,
}: {
  field: ControllerRenderProps<
    {
      startTime: Date;
      contactEmail: string;
      contactName: string;
      date: Date;
      contactPhone?: string | undefined;
      notes?: string | undefined;
    },
    "startTime"
  >;
}) {
  const {
    serviceId,
    providerSlug,
    isTimeDialogOpen,
    watchDate,
    setIsTimeDialogOpen,
    setIsDateDialogOpen,
    nameInputRef,
  } = useBookAppointmentFormContext();

  const { data: timeSlots, isLoading } =
    api.public.appointment.getAvailableTimeSlotsForDay.useQuery(
      {
        serviceId,
        day: getStartDate(watchDate),
        providerSlug,
      },
      { enabled: !!watchDate },
    );

  function handleSelectTime(date: Date) {
    field.onChange(date);
    setIsTimeDialogOpen(false);
    nameInputRef.current?.focus();
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsTimeDialogOpen(true)}
        variant="outline"
        disabled={!watchDate}
      >
        <span className="absolute left-4">
          {dateToTimeString(field.value) ?? (
            <span className="text-muted-foreground">Wybierz Godzinę</span>
          )}
        </span>
      </Button>
      <DialogWrapper
        title="Wybierz godzinę"
        isOpen={isTimeDialogOpen}
        setIsOpen={setIsTimeDialogOpen}
        contentClassName="overflow-hidden min-h-100 pb-20"
      >
        {isLoading && <FormLoader />}
        <div className="mb-2">
          <FormBackButton
            goBack={() => {
              setIsTimeDialogOpen(false);
              setIsDateDialogOpen(true);
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots?.map((time) => (
            <Button
              variant={
                time?.getTime() === field.value?.getTime()
                  ? "default"
                  : "outline"
              }
              key={time?.toString()}
              value={time?.toString()}
              onClick={() => handleSelectTime(time)}
            >
              {dateToTimeString(time)}
            </Button>
          ))}
        </div>
      </DialogWrapper>
    </>
  );
}
