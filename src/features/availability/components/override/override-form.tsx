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
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { pl } from "react-day-picker/locale";
import {
  createProviderScheduleOverride,
  type CreateProviderScheduleOverride,
} from "../../lib/validation/provider-schedule-override";
import { TimePickerWeel } from "@/components/ui/time-picker-weel";

type OverrideFormProps = {
  closeDialog: () => void;
};

export function OverrideForm({ closeDialog }: OverrideFormProps) {
  const router = useRouter();
  const { mutate: createOverride, isPending: isCreating } =
    api.provider.availability.override.create.useMutation({
      onSuccess: () => {
        toast.success("Zmieniono godziny pracy");
        router.refresh();
        closeDialog();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const form = useForm<CreateProviderScheduleOverride>({
    resolver: zodResolver(createProviderScheduleOverride),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      startTime: "09:00",
      endTime: "17:00",
      reason: "",
    },
  });

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      form.setValue("startDate", range.from);
      form.setValue("endDate", range.to ?? range.from);
    }
  };

  function onSubmit(data: CreateProviderScheduleOverride) {
    createOverride({
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      reason: data.reason,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-4"
      >
        <FormField
          control={form.control}
          name="startDate"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Zakres Dat</FormLabel>
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
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <TimePickerWeel
                    onChange={field.onChange}
                    defaultHours={
                      form.getValues("startTime")?.split(":")[0] ?? "09"
                    }
                    defaultMinutes={
                      form.getValues("startTime")?.split(":")[1] ?? "00"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Koniec</FormLabel>
                <FormControl>
                  <TimePickerWeel
                    onChange={field.onChange}
                    defaultHours={
                      form.getValues("endTime")?.split(":")[0] ?? "17"
                    }
                    defaultMinutes={
                      form.getValues("endTime")?.split(":")[1] ?? "00"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Przyczyna </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Wpisz przyczynę zmiany godzin pracy"
                  className="h-20 resize-none"
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
