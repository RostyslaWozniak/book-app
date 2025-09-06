import { Button } from "@/components/shadcn-ui/button";
import { Calendar } from "@/components/shadcn-ui/calendar";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { api } from "@/trpc/react";
import { useBookAppointmentFormContext } from "./context";
import type { ControllerRenderProps } from "react-hook-form";
import { dateToString, isSameDay } from "@/lib/utils/date";
import { getStartDate } from "@/lib/utils/date";
import { pl } from "react-day-picker/locale";
import { useState } from "react";
import { FormLoader } from "./form-loader";

export function DateSelectDialog({
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
    "date"
  >;
}) {
  const {
    serviceId,
    providerSlug,
    resetTimeField,
    isDateDialogOpen,
    setIsDateDialogOpen,
    setIsTimeDialogOpen,
  } = useBookAppointmentFormContext();

  const [startDay, setStartDay] = useState<Date | null>(null);

  const { data: validDates, isLoading } =
    api.public.appointment.getAvailableDays.useQuery({
      serviceId,
      startDate: getStartDate(startDay),
      providerSlug,
    });

  function handleSelectDay(date?: Date) {
    resetTimeField();
    field.onChange(date);
    setIsDateDialogOpen(false);
    setIsTimeDialogOpen(true);
  }

  function hadnlePrevNextClick(date: Date) {
    setStartDay(getStartDate(date));
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsDateDialogOpen(true)}
        variant="outline"
        className="relative"
      >
        <span className="absolute left-4">
          {dateToString(field.value) ?? (
            <span className="text-muted-foreground">Wybierz Dzień</span>
          )}
        </span>
      </Button>
      <DialogWrapper
        title="Wybierz dzień"
        isOpen={isDateDialogOpen}
        setIsOpen={setIsDateDialogOpen}
        contentClassName="overflow-hidden"
      >
        {isLoading && <FormLoader />}
        <Calendar
          onPrevClick={hadnlePrevNextClick}
          onNextClick={hadnlePrevNextClick}
          mode="single"
          defaultMonth={startDay ?? new Date()}
          locale={pl}
          selected={field.value}
          onSelect={handleSelectDay}
          disabled={(date) => !validDates?.some((d) => isSameDay(date, d.date))}
          className="w-full rounded-lg"
        />
      </DialogWrapper>
    </>
  );
}
