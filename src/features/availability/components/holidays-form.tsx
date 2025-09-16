"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/shadcn-ui/calendar";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Textarea } from "@/components/shadcn-ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  createProviderScheduleHolidays,
  type CreateProviderScheduleHolidays,
} from "../lib/validation/provider-holidays";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { dateFormatter } from "@/lib/utils/date";
import type { HolidayRange } from "../types/override.type";

type HolidaysFormProps = {
  initialData?: HolidayRange;
};

export function HolidaysForm({ initialData }: HolidaysFormProps) {
  const router = useRouter();
  const { mutate: createOverride } =
    api.provider.availability.holiday.create.useMutation({
      onSuccess: () => {
        toast.success("Time off added successfully");
        router.push("/provider/availability/holidays");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  // const { mutate: updateOverride } =
  //   api.provider.availability.holiday.update.useMutation({
  //     onSuccess: () => {
  //       toast.success("Time off added successfully");
  //       router.push("/provider/availability/holidays");
  //     },
  //     onError: ({ message }) => {
  //       toast.error(message);
  //     },
  //   });
  // const { mutate: deleteOverride } =
  //   api.provider.availability.holiday.delete.useMutation({
  //     onSuccess: () => {
  //       toast.success("Time off deleted successfully");
  //       router.refresh();
  //     },
  //     onError: ({ message }) => {
  //       toast.error(message);
  //     },
  //   });

  const [isRange, setIsRange] = useState(
    initialData
      ? initialData.startDate.getTime() !== initialData.endDate.getTime()
      : false,
    // false,
  );

  const form = useForm<CreateProviderScheduleHolidays>({
    resolver: zodResolver(createProviderScheduleHolidays),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      reason: initialData?.reason ?? "",
    },
  });

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      form.setValue("startDate", range.from);
      form.setValue("endDate", range.to ?? range.from);
      setIsRange(!!range.to && range.to.getTime() !== range.from.getTime());
    }
  };

  function onSubmit(data: CreateProviderScheduleHolidays) {
    createOverride({
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Range</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          isRange ? (
                            <>
                              {dateFormatter.format(field.value)} -{" "}
                              {dateFormatter.format(form.getValues("endDate"))}
                            </>
                          ) : (
                            dateFormatter.format(field.value)
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
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
                  </PopoverContent>
                </Popover>
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
                  placeholder="Wpisz przyczynę urlopu"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {initialData ? "Zapisz zmiany" : "Dodaj urlop"}
        </Button>
      </form>
    </Form>
  );
}
