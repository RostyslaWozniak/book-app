"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleDayOfWeek, WeekType } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";

import { Button } from "@/components/shadcn-ui/button";
import { formatDayOfWeek, getWeekTypeLabel } from "../lib/dates";
import { api, type RouterOutputs } from "@/trpc/react";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  createProviderAvailabilitySchema,
  type CreateProviderAvailabilitySchema,
} from "../lib/validation/provider-schedule-availability";
import { TimePickerWeel } from "@/components/ui/time-picker-weel";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";

type AvailabilityFormProps = {
  initialData?: RouterOutputs["provider"]["availability"]["getOwnAvailabilities"][number];
  submitLabel?: string;
  dayOfWeek?: ScheduleDayOfWeek;
  closeForm: () => void;
};

export function AvailabilityForm({
  initialData,
  submitLabel = "Zapisz",
  dayOfWeek,
  closeForm,
}: AvailabilityFormProps) {
  const utils = api.useUtils();

  const { mutate: createAvailability, isPending: isCreating } =
    api.provider.availability.create.useMutation({
      onError: ({ message }) => {
        toast.error(message);
      },
      onSuccess: () => {
        void utils.provider.availability.getOwnAvailabilities.invalidate();
        closeForm();
      },
    });
  const { mutate: updateAvailability, isPending: isUpdating } =
    api.provider.availability.update.useMutation({
      onError: ({ message }) => {
        toast.error(message);
      },
      onSuccess: () => {
        void utils.provider.availability.getOwnAvailabilities.invalidate();
        closeForm();
      },
    });

  const form = useForm<CreateProviderAvailabilitySchema>({
    resolver: zodResolver(createProviderAvailabilitySchema),
    defaultValues: initialData ?? {
      dayOfWeek: dayOfWeek ?? ScheduleDayOfWeek.MONDAY,
      weekType: "ALL",
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  const handleSubmit = (data: CreateProviderAvailabilitySchema) => {
    if (initialData) {
      updateAvailability({ id: initialData.id, ...data });
    } else {
      createAvailability(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 [&div>div>button]:w-full">
          <FormField
            control={form.control}
            name="dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dzień tygodnia</FormLabel>

                <FormControl>
                  <WheelPickerWrapper>
                    <WheelPicker
                      options={Object.values(ScheduleDayOfWeek).map((day) => ({
                        label: formatDayOfWeek(day),
                        value: day,
                      }))}
                      infinite
                      visibleCount={14}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </WheelPickerWrapper>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weekType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rodzaj tygodnia</FormLabel>
                <FormControl>
                  <WheelPickerWrapper>
                    <WheelPicker
                      options={Object.values(WeekType).map((type) => ({
                        label: getWeekTypeLabel(type),
                        value: type,
                      }))}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      visibleCount={14}
                    />
                  </WheelPickerWrapper>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
                      form.getValues("startTime").split(":")[0] ?? "09"
                    }
                    defaultMinutes={
                      form.getValues("startTime").split(":")[1] ?? "00"
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
                      form.getValues("endTime").split(":")[0] ?? "17"
                    }
                    defaultMinutes={
                      form.getValues("endTime").split(":")[1] ?? "00"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="outline" onClick={closeForm}>
            Cofnij
          </Button>
          <LoadingButton loading={isCreating || isUpdating} type="submit">
            {submitLabel}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
