"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/shadcn-ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Textarea } from "@/components/shadcn-ui/textarea";
import type { DateRange } from "react-day-picker";
import {
  createProviderScheduleTimeOff,
  type CreateProviderScheduleTimeOff,
} from "../../lib/validation/provider-time-off";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { pl } from "react-day-picker/locale";

type TimeOffFormProps = {
  closeDialog: () => void;
};

export function TimeOffForm({ closeDialog }: TimeOffFormProps) {
  const router = useRouter();
  const { mutate: createOverride, isPending: isCreating } =
    api.provider.availability.timeOff.create.useMutation({
      onSuccess: () => {
        toast.success("Dodano urlop");
        router.refresh();
        closeDialog();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const form = useForm<CreateProviderScheduleTimeOff>({
    resolver: zodResolver(createProviderScheduleTimeOff),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      reason: "",
    },
  });

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      form.setValue("startDate", range.from);
      form.setValue("endDate", range.to ?? range.from);
    }
  };

  function onSubmit(data: CreateProviderScheduleTimeOff) {
    createOverride({
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="startDate"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Range</FormLabel>
              <Calendar
                mode="range"
                locale={pl}
                selected={{
                  from: form.getValues("startDate"),
                  to: form.getValues("endDate"),
                }}
                onSelect={handleRangeSelect}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                numberOfMonths={2}
                timeZone="UTC"
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Przyczyna </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Wpisz przyczynę urlopu"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton className="w-full" loading={isCreating} type="submit">
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
